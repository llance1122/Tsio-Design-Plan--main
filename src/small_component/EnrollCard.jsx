import defaultCover from "../assets/imgs/default-cover.webp";

// 報名狀態 → 徽章文字與配色
// open 用深底白字（要跳出來），額滿／截止用灰底（存在但收斂）
const STATUS = {
	open: { label: "報名中", className: "bg-primary text-secondary" },
	full: { label: "已額滿", className: "bg-gray text-primary" },
	closed: { label: "已截止", className: "bg-gray text-primary" },
};

export default function EnrollCard({ item }) {
	if (!item) return null;

	const status = STATUS[item.status] ?? STATUS.open;
	// 只有報名中且有表單網址才可點；額滿／截止的卡片仍列出，但不連出去
	const clickable = status === STATUS.open && Boolean(item.formUrl);

	const content = (
		<>
			<div className="relative w-full aspect-video overflow-hidden">
				<img
					className="w-full h-full object-cover transition duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] group-hover:scale-105"
					src={item.cover || defaultCover}
					alt={item.title || "活動封面圖"}
				/>
				{/* 狀態徽章壓在封面左上角，掃視時先看到能不能報名 */}
				<span
					className={`absolute left-0 top-0 bodyText text-[12px] px-[12px] py-[6px] ${status.className}`}
				>
					{status.label}
				</span>
			</div>

			{/* 標題／日期沿用文章卡片的字級與間距（bodyText + mt-25 / mt-10） */}
			<h3 className="bodyText lg:bodyText-web mt-[25px]">{item.title}</h3>

			<p className="bodyText text-[12px] lg:bodyText-web mt-[10px]">{item.date}</p>

			{/* 報名指引：mt-auto 貼齊卡片底部，同一排卡片的標題長度不同也能對齊。
			    不可點的卡片（額滿／截止）不渲染這列，避免給出無效的行動提示。 */}
			{clickable && (
				<div className="mt-auto pt-[16px] flex justify-end">
					<span className="bodyText text-[12px] flex items-center gap-[4px] whitespace-nowrap">
						前往報名
						{/* 外開箭頭：提示會跳出網站到 Google 表單 */}
						<svg
							aria-hidden="true"
							width="10"
							height="10"
							viewBox="0 0 12 12"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.2"
							className="transition-transform duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
						>
							<path d="M3.5 8.5 8.5 3.5" />
							<path d="M4.5 3.5h4v4" />
						</svg>
					</span>
				</div>
			)}
		</>
	);

	// 報名連的是 Google 表單（站外），所以用 <a> 另開分頁，不是 react-router 的 Link
	const baseClass = "group flex flex-col md:w-full md:max-w-[600px] lg:max-w-[750px]";

	if (!clickable) {
		// 不可點：整張卡片降透明度，維持版面完整但不誘導點擊
		return <div className={`${baseClass} opacity-60`}>{content}</div>;
	}

	return (
		<a
			href={item.formUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`${item.title}（於新分頁開啟報名表單）`}
			className={baseClass}
		>
			{content}
		</a>
	);
}
