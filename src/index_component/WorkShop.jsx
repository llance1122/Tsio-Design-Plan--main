import Title from "../small_component/Title";
import MoreLink from "../small_component/MoreLink";
import workShop_1 from "../assets/photos/workShop_1.webp";
import workShop_2 from "../assets/photos/workShop_2.webp";
import workShop_3 from "../assets/photos/workShop_3.webp";

export default function WorkShop() {
	return (
		<section className="flex flex-col items-center">
			<Title titleEN="workshop" title="工作坊" />
			<div className="w-full flex justify-end space-x-[18%] mt-[var(--title-gap)] lg:justify-start">
				<div className="hidden w-[43%] h-[200px] origin-left scale-[1.1] items-end md:h-[400px] lg:flex lg:h-[800px] lg:scale-100">
					<div className="w-full">
						<img
							className="h-full w-full object-cover headline"
							src={workShop_1}
							alt=""
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>
				<div className="w-[39%] origin-right scale-[1.1] lg:scale-100">
					<div className="w-full aspect-square">
						<img
							className="h-full w-full object-cover headline"
							src={workShop_2}
							alt=""
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>
			</div>
			<div className="w-[300px] bodyText lg:bodyText-large-web lg:w-[800px] headline mt-[60px] lg:mt-[135px]">
				<p>
					來自不同文化的職人，將他們日常中珍貴的技藝與生命哲學帶來現場，與你一同分享。無論是木作、織品、陶藝、書寫，或是任何充滿溫度的創作方式，都是一次與「世界」產生真實連結的機會。
					<br />
					<br />
					我們希望你不只帶回作品，更帶回一種看待生活的方式。
				</p>
			</div>
			<div className="w-[43%] h-[200px] origin-left scale-[1.1] self-start flex items-end md:h-[400px] lg:hidden">
				<div className="w-full">
					<img
						className="h-full w-full object-cover headline"
						src={workShop_1}
						alt=""
						loading="lazy"
						decoding="async"
					/>
				</div>
			</div>
			<div className="my-auto bodyText-bold [writing-mode:vertical-lr] lg:bodyText-large-bold-web headline mt-[60px] lg:mt-[135px]">
				<p className="tracking-[0.4em]">﹁一起動手，設下自己的微型儀式。﹂</p>
			</div>
			<div className="relative w-[83%] origin-center scale-[1.1] aspect-[11/3.5] mt-[60px] lg:mt-[135px] lg:scale-100">
				<img
					className="absolute w-full h-full object-cover object-top headline"
					src={workShop_3}
					alt=""
					loading="lazy"
					decoding="async"
				/>
			</div>
			<MoreLink
				to="/Plan/Workshop"
				label="查看工作坊"
				className="headline mt-[60px] lg:mt-[100px]"
			/>
		</section>
	);
}
