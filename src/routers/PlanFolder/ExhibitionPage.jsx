import Footer from "../../index_component/Footer";
import Nav from "../../index_component/Nav";
import Breadcrumbs from "../../small_component/Breadcrumbs";
import Title from "../../small_component/Title";
import exhibitionsData from "../../data/exhibitions";

import ExhibitionBanner from "../../assets/imgs/ExhibitionBanner.png";
import ExhibitionLayout from "../../assets/imgs/ExhibitionLayout.jpg";
import defaultAvatar from "../../assets/imgs/defaultAvatar.jpg";

export default function ExhibitionPage() {
	const TARGET_EXHIBITION_ID = "2024-E001";

	// 2. 從資料陣列中查找對應的單一展覽物件
	const currentExhibition = exhibitionsData.find(
		(exh) => exh.id === TARGET_EXHIBITION_ID
	);

	// 3. 安全地獲取參展人員名單。如果找不到展覽，則使用空陣列。
	const participants = currentExhibition?.participants || [];

	return (
		<section className="space-y-[10vh]">
			<main className="space-y-[10vh] lg:space-y-[20vh] mt-[15vh] lg:mt-[24vh]">
				<div className="w-full mx-auto px-[40px] lg:max-w-7xl">
					<Breadcrumbs word="Project" word2="Exhibition" />
				</div>

				<div className="w-full mx-auto px-[40px] max-w-7xl flex flex-col space-y-[50px] sm:flex-row sm:justify-between">
					<div className="">
						<p className="subtitle lg:subtitle-web">遠方還未說的話</p>
						<p className="bodyText lg:bodyText-web">《設醮》2025 年主題展覽</p>
						<p className="bodyText lg:bodyText-web">
							The Words Yet to Be Spoken from Afar
						</p>
					</div>
					<ul className="bodyText lg:bodyText-web">
						<li>展期：2025.08.15（五）– 08.25（日）</li>
						<li>時間：12:00–19:00（週一休展）</li>
						<li>地點：設醮空間站（假地址）</li>
						<li>入場方式：免費入場，部分作品需預約體驗</li>
						<li>主辦單位：設醮策展計劃 Sez-Jiao Project</li>
					</ul>
				</div>

				<div className="w-full aspect-[1917/796]">
					<img
						className="w-full h-full object-cover"
						src={ExhibitionBanner}
						alt=""
					/>
				</div>

				<div className="">
					<Title
						className="headline"
						title="主題概念｜Exhibition Concept"
						layout="horizontal"
					/>
					<div className="headline mx-auto w-[82.2vw] mt-[var(--title-gap-text)] lg:w-[900px]">
						<p className="headline bodyText lg:bodyText-web">
							他們曾從這裡出發，往夢想的方向走去，在遠方緩慢地雕刻自己、修補現實。有些話，在那時沒說出口；有些故事，在燃燒之後才懂得被訴說。《遠方還未說的話》象徵著尚未被傳遞的經驗，以及時間彼端的提醒與期盼。它可能是學長姊們從未明說的經歷、一路走來的困惑與轉折，也可能是對後來者的一封無聲情書。這是一種關於距離與時間的隱喻，也是一次關於傳承、回望與對話的邀請。我們希望透過本次展覽，讓那些從這條路上走過的人，將未曾說出口的話，轉化為作品、聲音、影像或空間裝置，靜靜擺放在後來者的眼前——不喧嘩，卻閃著光。
						</p>
					</div>
				</div>

				<div className="w-full mx-auto px-[40px] lg:max-w-7xl">
					<Title
						className="headline"
						title="創作與參展人員｜Artists & Contributors"
						layout="horizontal"
					/>
					<div className="headline mx-auto w-[82.2vw] mt-[var(--title-gap-text)] lg:w-[900px]">
						<p className="headline bodyText lg:bodyText-web">
							本次展覽由歷屆校友、地方創作者、設計背景青年共同參與，
							透過作品傳遞他們在不同城市、不同人生階段的片刻與回望。
						</p>
					</div>
					<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[2vw] gap-y-[60px] mt-[60px]">
						{participants.map((participant, index) => (
							<div key={index} className="flex flex-col space-y-4">
								{/* 圖片區塊 (左上角灰色/米色方塊) */}
								<div className="w-full aspect-square bg-gray-100 flex-shrink-0">
									<img
										src={defaultAvatar} // 假設這裡使用預設圖片
										alt={participant.name}
										className="w-full h-full object-cover opacity-0" // 圖片尚不存在時，保持灰色區塊
									/>
								</div>

								{/* 文字內容區塊 */}
								<div className="space-y-1">
									{/* 姓名 (如圖中的「謝語暢」) */}
									<h4 className="text-lg font-bold text-gray-900">
										{participant.name}
									</h4>

									{/* 簡介 (bio) */}
									<p className="text-sm text-gray-500 mt-2">
										{participant.bio}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="">
					<Title
						className="headline"
						title="展區結構｜Exhibition Layout"
						layout="horizontal"
					/>
					<div className="space-y-[35px] w-full mx-auto px-[40px] mt-[var(--title-gap)] lg:max-w-7xl md:flex md:flex-row md:items-center md:justify-center md:gap-[100px]">
						<div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
							<img
								className="w-full h-full object-cover"
								src={ExhibitionLayout}
								alt=""
							/>
						</div>

						<ul className="bodyText lg:bodyText-web space-y-[20px] lg:space-y-[35px]">
							<li>
								Zone A｜未竟之言
								<br />
								文字 × 空間裝置 × 記憶觸發
							</li>
							<li>
								Zone B｜傳承實驗室
								<br />
								書寫工作坊 × 青年創作 × 對話牆
							</li>
							<li>
								Zone C｜從遠方而來
								<br />
								校友作品 × 訪談紀錄 × 往返片段
							</li>
						</ul>
					</div>
				</div>
			</main>
		</section>
	);
}
