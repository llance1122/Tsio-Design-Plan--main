// ============================================================
//  文章 API
//  GET    /api/articles        文章列表（不含內文，給列表頁）
//  GET    /api/articles/:slug  單篇文章（含內文區塊）
//  POST   /api/articles        新增文章（需登入，可上傳海報）
//  DELETE /api/articles/:id    刪除文章（需登入）
// ============================================================
import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import db from "../db.js";
import { UPLOAD_DIR } from "../config.js";
import { requireAuth } from "../auth.js";

const router = Router();

// ---- 海報上傳設定 ----
const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, UPLOAD_DIR),
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase();
		const rand = crypto.randomBytes(8).toString("hex");
		cb(null, `${Date.now()}-${rand}${ext}`);
	},
});
const upload = multer({
	storage,
	limits: { fileSize: 8 * 1024 * 1024 }, // 8MB 上限
	fileFilter: (req, file, cb) => {
		const ok = /^image\/(jpe?g|png|webp|avif|gif)$/.test(file.mimetype);
		cb(ok ? null : new Error("只接受圖片檔（jpg / png / webp / avif / gif）"), ok);
	},
});

// 由標題產生唯一 slug；重複時自動加序號
function uniqueSlug(title) {
	const base =
		String(title)
			.trim()
			.toLowerCase()
			.replace(/[^\w一-鿿]+/g, "-")
			.replace(/^-+|-+$/g, "")
			.slice(0, 40) || "article";
	const exists = db.prepare("SELECT 1 FROM articles WHERE slug = ?");
	let slug = base;
	let i = 1;
	while (exists.get(slug)) slug = `${base}-${i++}`;
	return slug;
}

// 只保留合法的內文區塊（subtitle / paragraph + 字串內容）
function sanitizeBlocks(raw) {
	let arr;
	try {
		arr = JSON.parse(raw || "[]");
	} catch {
		return null; // 格式錯誤
	}
	if (!Array.isArray(arr)) return null;
	return arr
		.filter(
			(b) =>
				b &&
				(b.type === "subtitle" || b.type === "paragraph") &&
				typeof b.content === "string" &&
				b.content.trim() !== ""
		)
		.map((b) => ({ type: b.type, content: b.content }));
}

// ---- 列表：不回傳內文，減少傳輸量 ----
router.get("/", (req, res) => {
	const rows = db
		.prepare(
			"SELECT id, slug, title, description, date, location, cover, created_at FROM articles ORDER BY created_at DESC, id DESC"
		)
		.all();
	res.json(rows);
});

// ---- 單篇：含內文區塊 ----
router.get("/:slug", (req, res) => {
	const row = db.prepare("SELECT * FROM articles WHERE slug = ?").get(req.params.slug);
	if (!row) return res.status(404).json({ error: "找不到文章" });
	row.blocks = JSON.parse(row.blocks);
	res.json(row);
});

// ---- 新增（需登入）----
router.post("/", requireAuth, upload.single("cover"), (req, res) => {
	const { title, description = "", date = "", location = "" } = req.body;
	if (!title || !title.trim()) {
		return res.status(400).json({ error: "缺少文章標題" });
	}

	const blocks = sanitizeBlocks(req.body.blocks);
	if (blocks === null) {
		return res.status(400).json({ error: "內文（blocks）格式錯誤" });
	}

	const cover = req.file ? `/uploads/${req.file.filename}` : null;
	const slug = uniqueSlug(title);

	const info = db
		.prepare(
			`INSERT INTO articles (slug, title, description, date, location, cover, blocks)
			 VALUES (?, ?, ?, ?, ?, ?, ?)`
		)
		.run(slug, title.trim(), description, date, location, cover, JSON.stringify(blocks));

	const created = db
		.prepare("SELECT * FROM articles WHERE id = ?")
		.get(info.lastInsertRowid);
	created.blocks = JSON.parse(created.blocks);
	res.status(201).json(created);
});

// ---- 刪除（需登入）----
router.delete("/:id", requireAuth, (req, res) => {
	const row = db.prepare("SELECT cover FROM articles WHERE id = ?").get(req.params.id);
	if (!row) return res.status(404).json({ error: "找不到文章" });

	db.prepare("DELETE FROM articles WHERE id = ?").run(req.params.id);

	// 一併刪除上傳的海報檔（若有且在 uploads 內）
	if (row.cover && row.cover.startsWith("/uploads/")) {
		const file = path.join(UPLOAD_DIR, path.basename(row.cover));
		fs.rm(file, { force: true }, () => {});
	}
	res.json({ ok: true });
});

export default router;
