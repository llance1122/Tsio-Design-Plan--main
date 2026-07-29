import { useEffect, useState, useCallback } from "react";
import { fetchArticles, deleteArticle } from "./api";
import ArticleForm from "./ArticleForm";

export default function Dashboard({ onLogout }) {
	const [articles, setArticles] = useState([]);
	const [msg, setMsg] = useState("");

	const load = useCallback(async () => {
		try {
			setArticles(await fetchArticles());
		} catch {
			setMsg("讀取文章列表失敗");
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const handleDelete = async (a) => {
		if (!window.confirm(`確定刪除「${a.title}」？此動作無法復原。`)) return;
		try {
			await deleteArticle(a.id);
			setMsg("已刪除");
			load();
		} catch (e) {
			setMsg(e.message);
		}
	};

	return (
		<div className="min-h-screen bg-neutral-100">
			<header className="bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
				<h1 className="font-semibold">設醮後台 · 文章管理</h1>
				<button
					onClick={onLogout}
					className="text-sm text-neutral-500 hover:text-neutral-800"
				>
					登出
				</button>
			</header>

			<main className="max-w-3xl mx-auto p-6 space-y-6">
				<ArticleForm
					onCreated={() => {
						setMsg("發布成功！");
						load();
					}}
				/>

				{msg && <p className="text-green-700 text-sm">{msg}</p>}

				<section className="bg-white rounded-xl shadow p-6">
					<h2 className="font-semibold mb-4">已發布文章（{articles.length}）</h2>
					{articles.length === 0 ? (
						<p className="text-sm text-neutral-400">目前沒有文章。</p>
					) : (
						<ul className="divide-y divide-neutral-100">
							{articles.map((a) => (
								<li
									key={a.id}
									className="py-3 flex items-center justify-between gap-4"
								>
									<div className="min-w-0">
										<p className="truncate">{a.title}</p>
										<p className="text-xs text-neutral-400">
											{a.date} · /{a.slug}
										</p>
									</div>
									<button
										onClick={() => handleDelete(a)}
										className="text-sm text-red-600 hover:underline shrink-0"
									>
										刪除
									</button>
								</li>
							))}
						</ul>
					)}
				</section>
			</main>
		</div>
	);
}
