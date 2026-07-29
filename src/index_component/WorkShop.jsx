import Title from "../small_component/Title";
import MoreLink from "../small_component/MoreLink";
import workShop_1 from "../assets/workShop_1.jpg";
import workShop_2 from "../assets/workShop_2.jpg";
import workShop_3 from "../assets/workShop_3.jpeg";

export default function WorkShop() {
	return (
		<section className="flex flex-col items-center">
			<Title titleEN="workshop" title="工作坊" />
			<div className="w-full flex space-x-[18%] mt-[var(--title-gap)]">
				<div className="w-[43%] h-[200px] flex items-end sel md:h-[400px] lg:h-[800px]">
					<div className="w-full">
						<img
							className="h-full w-full object-cover headline"
							src={workShop_1}
							alt=""
						/>
					</div>
				</div>
				<div className="w-[39%]">
					<div className="w-full aspect-square">
						<img
							className="h-full w-full object-cover headline"
							src={workShop_2}
							alt=""
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
			<div className="my-auto bodyText-bold [writing-mode:vertical-lr] lg:bodyText-large-bold-web headline mt-[60px] lg:mt-[135px]">
				<p className="tracking-[0.4em]">﹁一起動手，設下自己的微型儀式。﹂</p>
			</div>
			<div className="relative w-[83%] aspect-[11/3.5] mt-[60px] lg:mt-[135px]">
				<img
					className="absolute w-full h-full object-cover object-top headline"
					src={workShop_3}
					alt=""
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
