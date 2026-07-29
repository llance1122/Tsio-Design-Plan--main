import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { url } from "../lib/paths";
// 沒上傳海報時的預設圖：與文章列表卡片用同一張，避免「列表一張、內頁另一張」的錯覺
import defaultHero from "../assets/imgs/default-cover.jpg";

export default function SingleArticlePage() {
	const { articleId } = useParams(); // 這裡的值其實是文章 slug
	const [article, setArticle] = useState(null);
	const [status, setStatus] = useState("loading"); // loading | notfound | error | ok

	useEffect(() => {
		setStatus("loading");
		fetch(url(`/api/articles/${articleId}`))
			.then((r) => {
				if (r.status === 404) throw new Error("notfound");
				if (!r.ok) throw new Error("error");
				return r.json();
			})
			.then((data) => {
				setArticle(data);
				setStatus("ok");
			})
			.catch((e) => setStatus(e.message === "notfound" ? "notfound" : "error"));
	}, [articleId]);

	if (status !== "ok") {
		const msg =
			status === "loading"
				? "載入中…"
				: status === "notfound"
					? "找不到這篇文章。"
					: "文章載入失敗，請稍後再試。";
		return (
			<section className="w-full mx-auto px-[40px] lg:max-w-7xl mt-[15vh] lg:mt-[24vh]">
				<p className="bodyText lg:bodyText-web text-center">{msg}</p>
			</section>
		);
	}

	// 主圖：優先用上傳的海報（接上 base），沒有則用預設圖
	const hero = article.cover ? url(article.cover) : defaultHero;

	return (
		<section className="w-full mx-auto md:px-[40px] lg:max-w-7xl xl:px-0 mt-[15vh] lg:mt-[24vh]">
			<div className="w-full space-y-[20px] lg:space-y-[2%]">
				<div className="m-auto w-full px-[40px] pb-10 lg:px-0 md:max-w-3xl xl:max-w-5xl">
					<h2 className="text-left heading lg:heading-web">{article.title}</h2>
				</div>
				<div className="w-full aspect-[2/1]">
					<img
						className="w-full h-full object-cover"
						src={hero}
						alt={article.title}
					/>
				</div>
				<div className="flex justify-end px-[40px] md:px-0">
					<p className="bodyText lg:bodyText-web">{article.date}</p>
				</div>
			</div>
			<div className="w-full mx-auto px-[40px] xl:px-0 lg:max-w-3xl space-y-[10px] lg:space-y-[20px]">
				{article.blocks.map((block, i) => renderer(block, i))}
			</div>
		</section>
	);
}

function renderer(value, i) {
	switch (value.type) {
		case "subtitle":
			return (
				<h3
					key={i}
					className="subtitle-bold lg:subtitle-bold-web mt-[5vh] lg:mt-[15vh]"
				>
					{value.content}
				</h3>
			);
		case "paragraph":
			return (
				<p key={i} className="bodyText lg:bodyText-web">
					{value.content}
				</p>
			);
		default:
			return null;
	}
}
