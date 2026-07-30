import Footer from "../index_component/Footer";
import Nav from "../index_component/Nav";
import Title from "../small_component/Title";
import AboutPage_1 from "../assets/photos/AboutPage_1.jpg";
import AboutPage_2 from "../assets/photos/AboutPage_2.jpg";
import AboutPage_3 from "../assets/photos/AboutPage_3.jpg";
import { useEffect, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { interval } from "../config/motion";

export default function AboutPage() {
	useScrollReveal();

	return (
		<section className="space-y-[20vh]">
			<main className="space-y-[10vh] mt-[15vh] lg:space-y-[20vh] lg:mt-[24vh]">
				<div className="space-y-[20px] w-full lg:space-y-[2%]">
					<ImageGallery />
				</div>

				<div className="">
					<Title
						className="headline"
						titleEN="Name Origin"
						title="計劃的由來"
					/>
					<div className="headline w-full mx-auto px-[40px] lg:max-w-4xl mt-[var(--title-gap-text)]">
						<p className="bodyText lg:bodyText-web">
							「設醮」一詞，融合了
							<strong>設計（Design）與儀式（Ritual）</strong>的雙重意涵。
							<br />
							<br />
							「設」代表設計的行為——涵蓋觀察、詮釋、介入與提案，是一種對當代議題的回應手段與創造工具。
							「醮」源自東亞文化中的宗教儀式，為傳統社會中人與天地、社群與信仰之間的重要媒介，承載著祈福、記憶、轉化與集體行動的意義。
							<br />
							<br />
							我們選擇「設醮」作為命名，意圖將設計視為一種當代儀式的再詮釋。
							<br />
							<br />
							在快速變動與高度資訊化的社會中，「設計」不僅是視覺或產品的產出，更可視為一種具有召喚力的場域建構——如同「醮」的形式，設計同樣可以喚起群體關注、集結能量、傳遞願景。本計畫透過空間設計、展演行動與群體參與，嘗試在當代脈絡下召開一場「設醮」，
							不為神明設壇，而為人群設場；
							不為超自然祈求，而為當代生活、地方連結與文化共感開啟對話。
							<br />
							<br />
							「設醮」，是一場對現實的溫柔干預，一種將創作與共感轉化為行動的當代表述方式。
						</p>
					</div>
				</div>

				<div className="">
					<Title titleEN="What We Do" title="我們主要在做什麼" />
					<div className="headline w-full mx-auto px-[40px] lg:max-w-4xl mt-[var(--title-gap-text)]">
						<p className="bodyText lg:bodyText-web">
							我們是一群喜歡動手、愛觀察、敢玩創意的人，來自不同科系、背景與生活經驗，卻因為對設計與生活的熱情走在一起。
							<br />
							<br />
							我們透過展覽、工作坊、市集等多元形式的實體活動，讓設計不再只是展場裡的名詞，而是可以被觸摸、被參與、被共同完成的日常經驗。
							<br />
							<br />
							在這裡，每一個點子都有被實踐的可能，每一種聲音都有被看見的機會。你不需要是設計師，也不需要有什麼專業背景，因為我們相信「設計」其實離每個人都很近——
							它可能是一場對話、一張圖、一段走過的路，甚至是一次你願意參與的行動。
							<br />
							<br />
							歡迎你一起走進來，不只是參觀，而是參與。
							<br />
							<br />
							在這裡，我們一起設，一起醮；一起創造，也一起感受。
						</p>
					</div>
				</div>
			</main>
		</section>
	);
}

const ImageGallery = () => {
	const images = [AboutPage_1, AboutPage_2, AboutPage_3];

	const [isMobile, setIsMobile] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		let intervalId;
		if (isMobile) {
			intervalId = setInterval(() => {
				setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
			}, interval.crossfade);

			return () => {
				clearInterval(intervalId);
			};
		}
	}, [isMobile, images.length]);

	if (isMobile) {
		return (
			<div className="w-full aspect-video relative overflow-hidden">
				{images.map((img, index) => (
					<img
						key={index}
						src={img}
						alt=""
						className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[var(--motion-slow)] ease-[var(--motion-ease-standard)] ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
					/>
				))}
			</div>
		);
	} else {
		return (
			<div className="flex gap-[5px] h-[68vh] lg:h-[62vh] mx-auto ">
				<div className="grow-1 basis-0 h-full">
					<img className="w-full h-full object-cover" src={images[0]} alt="" />
				</div>
				<div className="grow-1 basis-0 h-full">
					<img className="w-full h-full object-cover" src={images[1]} alt="" />
				</div>
				<div className="grow-1 basis-0 h-full">
					<img
						className="w-full h-full object-cover object-bottom"
						src={images[2]}
						alt=""
					/>
				</div>
			</div>
		);
	}
};
