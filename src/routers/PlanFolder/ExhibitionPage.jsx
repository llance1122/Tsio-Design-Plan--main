import Breadcrumbs from "../../small_component/Breadcrumbs";
import Title from "../../small_component/Title";
import Attendee from "../../assets/dialoguesPhotos/Attendee.webp";
import LuChiChun from "../../assets/dialoguesPhotos/LuChiChun.webp";
import ChunYenChiu from "../../assets/dialoguesPhotos/ChunYenChiu.webp";
import Cyan from "../../assets/dialoguesPhotos/Cyan.webp";
import EvelynLee from "../../assets/dialoguesPhotos/EvelynLee.webp";
import ChouYuChen from "../../assets/dialoguesPhotos/ChouYuChen.webp";
import YangHsinI from "../../assets/dialoguesPhotos/YangHsinI.webp";
import HuangKuanWei from "../../assets/dialoguesPhotos/HuangKuanWei.webp";
import ChangYuJu from "../../assets/dialoguesPhotos/ChangYuJu.webp";
import KaoYunHsuanChangYuJu from "../../assets/dialoguesPhotos/KaoYunHsuanChangYuJu.webp";
import PengHsiuHsiung from "../../assets/dialoguesPhotos/PengHsiuHsiung.webp";

import ExhibitionBanner from "../../assets/imgs/ExhibitionBanner.webp";

// 參與人員：外層每個陣列是一行，同一行的職稱並排（窄螢幕會自動換行）
const CREDITS = [
	[
		{
			role: "參展人",
			names: [
				"呂奇駿",
				"邱俊彥",
				"藍亞青",
				"李依霖",
				"周宥岑",
				"楊欣頤",
				"黃冠瑋",
				"張語如",
				"高允萱",
				"彭秀雄",
				"許云馨",
				"洪莞喬",
				"賴傳旺",
				"郭奕",
			],
		},
	],
	[
		{ role: "總策展人", names: ["彭秀雄"] },
		{ role: "策展團隊", names: ["許云馨", "洪莞喬", "賴傳旺", "郭奕"] },
	],
];

const ACCUMULATION_WORKS = [
	{
		image: LuChiChun,
		title: "《「畫圖的時候」從一張草圖到一部電影》",
		year: "2019/2020/2022",
		artist: "呂奇駿 Lu Chi Chun",
		role: "再現影像製作股份有限公司 藝術總監",
		description:
			"回溯《返校》、《消失的情人節》及 OQLIQ 倫敦時裝周影像作品的創作歷程，「草圖繪畫」是整理思緒與建構視覺語言的重要媒介；每一筆都是對畫面的推敲，也是連結抽象想像與具體影像的起點。",
	},
	{
		image: ChunYenChiu,
		title: "《左與右》",
		year: "2026",
		artist: "邱俊彥 Chun Yen Chiu",
		role: "三刀人形工作室 當代雕塑創作者",
		description:
			"左右手連結左右腦，操控兩尊布袋戲偶；偶手裡，又各自操縱一個「我」。四偶分代表感性、創造、邏輯與探索。究竟是我在操縱他們，還是他們構成了我？",
	},
	{
		image: Cyan,
		imageClassName: "scale-[1.4]",
		title: "《50%的自白打樣》",
		year: "2026",
		artist: "藍亞青 Cyan",
		role: "喳吧工作室 負責人",
		description:
			"一件手工包的誕生，由手作者無數次的自白與辯駁堆疊而成。在這裡，包體刻意停留在 50% 的半成品型態。被拆掉的線頭、留有尺寸劃線痕跡的皮革及因應手感而臨時改變的洞距，都是一段段矛盾與和解的對話過程。",
	},
	{
		image: EvelynLee,
		title: "《13》",
		year: "2024",
		artist: "李依霖 Evelyn Lee",
		role: "台灣藝術家、攝影師、電影製作人",
		description:
			"始於2022年，源自祖父的離世。影像從私人失落隨著在各城市與文化間移動逐漸累積，慢慢超越了對祖父的悼念，成為一場關於消逝、連結與存在的持續凝視。",
		note: "本片所有影像皆由紐約後期製作工作室 Metropolis Post 沖洗。",
	},
];

const FLOW_WORKS = [
	{
		image: ChouYuChen,
		title: "《拾痕》",
		year: "2026",
		artist: "周宥岑 Chou Yu Chen",
		role: "長庚大學 工業設計學系31屆",
		description:
			"手帳、拼貼與縫紉，是我與時間相處的方式；而陽光總能為日常添上一點明亮。將舊衣裁切、拆解、縫合，讓過往重新延續，在光影之間拾起散落的記憶，留下生活的餘痕。",
	},
	{
		image: YangHsinI,
		title: "《審判我》",
		year: "2026",
		artist: "楊欣頤 Yang Hsin I",
		role: "長庚大學 工業設計學系31屆",
		description: (
			<>
				「將過錯加諸於受難者上，只因她是女性」。
				<br />
				以男性中心主義將罪過加諸受暴女性，將梅杜莎妖魔化以掩蓋罪行。
				結合十字架意象，撕開偽善壓迫，直面體制暴力的集體贖罪。
			</>
		),
	},
	{
		image: HuangKuanWei,
		title: "《開眼》",
		year: "2026",
		artist: "黃冠瑋 Huang Kuan Wei",
		role: "長庚大學 工業設計學系30屆",
		description:
			"結合日本 JDM 經典掀蓋車燈（Pop-up Headlights）與台灣傳統八家將「開眼」儀式，將車燈升起化為家將畫臉後賦予神采的點睛意象。向黃金時代的機械浪漫致敬之餘，亦透過文化符號的解構與重組，為現代跑車語彙注入強烈的東方信仰張力。",
	},
	{
		image: ChangYuJu,
		title: "《讓時間發呆》",
		year: "2026",
		artist: "張語如 Chang Yu Ju",
		role: "長庚大學 工業設計學系碩士22屆",
		description:
			"為重新體會「我正在生活」的原始悸動，作品主軸從自身出發，以陶瓷物件創造生活中的「停頓」，表達接納過去的倉促並放下對未來的焦慮，專注感受當下純粹的呼吸與流動，重新體會生活。",
	},
	{
		image: KaoYunHsuanChangYuJu,
		title: "《ARCTIUM》",
		year: "2024",
		artist: "高允萱 Kao Yun Hsuan、張語如 Chang Yu Ju",
		role: "長庚大學 工業設計學系碩士22屆",
		description:
			"一切的初衷，始於我們想在海邊尋找一份自在與寧靜。 我們希望這組家具不僅僅是空間中的物件，而是能化作一處遠離喧囂的「避風港」。能讓使用者能更沉浸在屬於自己的安寧片刻，與周遭環境完美融合。",
	},
];

const RIPPLE_WORKS = [
	{
		image: PengHsiuHsiung,
		title: "《在嗎？我在 — 無聲的回應》",
		year: "2026",
		artist:
			"彭秀雄 Peng Hsiu Hsiung、許云馨 Hsu Yun Hsin、賴傳旺 Lai Chung Wang、洪莞喬 Hung Wan Chiao、郭奕 Kuo Yi",
		note: "「在嗎？」向自己提出疑問；「我在」持續的自我確認。",
		descriptions: [
			"以自我認同與個體化為核心，將自我探索轉化為「覺察、質疑、衝突、整合、生成」的心理歷程。在烏黑的空間裡，鏡面、光影、聲音、物件與互動裝置交織成一個與自己對話的場域，讓抽象的內在狀態成為可以觀看、感受與參與的經驗。",
			"觀者在鏡像中看見自己，在光影與聲音中感受到自己的存在，山林與大海推向自我的內在，山林象徵著凝視與沉靜，大海象徵著未知的流動，每一次的感受與互動，留下屬於當下的自我。",
			"參與不只是作品的一部分，是一次無聲的回應——「在嗎？」 「我在。」",
			"不提供「我是誰」的答案，而是讓每個人暫停下來，重新觀看自己。因為自我並非一個等待被找到的答案，而是在一次次的對話中持續流動。",
		],
	},
];

export default function ExhibitionPage() {
	const TARGET_EXHIBITION_ID = "2024-E001";

	return (
		<section className="space-y-[10vh]">
			<main className="space-y-[10vh] lg:space-y-[20vh] mt-[15vh] lg:mt-[24vh]">
				<div className="w-full mx-auto px-[40px] lg:max-w-7xl">
					<Breadcrumbs
						word="Plan"
						word2="Exhibition"
						word3="對話的對話—在彼此的痕跡中流動"
					/>
				</div>

				<div className="w-full aspect-[16/9]">
					<img
						className="w-full h-full object-cover"
						src={ExhibitionBanner}
						alt=""
					/>
				</div>

				<div className="">
					<Title
						className="headline"
						title="參與人員｜Participants"
						layout="horizontal"
					/>
					<dl className="headline mx-auto w-[82.2vw] mt-[var(--title-gap-text)] space-y-[15px] lg:w-[900px]">
						{CREDITS.map((row) => (
							<div
								key={row[0].role}
								className="flex flex-wrap gap-x-[60px] gap-y-[15px]"
							>
								{row.map(({ role, names }) => (
									<div
										key={role}
										className="grid min-w-0 grid-cols-[6em_minmax(0,1fr)] items-baseline gap-x-[20px]"
									>
										<dt className="bodyText lg:bodyText-web text-primary">
											{role}｜
										</dt>
										<dd className="bodyText lg:bodyText-web flex flex-wrap gap-x-[1em] gap-y-[5px]">
											{names.map((name) => (
												<span key={name}>{name}</span>
											))}
										</dd>
									</div>
								))}
							</div>
						))}
					</dl>
				</div>

				<div className="">
					<Title
						className="headline"
						title="主題概念｜Exhibition Concept"
						layout="horizontal"
					/>
					<div className="headline mx-auto w-[82.2vw] mt-[var(--title-gap-text)] lg:w-[900px]">
						<p className="headline bodyText lg:bodyText-web">
							以「對話」為核心命題，探索存在主義哲學脈絡下的自我建構與創作關係。
							「對話的對話」意指對話本身的多層次性，人與人、人與物、人與思想等多面向的可能性，它不僅是語言的傳遞，更是一種存在的過程：在回應、誤解、沉默與內在辯證之中，人逐漸形成對自我的理解成形，並在與他者的關係中確認自身位置與意義。
							<br />
							<br />
							「在彼此的痕跡中流動」作為副標題，指出每一次對話皆會留下痕跡，一句話、一種情緒、一段無法回返的經驗不斷地產生。這些痕跡沉積於個體之中，並在後續的關係裡持續作用，形成人、物、思想之間微妙而深層的連結。
						</p>
					</div>
				</div>

				<div className="headline mx-auto w-[82.2vw] mt-[var(--title-gap-text)] lg:w-[900px]">
					<Title
						className="headline "
						title="參與者共同創作｜Collaborative Works by Participants"
						layout="horizontal"
					/>
					<img
						className="w-full mt-[var(--title-gap-text)]"
						src={Attendee}
						alt="參與者共同創作參考圖"
						loading="lazy"
						decoding="async"
					/>
					<div className="headline mx-auto w-[82.2vw] mt-[var(--title-gap-text)] lg:w-[900px]">
						<p className="headline bodyText lg:bodyText-web">
							人被拋入世界，從來沒有一種預先存在的方向，透過共創參與式創作的方式，拋入作品之中。
							<br />
							<br />
							以「線」作為存在的意義，沒有固定的起點，沒有預設的終點，隨著時間流動，產生無法完全預測的路徑。當一條線與另一條線相遇，原本獨立的存在開始產生關係，每一條線，都是一個當下的存在，每一次交會，都是彼此重新定義的開始。我們無法獨立於他者而存在，自我也並非固定不變，而是在與世界人事物的相遇中不斷確認、質疑與重新認定。
							<br />
							<br />
							作品沒有唯一的觀看方式，也沒有最終完成的狀態，「存在」不是一個確定的答案，是一個持續發生的過程，作品所留下的，不只是線條，而是共同創作者的存在。
						</p>
					</div>
				</div>

				<section className="headline mx-auto w-[82.2vw] lg:w-[900px]">
					<Title
						className="headline "
						title="沉積｜創作歷程視為一層層時間的沉積物，不斷地累積以及沉澱。"
						layout="horizontal"
					/>

					<div className="mt-[var(--title-gap)] space-y-[60px] lg:space-y-[80px]">
						{ACCUMULATION_WORKS.map((work) => (
							<article
								key={work.title}
								className="grid grid-cols-1 items-center gap-[25px] text-left md:grid-cols-[261px_minmax(0,1fr)] md:gap-[35px]"
							>
								<div className="aspect-[261/165] w-full self-start overflow-hidden md:w-[261px] md:self-center">
									<img
										className={`h-full w-full object-cover ${work.imageClassName ?? ""}`}
										src={work.image}
										alt={`${work.artist} 作品`}
										loading="lazy"
										decoding="async"
									/>
								</div>
								<div className="">
									<p>
										<span className="bodyText lg:bodyText-large-web exhibition-work-title">
											{work.title}
										</span>
									</p>
									<p className="bodyText mt-[5px] text-primary">
										{work.artist}
										<span className="label ml-[12px] opacity-70">
											{work.role}
										</span>
									</p>

									<p className="bodyText lg:bodyText-web mt-[15px]">
										{work.description}
									</p>
									{work.note && <p className="label mt-[10px]">{work.note}</p>}
								</div>
							</article>
						))}
					</div>
				</section>

				<section className="headline mx-auto w-[82.2vw] lg:w-[900px]">
					<div className="w-full min-w-0 overflow-hidden">
						<Title
							className="headline"
							title="湧流｜我是誰？我想成為什麼樣的人？"
							layout="horizontal"
						/>
					</div>

					<div className="mt-[var(--title-gap)] space-y-[60px] lg:space-y-[80px]">
						{FLOW_WORKS.map((work) => (
							<article
								key={work.title}
								className="grid grid-cols-1 items-start gap-[25px] text-left md:items-center md:grid-cols-[261px_minmax(0,1fr)] md:gap-[35px]"
							>
								<div className="aspect-[261/165] w-full self-start overflow-hidden md:w-[261px] md:self-center">
									<img
										className="h-full w-full object-cover"
										src={work.image}
										alt={`${work.artist} 作品`}
										loading="lazy"
										decoding="async"
									/>
								</div>
								<div className="min-w-0 self-start md:self-center">
									<p>
										<span className="bodyText lg:bodyText-large-web exhibition-work-title">
											{work.title}
										</span>
									</p>
									<p className="bodyText mt-[5px] text-primary">
										{work.artist}
										<span className="label ml-[12px] opacity-70">
											{work.role}
										</span>
									</p>
									<p className="bodyText lg:bodyText-web mt-[15px]">
										{work.description}
									</p>
								</div>
							</article>
						))}
					</div>
				</section>

				<section className="headline mx-auto w-[82.2vw] lg:w-[900px]">
					<Title
						className="headline"
						title="餘波｜透過每一次的感受與互動，留下屬於當下的自我。"
						layout="horizontal"
					/>

					<div className="mt-[var(--title-gap)] space-y-[60px] lg:space-y-[80px]">
						{RIPPLE_WORKS.map((work) => (
							<article
								key={work.title}
								className="grid grid-cols-1 gap-[25px] text-left md:grid-cols-[261px_minmax(0,1fr)] md:gap-[35px]"
							>
								<div className="aspect-[261/165] w-full overflow-hidden md:w-[261px]">
									<img
										className="h-full w-full object-cover"
										src={work.image}
										alt={`${work.artist} 作品`}
										loading="lazy"
										decoding="async"
									/>
								</div>

								<div className="min-w-0 self-center">
									<p className="bodyText lg:bodyText-large-web">
										<span className="bodyText lg:bodyText-large-web exhibition-work-title">
											{work.title}
										</span>
									</p>
									<p className="bodyText mt-[5px]">{work.artist}</p>
									{work.note && (
										<p className="bodyText mt-[15px]">{work.note}</p>
									)}
								</div>

								<div className="space-y-[15px] md:col-span-2">
									{work.descriptions.map((description) => (
										<p key={description} className="bodyText lg:bodyText-web">
											{description}
										</p>
									))}
								</div>
							</article>
						))}
					</div>
				</section>
			</main>
		</section>
	);
}
