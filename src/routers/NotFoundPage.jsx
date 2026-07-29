import { NavLink } from "react-router";

export default function NotFoundPage() {
	return (
		<section className="w-full mx-auto px-[40px] lg:max-w-7xl mt-[25vh] lg:mt-[30vh] mb-[20vh] text-center space-y-[30px]">
			<p className="concept-title lg:concept-title-web">404</p>
			<h2 className="heading-bold lg:heading-bold-web">找不到這個頁面</h2>
			<p className="bodyText lg:bodyText-web">
				您要找的頁面可能已被移除、更名，或暫時無法使用。
			</p>
			<NavLink
				to="/"
				className="inline-block bodyText lg:bodyText-web border border-primary px-[32px] py-[14px] tracking-[0.1em] text-primary transition-colors duration-[var(--motion-base)] hover:bg-primary hover:text-secondary"
			>
				回到首頁
			</NavLink>
		</section>
	);
}
