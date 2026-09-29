/**
 * 通用的 Profile/Content 卡片元件
 * @param {string} size - 圖片在 lg 斷點時的寬度 (例如 '400px')
 * @param {string} src - 圖片來源 URL
 * @param {string} name - 人物/影片標題
 * @param {string} job - 職稱/副標題 (電影模式下隱藏)
 * @param {string} content - 簡介/內容
 * @param {string} variant - 卡片變體：'movie' 為電影模式，未設定則為預設講師模式
 */
export default function ProfileCard({ size, src, name, job, content, variant }) {
	const isMovieVariant = variant === "movie";

	const titleClassName = isMovieVariant
		? "subtitle-bold lg:subtitle-bold-web" // 電影標題更大
		: "bodyText lg:bodyText-web"; // 講師標題

	return (
		<div className="space-y-[35px] flex flex-col md:flex-row md:justify-center md:items-center md:space-x-[70px] md:space-y-0">
			{/* 圖片寬度：手機滿版、md 固定 300px、lg 用傳入的 size。
			    寬度交給 CSS 斷點處理（size 透過 CSS 變數傳入），伺服器產生的 HTML 不必等 JS 量螢幕 */}
			<div
				className="w-full aspect-square md:w-[300px] lg:w-[var(--card-img-w)]"
				style={{ "--card-img-w": size }}
			>
				<img
					className="w-full h-full object-cover"
					src={src}
					alt={name}
					loading="lazy"
					decoding="async"
				/>
			</div>

			{/* min-[1200px]：圖 250 + space-x 70 + 文字 800 = 1120，加左右 padding 80 → 視窗超過
			    1200px 才有剩餘空間。不吃掉的話 justify-center 會把整張卡往內推、與麵包屑差 40px。 */}
			<div className={`${isMovieVariant ? "space-y-[25px]" : "space-y-[10px]"}  md:w-[450px] lg:w-[800px] min-[1200px]:flex-1`}>
				<h2 className={titleClassName}>{name}</h2>
				{!isMovieVariant && <p className="bodyText lg:bodyText-web">{job}</p>}
				<p className="bodyText lg:bodyText-web">{content}</p>
			</div>
		</div>
	);
}
