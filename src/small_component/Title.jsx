import { NavLink } from "react-router";

export default function Title({
	titleEN,
	title,
	icon,
	link,
	layout = "vertical",
}) {
	// 根據 layout prop 決定要套用的 CSS 類別
	const containerClass =
		layout === "horizontal"
			? "group flex flex-row justify-center space-x-[10px] my-auto"
			: "group flex flex-col items-center space-y-[10px] [writing-mode:vertical-lr] my-auto lg:space-y-[15px]";

	const titleClass =
		layout === "horizontal"
			? "subtitle-bold lg:subtitle-bold-web"
			: "subtitle-bold lg:subtitle-bold-web lg:tracking-[0%]";
	const titleENClass =
		layout === "horizontal"
			? "hidden"
			: "text-[12px] font-serif tracking-[0.4em] lg:tracking-[0.6em] lg:text-[16px]";

	const titleENElement = <p className={titleENClass}>{titleEN}</p>;
	const titleElement = <p className={titleClass}>{title}</p>;
	// 沒傳 icon 時不渲染，避免留下空 div 造成多餘間距（純標籤模式）
	const iconElement = icon ? <div className="group">{icon}</div> : null;

	// 根據 layout 屬性決定 content 的排列順序
	const content = (
		<div className={containerClass}>
			{layout === "horizontal" ? (
				<>
					{iconElement}
					{titleElement}
				</>
			) : (
				<>
					{titleENElement}
					{titleElement}
					{iconElement}
				</>
			)}
		</div>
	);

	return <>{link ? <NavLink to={link}>{content}</NavLink> : content}</>;
}
