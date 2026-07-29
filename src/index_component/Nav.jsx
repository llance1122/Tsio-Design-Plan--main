import { useState, useEffect, useRef } from "react";
import logo from "../assets/icons/logo.svg";
import { NavLink } from "react-router";

// 桌機導覽項目（手機側邊選單另有一份，標籤不同：Articles 顯示為 News）
const NAV_ITEMS = [
	{ to: "/About", label: "About" },
	{ to: "/Plan", label: "Project" },
	{ to: "/Enroll", label: "Enroll" },
	{ to: "/Contact", label: "Contact" },
	{ to: "/Articles", label: "Article" },
];

// Project 下拉選單的子項目（對應 /Plan 底下的子路由）
const PROJECT_ITEMS = [
	{ to: "/Plan/ExhibitionList", label: "展覽" },
	{ to: "/Plan/Workshop", label: "工作坊" },
	{ to: "/Plan/Market", label: "市集" },
	{ to: "/Plan/Lecture", label: "講座" },
	{ to: "/Plan/Other", label: "其他活動" },
];

export default function Nav() {
	const [visible, setVisible] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const lastScrollY = useRef(0);

	/*
	  Project 下拉選單：
	  面板不能放在 <nav> 裡 —— nav 整條套了 mix-blend-difference，
	  放進去會連面板一起被反差混色（白底變黑底）。
	  所以面板做成 nav 的兄弟元素，開啟時量測 Project 項目的座標來定位。
	*/
	const [projectOpen, setProjectOpen] = useState(false);
	const [panelPos, setPanelPos] = useState({ left: 0, top: 0 });
	const projectLiRef = useRef(null);
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
			if (menuOpen && !event.target.closest("nav")) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutside);

		return () => document.removeEventListener("click", handleClickOutside);
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
			<nav
				className={`
                    fixed top-0 left-0 right-0 py-[4.5vh]
                    mix-blend-difference
                    transition-transform duration-[var(--motion-base)] ease-[var(--motion-ease-spring)]
                    ${visible ? "translate-y-0" : "-translate-y-full"}
                    z-50
                `}
			>
				<div className="w-[92.2vw] mx-auto">
					<div className="w-full flex justify-between items-center lg:justify-between">
						{/* 【變更 2】當選單展開時，動態隱藏 Logo */}
						<NavLink
							to="/"
							onClick={handleNavLinkClick}
							className={`transition-opacity duration-[var(--motion-base)] ${menuOpen ? "opacity-0" : "opacity-100"
								}`}
						>
							<img
								className="w-[150px] h-auto lg:w-[250px] brightness-0 invert"
								src={logo}
								alt="tsio_design_plan logo"
							/>
						</NavLink>

						<button
							onClick={toggleMenu}
							aria-label="導覽列開關"
							// 按鈕的 z-index 保持在 z-60，或是不設定 (因為父層 nav 已經是 z-50 最高了)
							className={`lg:hidden z-60 relative text-white`}
						>
							<div className="w-6 h-6 flex flex-col justify-center items-center">
								<span
									className={`w-6 h-0.5 bg-current transition-all duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] ${menuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
										}`}
								></span>
								<span
									className={`w-6 h-0.5 bg-current transition-all duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] ${menuOpen ? "opacity-0" : "opacity-100"
										}`}
								></span>
								<span
									className={`w-6 h-0.5 bg-current transition-all duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] ${menuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
										}`}
								></span>
							</div>
						</button>

						{/* ... Desktop ul ... */}
						<ul className="hidden lg:flex space-x-[60px] bodyText-large-bold-web ">
							{NAV_ITEMS.map(({ to, label }) => {
								// Project：無底線、帶加號（開啟時轉成減號）、hover 展開下拉選單
								if (to === "/Plan") {
									return (
										<li
											key={to}
											ref={projectLiRef}
											onMouseEnter={openProject}
											onMouseLeave={scheduleCloseProject}
										>
											<NavLink
												to={to}
												className="flex items-center gap-[10px] text-white"
											>
												{label}
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
										<NavLink to={to} className="nav-underline text-white">
											{label}
										</NavLink>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</nav>

			{/* Project 下拉面板：獨立於 nav 之外渲染（避免被 mix-blend-difference 反色），
			    位置由 openProject 量測 Project 項目的座標而來 */}
			<div
				onMouseEnter={openProject}
				onMouseLeave={scheduleCloseProject}
				style={{ left: panelPos.left, top: panelPos.top }}
				className={`
					fixed z-40 hidden lg:block
					transition-[opacity,translate] duration-[var(--motion-base)] ease-[var(--motion-ease-spring)]
					${projectOpen
						? "pointer-events-auto translate-y-0 opacity-100"
						: "pointer-events-none -translate-y-2 opacity-0"
					}
				`}
			>
				{/* mt 是 Project 文字到面板的間距；游標跨越這段空隙靠 150ms 延遲關閉撐住 */}
				<ul className="mt-[14px] min-w-[140px] rounded-lg bg-secondary px-[20px] py-[6px] shadow-lg">
					{PROJECT_ITEMS.map(({ to, label }) => (
						<li
							key={to}
							className="border-b border-primary/15 last:border-b-0"
						>
							<NavLink
								to={to}
								onClick={() => setProjectOpen(false)}
								className="block py-[10px] bodyText"
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
                ${menuOpen
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
				>
					<div className="pt-32 px-8">
						<ul className=" space-y-8 text-white text-lg">
							{/* ... NavLink list items ... */}
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
								<NavLink
									to="/Plan"
									onClick={handleNavLinkClick}
									className="block py-2 hover:text-gray-300 transition-colors"
								>
									Project
								</NavLink>
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
