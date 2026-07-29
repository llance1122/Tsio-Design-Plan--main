import { useEffect, useState } from "react";
import CardLayout from "../small_component/CardLayout";
import { url } from "../lib/paths";

export default function ArticlesPage() {
	const [articles, setArticles] = useState([]);
	const [status, setStatus] = useState("loading"); // loading | error | ok

	useEffect(() => {
		fetch(url("/api/articles"))
			.then((r) => {
				if (!r.ok) throw new Error("讀取失敗");
				return r.json();
			})
			.then((data) => {
				setArticles(data);
				setStatus("ok");
			})
			.catch(() => setStatus("error"));
	}, []);

	return (
		<section className="w-full mx-auto px-[40px] xl:px-0 lg:max-w-7xl mt-[15vh] lg:mt-[24vh]">
			<h2 className="text-center heading-bold lg:heading-bold-web">文章總覽</h2>

			{status === "loading" && (
				<p className="bodyText lg:bodyText-web text-center mt-[60px]">載入中…</p>
			)}
			{status === "error" && (
				<p className="bodyText lg:bodyText-web text-center mt-[60px]">
					文章載入失敗，請稍後再試。
				</p>
			)}
			{status === "ok" && articles.length === 0 && (
				<p className="bodyText lg:bodyText-web text-center mt-[60px]">
					目前還沒有文章。
				</p>
			)}
			{status === "ok" && articles.length > 0 && (
				<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[2vw] gap-y-[60px] mt-[60px]">
					{articles.map((article) => (
						<CardLayout key={article.id} item={article} />
					))}
				</div>
			)}
		</section>
	);
}
