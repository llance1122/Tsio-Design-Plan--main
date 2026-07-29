import { NavLink } from "react-router";

// ============================================================
//  MoreLink — 首頁區塊尾端的「查看更多」CTA（細框 outline 樣式）
//  讀完內容後的行動點；hover 反白填滿 + 箭頭右滑。
//  箭頭用 SVG + currentColor，顏色隨文字自動翻轉（反白時變淺色）。
//
//  用法：<MoreLink to="/Plan" label="查看計畫" className="headline mt-[60px] lg:mt-[100px]" />
//  align：置中(center，預設) / 靠右(end) / 靠左(start)
// ============================================================
export default function MoreLink({ to, label, align = "center", className = "" }) {
	const justify =
		align === "end"
			? "justify-end"
			: align === "start"
			? "justify-start"
			: "justify-center";
	return (
		<div className={`flex ${justify} ${className}`}>
			<NavLink
				to={to}
				style={{ fontFamily: '"Shippori Mincho", serif' }}
				className="group inline-flex items-center gap-[16px] border border-primary px-[32px] py-[14px] text-[14px] lg:text-[16px] tracking-[0.1em] text-primary transition-colors duration-[var(--motion-base)] ease-[var(--motion-ease-standard)] hover:bg-primary hover:text-secondary"
			>
				{label}
				<svg
					width="46"
					height="12"
					viewBox="0 0 46 12"
					fill="none"
					aria-hidden="true"
					className="transition-transform duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] group-hover:translate-x-2"
				>
					<line
						x1="0"
						y1="6"
						x2="42"
						y2="6"
						stroke="currentColor"
						strokeWidth="1.2"
					/>
					<path
						d="M37 1.5 L44.5 6 L37 10.5"
						stroke="currentColor"
						strokeWidth="1.2"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</NavLink>
		</div>
	);
}
