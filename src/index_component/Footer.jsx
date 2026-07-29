import logoFooter from "../assets/logo_footer.png";
import ContactInfoItem from "../small_component/ContactInfoItem";
import IgIcon from "../assets/icons/ig.png";
import ThreadIcon from "../assets/icons/thread.png";
import ToTopArrow from "../assets/icons/To_Top_Arrow.png";
import { Link } from "react-router";

export default function Footer() {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			<button
				onClick={scrollToTop}
				className="group cursor-pointer m-auto z-[1000] flex justify-center items-center gap-[10px] mb-[50px]"
				aria-label="回到頁面頂部"
			>
				{/* 箭頭圖示 */}
				{/* filter 將黑色 PNG 調成與文字相同的灰階，深淺背景都可見 */}
				<img
					className="w-auto h-[24px] [filter:brightness(0)_invert(0.65)] group-hover:[filter:brightness(0)_invert(0.45)] transition-[filter] duration-[var(--motion-fast)]"
					src={ToTopArrow}
					alt=""
					aria-hidden="true"
				/>

				{/* 按鈕文字 */}
				<p
					className="
                    bg-transparent border-none p-0
                    text-gray-400 group-hover:text-gray-500
                    font-serif text-base tracking-[2px] uppercase
                    transition-colors duration-[var(--motion-fast)]
                    "
				>
					TO TOP
				</p>
			</button>
			<footer
				className="w-full pt-[40px] pb-[20px] lg:pt-[80px] lg:pb-[40px] lg:px-[40px] bg-black"
				data-navcolor="white"
			>
				{/* 主要內容容器 */}
				<div className="flex flex-col items-center gap-[70px] lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-4 lg:gap-8 lg:items-start">
					{/* Logo 和聯絡資訊 */}
					<div className="w-auto h-[250px] flex flex-col justify-between items-center lg:col-span-2 lg:h-auto lg:items-start lg:justify-start lg:gap-[50px]">
						<Link to="/" aria-label="返回首頁">
							<img
								className="w-[140px] h-auto lg:w-[160px]"
								src={logoFooter}
								alt="tsio_design_plan logo"
							/>
						</Link>
						<div className="w-[300px] h-[130px] flex flex-col justify-between lg:w-auto lg:h-auto lg:gap-2 lg:mt-4">
							<ContactInfoItem
								Icon={IconClock}
								srText="服務時間"
								infoText="Mon~Fri / 10:00-19:00"
							/>
							<ContactInfoItem
								Icon={IconPhone}
								srText="聯絡電話"
								infoText="(03)211-8800"
							/>
							<ContactInfoItem
								Icon={IconLocation}
								srText="公司地址"
								infoText="33302桃園市龜山區文化一路259號"
							/>
							<ContactInfoItem
								Icon={IconMail}
								srText="電子郵件"
								infoText="tsio.designplan@gmail.com"
							/>
						</div>
					</div>
					{/* 關於設醮 和 計畫總覽 */}
					<div className="space-y-[70px] lg:space-y-0 lg:flex lg:flex-row lg:space-x-[250px] lg:col-span-2 lg:justify-end">
						<div className="space-y-[15px] w-[300px] lg:w-auto lg:space-y-[50px]">
							<h3 className="subtitle-bold text-center text-secondary lg:text-left lg:bodyText-large-bold-web lg:text-secondary">
								關於設醮
							</h3>
							<ul className="footer flex flex-row justify-between text-secondary lg:flex-col lg:justify-start lg:space-y-[15px] lg:bodyText-web lg:text-secondary">
								<li>
									<Link to="/About">關於我們</Link>
								</li>
								<li>
									<Link to="/Contact">聯絡我們</Link>
								</li>
								<li>
									<Link to="/Articles">最新消息</Link>
								</li>
							</ul>
						</div>
						<div className="space-y-[15px] w-[300px] lg:w-auto lg:space-y-[50px]">
							<h3 className="subtitle-bold text-center text-secondary lg:text-left lg:bodyText-large-bold-web lg:text-secondary">
								計畫總覽
							</h3>
							<ul className="footer flex flex-row justify-between text-secondary lg:flex-col lg:justify-start lg:space-y-[15px] lg:bodyText-web lg:text-secondary">
								<li>
									<Link to="/Plan/Market">市集</Link>
								</li>
								<li>
									<Link to="/Plan/Workshop">工作坊</Link>
								</li>
								<li>
									<Link to="/Plan/ExhibitionList">展覽</Link>
								</li>
								<li>
									<Link to="/Plan/Lecture">演講</Link>
								</li>
								<li>
									<Link to="/Plan/Other">其他活動</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				{/* 版權和社群圖標 */}
				<div className="max-w-[300px] m-auto mt-[70px] flex flex-row items-center justify-between  lg:flex-row lg:max-w-7xl lg:mx-auto lg:mt-[80px]">
					<p className="bodyText-web text-secondary">Copyright © 2025</p>
					<div className="flex flex-row space-x-[20px]">
						<a
							href="/"
							aria-label="Instagram"
							className="w-[18px] h-[18px] flex justify-center items-center lg:w-[20px] lg:h-[20px]"
						>
							<img
								className="w-full h-auto"
								src={IgIcon}
								alt="Instagram icon"
							/>
						</a>
						<a
							href="/"
							aria-label="Threads"
							className="w-[18px] h-[18px] flex justify-center items-center lg:w-[20px] lg:h-[20px]"
						>
							<img
								className="w-full h-auto"
								src={ThreadIcon}
								alt="Threads icon"
							/>
						</a>
					</div>
				</div>
			</footer>
		</>
	);
}

function IconClock() {
	return (
		<div className="w-[18px] h-[18px] flex justify-center items-center lg:w-[20px] lg:h-[20px]">
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="size-4.5 lg:size-7.5"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>
		</div>
	);
}

function IconPhone() {
	return (
		<div className="w-[18px] h-[18px] flex justify-center items-center lg:w-[20px] lg:h-[20px]">
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="size-4.5 lg:size-7.5"
			>
				<path
					fillRule="evenodd"
					d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
					clipRule="evenodd"
				/>
			</svg>
		</div>
	);
}

function IconMail() {
	return (
		<div className="w-[18px] h-[18px] flex justify-center items-center lg:w-[20px] lg:h-[20px]">
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-full"
			>
				<path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
				<path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
			</svg>
		</div>
	);
}

function IconLocation() {
	return (
		<div className="w-[18px] h-[18px] flex justify-center items-center lg:w-[20px] lg:h-[20px]">
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className=" w-full"
			>
				<path
					fillRule="evenodd"
					d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
					clipRule="evenodd"
				/>
			</svg>
		</div>
	);
}
