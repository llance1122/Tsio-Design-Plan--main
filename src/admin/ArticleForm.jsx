import { useState } from "react";
import { createArticle } from "./api";

const EMPTY = { title: "", description: "", date: "", location: "" };

export default function ArticleForm({ onCreated }) {
	const [fields, setFields] = useState(EMPTY);
	const [blocks, setBlocks] = useState([]);
	const [cover, setCover] = useState(null);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");

	const setField = (k, v) => setFields((f) => ({ ...f, [k]: v }));

	// ---- 內文區塊操作 ----
	const addBlock = (type) => setBlocks((b) => [...b, { type, content: "" }]);
	const updateBlock = (i, content) =>
		setBlocks((b) => b.map((blk, idx) => (idx === i ? { ...blk, content } : blk)));
	const removeBlock = (i) => setBlocks((b) => b.filter((_, idx) => idx !== i));
	const moveBlock = (i, dir) =>
		setBlocks((b) => {
			const j = i + dir;
			if (j < 0 || j >= b.length) return b;
			const copy = [...b];
			[copy[i], copy[j]] = [copy[j], copy[i]];
			return copy;
		});

	const submit = async (e) => {
		e.preventDefault();
		setError("");
		if (!fields.title.trim()) {
			setError("請填寫標題");
			return;
		}
		const clean = blocks.filter((b) => b.content.trim() !== "");
		setBusy(true);
		try {
			const fd = new FormData();
			fd.append("title", fields.title);
			fd.append("description", fields.description);
			fd.append("date", fields.date);
			fd.append("location", fields.location);
			fd.append("blocks", JSON.stringify(clean));
			if (cover) fd.append("cover", cover);
			await createArticle(fd);
			// 清空表單
			setFields(EMPTY);
			setBlocks([]);
			setCover(null);
			e.target.reset();
			onCreated?.();
		} catch (err) {
			setError(err.message);
		} finally {
			setBusy(false);
		}
	};

	return (
		<form onSubmit={submit} className="bg-white rounded-xl shadow p-6 space-y-5">
			<h2 className="font-semibold text-lg">發布新文章</h2>

			<label className="block space-y-1">
				<span className="text-sm text-neutral-600">標題 *</span>
				<input
					value={fields.title}
					onChange={(e) => setField("title", e.target.value)}
					className="w-full border border-neutral-300 rounded-lg px-3 py-2"
				/>
			</label>

			<label className="block space-y-1">
				<span className="text-sm text-neutral-600">摘要／描述</span>
				<textarea
					value={fields.description}
					onChange={(e) => setField("description", e.target.value)}
					rows={2}
					className="w-full border border-neutral-300 rounded-lg px-3 py-2"
				/>
			</label>

			<div className="grid grid-cols-2 gap-4">
				<label className="block space-y-1">
					<span className="text-sm text-neutral-600">日期</span>
					<input
						value={fields.date}
						onChange={(e) => setField("date", e.target.value)}
						placeholder="例：2026 07 29"
						className="w-full border border-neutral-300 rounded-lg px-3 py-2"
					/>
				</label>
				<label className="block space-y-1">
					<span className="text-sm text-neutral-600">分類／標籤</span>
					<input
						value={fields.location}
						onChange={(e) => setField("location", e.target.value)}
						placeholder="例：校友特稿"
						className="w-full border border-neutral-300 rounded-lg px-3 py-2"
					/>
				</label>
			</div>

			<label className="block space-y-1">
				<span className="text-sm text-neutral-600">海報圖</span>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => setCover(e.target.files[0] || null)}
					className="w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-neutral-800 file:text-white file:px-3 file:py-1.5"
				/>
			</label>

			{/* ---- 內文區塊編輯器 ---- */}
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<span className="text-sm text-neutral-600">內文</span>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => addBlock("subtitle")}
							className="text-sm px-3 py-1 rounded border border-neutral-300 hover:bg-neutral-50"
						>
							＋ 小標
						</button>
						<button
							type="button"
							onClick={() => addBlock("paragraph")}
							className="text-sm px-3 py-1 rounded border border-neutral-300 hover:bg-neutral-50"
						>
							＋ 段落
						</button>
					</div>
				</div>

				{blocks.length === 0 && (
					<p className="text-sm text-neutral-400">
						尚無內容，點右上「＋ 小標 / ＋ 段落」開始撰寫。
					</p>
				)}

				{blocks.map((b, i) => (
					<div key={i} className="border border-neutral-200 rounded-lg p-3 space-y-2 bg-neutral-50">
						<div className="flex items-center justify-between">
							<span
								className={`text-xs px-2 py-0.5 rounded ${
									b.type === "subtitle"
										? "bg-neutral-800 text-white"
										: "bg-neutral-200 text-neutral-700"
								}`}
							>
								{b.type === "subtitle" ? "小標" : "段落"}
							</span>
							<div className="flex gap-3 text-neutral-500 text-sm">
								<button
									type="button"
									onClick={() => moveBlock(i, -1)}
									disabled={i === 0}
									className="disabled:opacity-30"
									title="上移"
								>
									↑
								</button>
								<button
									type="button"
									onClick={() => moveBlock(i, 1)}
									disabled={i === blocks.length - 1}
									className="disabled:opacity-30"
									title="下移"
								>
									↓
								</button>
								<button
									type="button"
									onClick={() => removeBlock(i)}
									className="text-red-600 hover:underline"
								>
									刪除
								</button>
							</div>
						</div>
						<textarea
							value={b.content}
							onChange={(e) => updateBlock(i, e.target.value)}
							rows={b.type === "subtitle" ? 1 : 4}
							placeholder={b.type === "subtitle" ? "小標文字" : "段落內容"}
							className="w-full border border-neutral-300 rounded px-3 py-2 text-sm"
						/>
					</div>
				))}
			</div>

			{error && <p className="text-red-600 text-sm">{error}</p>}

			<button
				disabled={busy}
				className="bg-neutral-800 text-white rounded-lg px-6 py-2 hover:bg-neutral-700 disabled:opacity-50"
			>
				{busy ? "發布中…" : "發布文章"}
			</button>
		</form>
	);
}
