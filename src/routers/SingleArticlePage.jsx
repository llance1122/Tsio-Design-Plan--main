import { useParams } from "react-router";
import Exhibition_1 from "../assets/imgs/Exhibition_1.jpg";
import data from "../data/article.json";

export default function SingleArticlePage() {
	const { articleId } = useParams();
	const currentArticle = data.find((obj) => obj.id === articleId);
	const articleContents = currentArticle.newsContent;

	const title = articleContents[0];
	const heroImage = articleContents[1];
	const date = articleContents[2];

	const bodyContent = articleContents.slice(3);

	return (
		<section className="w-full mx-auto md:px-[40px] lg:max-w-7xl xl:px-0 mt-[15vh] lg:mt-[24vh]">
			<div className="w-full space-y-[20px] lg:space-y-[2%]">
				<div className="m-auto w-full px-[40px] pb-10 lg:px-0 md:max-w-3xl xl:max-w-5xl">
					<h2 className="text-left heading lg:heading-web">{title.content}</h2>
				</div>
				<div className="w-full aspect-[2/1]">
					<img
						className="w-full h-full object-cover"
						src={Exhibition_1}
						alt=""
					/>
				</div>
				<div className="flex justify-end px-[40px] md:px-0">
					<p className="bodyText lg:bodyText-web">{date.content}</p>
				</div>
			</div>
			<div className="w-full mx-auto px-[40px] xl:px-0 lg:max-w-3xl space-y-[10px] lg:space-y-[20px]">
				{bodyContent.map((obj) => renderer(obj))}
			</div>
		</section>
	);
}

function renderer(value) {
	const type = value.type;
	switch (type) {
		case "subtitle":
			return (
				<h3 className="subtitle-bold lg:subtitle-bold-web mt-[5vh] lg:mt-[15vh]">
					{value.content}
				</h3>
			);
		case "paragraph":
			return <p className="bodyText lg:bodyText-web">{value.content}</p>;
	}
}

// <section className="w-full mx-auto px-[40px] xl:px-0 lg:max-w-7xl mt-[15vh] lg:mt-[24vh]">
// 	<div className="w-full space-y-[20px] lg:space-y-[2%]">
// 		{/* 標題應致左還是致中 找他們討論 */}
// 		<h2 className="text-center heading-bold lg:heading-bold-web">
// 			{title.content}
// 		</h2>
// 		{/* 螢幕尺寸變小時置左，與圖片對齊 */}
// 		<div className="w-full aspect-[2/1]">
// 			<img
// 				className="w-full h-full object-cover"
// 				src={Exhibition_1}
// 				alt=""
// 			/>
// 		</div>
// 		<div className=" flex justify-end">
// 			<p className="bodyText lg:bodyText-web">{date.content}</p>
// 		</div>
// 	</div>
// 	<div className="w-full mx-auto px-[40px] xl:px-0 lg:max-w-4xl space-y-[10px] lg:space-y-[20px]">
// 		<h3 className="subtitle-bold lg:subtitle-bold-web mt-[5vh] lg:mt-[15vh]">
// 			專訪｜連子沂：以永續理念打造兼具功能與價值的產品設計
// 		</h3>
// 		<p className="bodyText lg:bodyText-web">
// 			連子沂，目前擔任三今設計負責人，帶領團隊專注於產品外觀設計。除了核心的外觀設計服務，三今設計還提供產品建模、概念設計、產品動畫與模型製作等全方位設計服務，為客戶提供從概念到實現的一站式解決方案。對連子沂而言，設計不僅是解決功能需求的工具，更是一種思考人、環境與產品三者關係的方式。她表示：「我們希望產品不只是功能導向，也不只是滿足業主需求，而是能同時關注環境議題，將永續設計理念融入其中。」這份理念源於他的大學時期。從最初的專題發想就以永續為核心，連子沂在接案過程中，也常說服業主將永續發展目標（SDGs）的元素納入設計。她認為，真正好的產品設計，應該在滿足使用者需求的同時，也兼顧社會與環境的價值。在她的帶領下，三今設計不僅完成了多項創新的產品設計專案，也將永續理念落實於每一個設計決策，持續拓展產品與環境、社會之間的關聯。
// 		</p>
// 		<h3 className="subtitle-bold lg:subtitle-bold-web mt-[5vh] lg:mt-[15vh]">
// 			一次填志願的轉向，開啟工業設計之路
// 		</h3>
// 		<p className="bodyText lg:bodyText-web">
// 			連子沂，目前擔任三今設計負責人，帶領團隊專注於產品外觀設計。除了核心的外觀設計服務，三今設計還提供產品建模、概念設計、產品動畫與模型製作等全方位設計服務，為客戶提供從概念到實現的一站式解決方案。對連子沂而言，設計不僅是解決功能需求的工具，更是一種思考人、環境與產品三者關係的方式。她表示：「我們希望產品不只是功能導向，也不只是滿足業主需求，而是能同時關注環境議題，將永續設計理念融入其中。」這份理念源於他的大學時期。從最初的專題發想就以永續為核心，連子沂在接案過程中，也常說服業主將永續發展目標（SDGs）的元素納入設計。她認為，真正好的產品設計，應該在滿足使用者需求的同時，也兼顧社會與環境的價值。在她的帶領下，三今設計不僅完成了多項創新的產品設計專案，也將永續理念落實於每一個設計決策，持續拓展產品與環境、社會之間的關聯。
// 		</p>
// 	</div>
// </section>
