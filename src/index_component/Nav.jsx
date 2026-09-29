import { useState, useEffect, useRef } from "react";
import logo from "../assets/icons/logo.svg";
import { NavLink, useLocation } from "react-router";

// 桌機導覽項目（手機側邊選單另有一份，標籤不同：Articles 顯示為 News）
const NAV_ITEMS = [
	{ to: "/About", label: "About" },
	{ to: "/Plan", label: "Plan" },
	{ to: "/Enroll", label: "Enroll" },
	{ to: "/Contact", label: "Contact" },
	{ to: "/Articles", label: "Article" },
];

// Project 下拉選單的子項目（對應 /Plan 底下的子路由）
const PROJECT_ITEMS = [
	{ to: "/Plan/ExhibitionList", label: "展覽" },
	{ to: "/Plan/Workshop", label: "工作坊" },
	// 暫時隱藏，日後開放時取消以下註解即可恢復下拉選單項目。
	// { to: "/Plan/Market", label: "市集" },
	// { to: "/Plan/Lecture", label: "講座" },
	// { to: "/Plan/Other", label: "其他活動" },
];

export default function Nav() {
	const [visible, setVisible] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const lastScrollY = useRef(0);

	// Nav 顏色：black = 深色字（用於淺色背景）、white = 白字（用於深色背景/照片）
	// 取代原本的 mix-blend-difference —— 那會在中灰背景上讓 logo 消失。
	// 深色區塊（Banner、Footer）掛 data-navcolor="white"，其餘預設用深色字。
	const [navColor, setNavColor] = useState("black");
	const location = useLocation();

	// 偵測 Nav 位置（距頂約 45px）正下方是哪個區塊，據此決定深色字或白字。
	// 深色區塊（Banner、Footer）掛 data-navcolor="white"；進入偵測線就切白字。
	useEffect(() => {
		const probeY = 45; // Nav 上 logo / 文字大約的垂直位置
		const measure = () => {
			let color = "black";
			document.querySelectorAll("[data-navcolor]").forEach((el) => {
				const r = el.getBoundingClientRect();
				if (r.top <= probeY && r.bottom >= probeY) {
					color = el.getAttribute("data-navcolor");
				}
			});
			setNavColor(color);
		};
		measure();
		window.addEventListener("scroll", measure, { passive: true });
		window.addEventListener("resize", measure);
		return () => {
			window.removeEventListener("scroll", measure);
			window.removeEventListener("resize", measure);
		};
	}, [location.pathname]);

	const isWhite = navColor === "white";
	// 用 inline style 直接上色，避免 Tailwind class 在此情境被 @utility 顏色蓋掉
	const navInk = isWhite ? "#ffffff" : "#303030";
	const inkTransition = "color var(--motion-base) var(--motion-ease-standard)";

	/*
	  Project 下拉選單：
	  面板做成 nav 的兄弟元素，開啟時量測 Project 項目的座標來定位。
	  （當初是因為 nav 套了 mix-blend-difference，放在裡面會被一起混色；
	  現在 nav 已改成自適應字色，但面板的 z-index 與命中範圍都依這個結構調過，維持不動。）
	*/
	const [projectOpen, setProjectOpen] = useState(false);
	const [panelPos, setPanelPos] = useState({ left: 0, top: 0 });
	const [mobilePlanOpen, setMobilePlanOpen] = useState(false);
	const projectLiRef = useRef(null);
	const mobileMenuRef = useRef(null);
	const closeTimer = useRef(null);

	const openProject = () => {
		clearTimeout(closeTimer.current);
		const rect = projectLiRef.current?.getBoundingClientRect();
		if (rect) setPanelPos({ left: rect.left, top: rect.bottom });
		setProjectOpen(true);
	};

	// 延遲關閉：讓游標從 Project 移進面板的過程不會誤關
	const scheduleCloseProject = () => {
		clearTimeout(closeTimer.current);
		closeTimer.current = setTimeout(() => setProjectOpen(false), 150);
	};

	// nav 因往下捲動收起時，下拉面板一併關閉
	useEffect(() => {
		if (!visible) setProjectOpen(false);
	}, [visible]);

	useEffect(() => {
		const handleScroll = () => {
			if (menuOpen) {
				setVisible(true);
				return;
			}
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY.current) {
				setVisible(false);
			} else {
				setVisible(true);
			}
			lastScrollY.current = currentScrollY;
			1;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [menuOpen]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				menuOpen &&
				!event.target.closest("nav") &&
				!mobileMenuRef.current?.contains(event.target)
			) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutside);

		return () => document.removeEventListener("click", handleClickOutside);
	}, [menuOpen]);

	useEffect(() => {
		if (!menuOpen) setMobilePlanOpen(false);
	}, [menuOpen]);

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [menuOpen]);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleNavLinkClick = () => {
		setMenuOpen(false);
	};

	return (
		<>
			{/* Main Navigation Bar */}
			{/* select-none：導覽列不是可讀取的內文，關掉文字選取避免誤選 */}
			<nav
				className={`
                    fixed top-0 left-0 right-0 py-[4.5vh]
                    select-none
                    transition-transform duration-[var(--motion-base)] ease-[var(--motion-ease-spring)]
                    ${visible ? "translate-y-0" : "-translate-y-full"}
                    z-50
                `}
			>
				{/* 深色區塊（Banner、Footer）上的淡漸層遮罩：白字壓在照片上容易糊掉，
				    由上往下加一層很淡的暗色把對比拉開。刻意壓低濃度，不搶視覺。 */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 top-0 h-[calc(100%+14vh)] -z-10"
					style={{
						background:
							"linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.07) 50%, rgba(0,0,0,0) 100%)",
						opacity: isWhite ? 1 : 0,
						transition:
							"opacity var(--motion-base) var(--motion-ease-standard)",
					}}
				/>
				<div className="w-[92.2vw] mx-auto">
					<div className="w-full flex justify-between items-center lg:justify-between">
						{/* 手機選單展開時隱藏 Logo */}
						<NavLink
							to="/"
							onClick={handleNavLinkClick}
							className={`transition-opacity duration-[var(--motion-base)] ${
								menuOpen ? "opacity-0" : "opacity-100"
							}`}
						>
							<img
								className="w-auto h-[30px] lg:h-[40px]"
								style={{
									filter: isWhite
										? "brightness(0) invert(1)"
										: "brightness(0) invert(0)",
									transition:
										"filter var(--motion-base) var(--motion-ease-standard)",
								}}
								src={logo}
								alt="tsio_design_plan logo"
							/>
						</NavLink>

						<button
							onClick={toggleMenu}
							aria-label="導覽列開關"
							// 按鈕的 z-index 保持在 z-60，或是不設定 (因為父層 nav 已經是 z-50 最高了)
							// 選單開啟時面板是深色，維持白色；否則跟著 navColor 走
							className="lg:hidden z-60 relative"
							style={{
								color: menuOpen || isWhite ? "#ffffff" : "#303030",
								transition: inkTransition,
							}}
						>
							<div className="w-6 h-6 flex flex-col justify-center items-center">
								<span
									className={`w-6 h-0.5 bg-current transition-all duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] ${
										menuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
									}`}
								></span>
								<span
									className={`w-6 h-0.5 bg-current transition-all duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] ${
										menuOpen ? "opacity-0" : "opacity-100"
									}`}
								></span>
								<span
									className={`w-6 h-0.5 bg-current transition-all duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] ${
										menuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
									}`}
								></span>
							</div>
						</button>

						<ul
							className="hidden lg:flex space-x-[60px] bodyText-large-bold-web"
							style={{ color: navInk, transition: inkTransition }}
						>
							{NAV_ITEMS.map(({ to, label }) => {
								// Project：hover 不展開底線（維持只靠加號變化提示互動），
								// 但目前在 /Plan 任一子頁面時，文字底線常駐顯示目前所在位置
								if (to === "/Plan") {
									const isPlanActive =
										location.pathname === "/Plan" ||
										location.pathname.startsWith("/Plan/");
									return (
										<li
											key={to}
											ref={projectLiRef}
											onMouseEnter={openProject}
											onMouseLeave={scheduleCloseProject}
										>
											<NavLink to={to} className="flex items-center gap-[10px]">
												<span
													className="nav-underline"
													data-active={isPlanActive ? "true" : undefined}
												>
													{label}
												</span>
												{/* 加號 → 減號：整個圖示轉 90 度（中途呈斜線），
												    橫線同時淡出，留下的直線轉完剛好變成橫的減號 */}
												<span
													className={`relative block h-[11px] w-[11px] transition-transform duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] ${projectOpen ? "rotate-90" : ""}`}
												>
													<span
														className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current transition-opacity duration-[var(--motion-base)] ${projectOpen ? "opacity-0" : "opacity-100"}`}
													/>
													<span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current" />
												</span>
											</NavLink>
										</li>
									);
								}
								return (
									<li key={to}>
										<NavLink to={to} className="nav-underline">
											{label}
										</NavLink>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</nav>

			{/* Project 下拉面板：獨立於 nav 之外渲染，位置由 openProject 量測 Project 項目的座標而來。
			    z-60 必須高於 nav 的 z-50 —— nav 有 py-[4.5vh]，盒子比文字往下多出約 32px，
			    比 nav 低的話那段 padding 會蓋住面板頂端，游標離開 li 後就進不到面板、
			    延遲關閉一到就消失（本層的盒子含 ul 的 mt，本來就是接著 li 底緣開始的）。 */}
			<div
				onMouseEnter={openProject}
				onMouseLeave={scheduleCloseProject}
				style={{ left: panelPos.left, top: panelPos.top }}
				className={`
					fixed z-60 hidden lg:block
					transition-[opacity,translate] duration-[var(--motion-base)] ease-[var(--motion-ease-spring)]
					${
						projectOpen
							? "pointer-events-auto translate-y-0 opacity-100"
							: "pointer-events-none -translate-y-2 opacity-0"
					}
				`}
			>
				{/* mt 是 Project 文字到面板的間距。這段空隙屬於外層的可命中範圍
				    （外層 fixed 建立 BFC，margin 不會穿透出去），游標經過時會觸發
				    外層的 onMouseEnter，不必靠延遲關閉硬撐 */}
				{/* overflow-hidden：hover 底色鋪到面板邊緣時，才會被 rounded-lg 的圓角切齊。
				    上下不留 py —— 外層的內距 hover 蓋不到，會在首尾留一條沒變色的淺帶。
				    那段留白改由首尾兩項自己的 pt / pb 撐出來（6 + 10 = 16，外觀不變）。 */}
				<ul className="mt-[14px] min-w-[140px] overflow-hidden rounded-lg bg-secondary px-[20px] shadow-lg">
					{PROJECT_ITEMS.map(({ to, label }, i) => (
						<li key={to} className="border-b border-primary/15 last:border-b-0">
							{/* hover 換底色（secondary → gray，設計系統既有的深一階）。
							    -mx 抵銷 ul 的左右內距，讓底色鋪滿整條、不是縮在文字後面，
							    px 再把文字推回原位；分隔線留在 li 上，維持原本內縮的樣子。
							    純顏色變化 → 用 motion 的 fast（同 Footer、Breadcrumbs 的慣例）。 */}
							<NavLink
								to={to}
								onClick={() => setProjectOpen(false)}
								className={`block -mx-[20px] px-[20px] py-[10px] bodyText transition-colors duration-[var(--motion-fast)] ease-[var(--motion-ease-standard)] hover:bg-gray focus-visible:bg-gray ${
									i === 0 ? "pt-[16px]" : ""
								} ${i === PROJECT_ITEMS.length - 1 ? "pb-[16px]" : ""}`}
							>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
			</div>

			<div
				className={`
                fixed inset-0 z-40 lg:hidden transition-opacity duration-[var(--motion-base)]
                ${
									menuOpen
										? "opacity-100 pointer-events-auto"
										: "opacity-0 pointer-events-none"
								}
            `}
			>
				<div
					className="absolute inset-0 bg-primary opacity-70 h-screen"
					onClick={() => setMenuOpen(false)}
				></div>

				<div
					className={`
                    absolute top-0 right-0 h-screen w-80 max-w-[85vw] 
                    bg-primary shadow-xl 
                    transform transition-transform duration-[var(--motion-base)] ease-[var(--motion-ease-spring)]
                    ${menuOpen ? "translate-x-0" : "translate-x-full"}
                `}
					ref={mobileMenuRef}
					data-mobile-menu
				>
					<div className="pt-32 px-8">
						<ul
							className="space-y-8 bodyText-large-bold-web"
							style={{ color: "#ffffff" }}
						>
							<li>
								<NavLink
									to="/About"
									onClick={handleNavLinkClick}
									className="block py-2 hover:text-gray-300 transition-colors"
								>
									About
								</NavLink>
							</li>
							<li>
								<button
									type="button"
									onClick={() => setMobilePlanOpen((open) => !open)}
									aria-expanded={mobilePlanOpen}
									className="flex w-full items-center justify-between py-2 text-left bodyText-large-bold-web hover:text-gray-300 transition-colors"
									style={{ color: "#ffffff" }}
								>
									<span>Plan</span>
									<span
										aria-hidden="true"
										className={`relative block h-[11px] w-[11px] transition-transform duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] ${mobilePlanOpen ? "rotate-90" : ""}`}
									>
										<span
											className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current transition-opacity duration-[var(--motion-base)] ${mobilePlanOpen ? "opacity-0" : "opacity-100"}`}
										/>
										<span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current" />
									</span>
								</button>
								<ul
									aria-hidden={!mobilePlanOpen}
									className={`space-y-2 overflow-hidden border-l border-white/40 pl-4 transition-[max-height,opacity,translate,margin] duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] ${
										mobilePlanOpen
											? "pointer-events-auto mt-2 max-h-48 translate-y-0 opacity-100"
										: "pointer-events-none mt-0 max-h-0 -translate-y-2 opacity-0"
									}`}
								>
									{PROJECT_ITEMS.map(({ to, label }) => (
										<li key={to}>
											<NavLink
												to={to}
												onClick={handleNavLinkClick}
												className="block py-1 bodyText hover:text-gray-300 transition-colors"
												style={{ color: "#ffffff" }}
											>
												{label}
											</NavLink>
										</li>
									))}
								</ul>
							</li>
							<li>
								<NavLink
									to="/Enroll"
									onClick={handleNavLinkClick}
									className="block py-2 hover:text-gray-300 transition-colors"
								>
									Enroll
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/Contact"
									onClick={handleNavLinkClick}
									className="block py-2 hover:text-gray-300 transition-colors"
								>
									Contact
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/Articles"
									onClick={handleNavLinkClick}
									className="block py-2 hover:text-gray-300 transition-colors"
								>
									News
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
