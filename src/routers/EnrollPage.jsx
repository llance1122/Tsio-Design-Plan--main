import enrolls from "../data/enrolls";
import EnrollCard from "../small_component/EnrollCard";

export default function EnrollPage() {
	return (
		<section className="w-full mx-auto px-[40px] lg:max-w-7xl mt-[15vh] lg:mt-[24vh]">
			{/* 標題規格與文章總覽一致（置中 + heading-bold / heading-bold-web） */}
			<h2 className="text-center heading-bold lg:heading-bold-web">報名參與</h2>

			{enrolls.length > 0 ? (
				// 格線與文章總覽同一組設定，卡片在三頁之間看起來就是同一套系統
				<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[2vw] gap-y-[60px] mt-[60px]">
					{enrolls.map((item) => (
						<EnrollCard key={item.id} item={item} />
					))}
				</div>
			) : (
				// 空狀態只留一句話。上下用 py 撐開，避免頁面過短讓 Footer 頂上來
				<p className="text-center heading-bold lg:heading-bold-web mt-[60px] py-[15vh]">
					目前沒有開放報名的活動
				</p>
			)}
		</section>
	);
}
