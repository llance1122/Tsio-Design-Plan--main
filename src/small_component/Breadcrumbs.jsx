import { Link } from "react-router";

// 顯示文字 → 路由對照（有 word2 時，第一層可點擊回上層）
// 目前只有 Plan 子頁會傳 word2；未來 About/Contact 若有子頁再補上對應路由
const ROUTES = {
	Project: "/Plan",
};

export default function Breadcrumbs({ word, word2 }) {
	// 組出階層：word →（word2）
	// 最後一層是當前頁面：灰色、不可點
	const crumbs = [
		{ label: word, link: word2 && ROUTES[word] ? ROUTES[word] : null },
		...(word2 ? [{ label: word2, link: null }] : []),
	];

	return (
		<nav aria-label="麵包屑導覽">
			<ol className="flex items-center gap-[10px] font-serif text-[12px] tracking-[0.15em] uppercase lg:text-[14px]">
				{crumbs.map((crumb, i) => (
					<li key={i} className="flex items-center gap-[10px]">
						{i > 0 && (
							<span aria-hidden="true" className="text-gray-400">
								·
							</span>
						)}
						{crumb.link ? (
							<Link
								to={crumb.link}
								className="text-primary hover:text-gray-500 transition-colors duration-[var(--motion-fast)]"
							>
								{crumb.label}
							</Link>
						) : (
							<span aria-current="page" className="text-gray-400">
								{crumb.label}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
