// ============================================================
//  圖片壓縮：把 src/assets 裡過大的照片縮小並重新壓縮
//  用法： npm run optimize:images
//
//  - 長邊超過 MAX_EDGE 的圖等比縮小
//  - jpg / jpeg / png 照片一律轉成 webp（檔名不變、副檔名改 .webp），
//    轉完會列出「要改 import 的檔案」，照著把程式裡的副檔名改掉即可
//  - 已是 webp 的圖：只處理過大（尺寸或 >400KB）的，且結果比原檔小才覆蓋
//  - icons/ 與 KEEP_SIZE 內的檔案不縮尺寸（小圖示、平鋪背景）
//
//  新增照片時先丟進 src/assets，跑一次這支再 commit。
// ============================================================
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = "src/assets";
const MAX_EDGE = 2560; // 全幅橫幅在 2K 螢幕上也夠用
const QUALITY = 80;
const MAX_WEBP_BYTES = 400 * 1024; // 超過這個大小的 webp 才重壓
const SKIP_DIRS = ["icons"];
// 平鋪背景：顯示尺寸 = 原始像素，縮小會讓紋理變密，只轉格式不縮
const KEEP_SIZE = ["bg_gray"];

const walk = (dir) =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) return SKIP_DIRS.includes(e.name) ? [] : walk(p);
		return [p];
	});

const kb = (n) => `${Math.round(n / 1024)}KB`;
let before = 0;
let after = 0;
const renamed = [];

for (const file of walk(ROOT).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))) {
	const ext = path.extname(file).toLowerCase();
	const base = path.basename(file, path.extname(file));
	const input = fs.readFileSync(file);
	const { width, height } = await sharp(input).metadata();

	let img = sharp(input).rotate(); // 依 EXIF 轉正
	const tooBig = Math.max(width, height) > MAX_EDGE && !KEEP_SIZE.includes(base);
	// 已經夠小的 webp 不重壓，避免反覆有損壓縮讓畫質越來越差
	if (ext === ".webp" && !tooBig && input.length <= MAX_WEBP_BYTES) continue;
	if (tooBig) img = img.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside" });

	const out = await img.webp({ quality: QUALITY }).toBuffer();
	const target = path.join(path.dirname(file), `${base}.webp`);

	if (ext === ".webp") {
		if (out.length >= input.length) continue; // 沒有變小就不動
		fs.writeFileSync(file, out);
	} else {
		fs.writeFileSync(target, out);
		fs.rmSync(file);
		renamed.push(`${file} → ${path.basename(target)}`);
	}
	before += input.length;
	after += out.length;
	console.log(`${kb(input.length).padStart(7)} → ${kb(out.length).padStart(6)}  ${target}`);
}

console.log(`\n合計 ${kb(before)} → ${kb(after)}`);
if (renamed.length) {
	console.log("\n以下檔案副檔名已改成 .webp，記得更新程式裡的 import：");
	renamed.forEach((r) => console.log("  " + r));
}
