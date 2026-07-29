import exhibitionsData from "../../data/exhibitions.json";
import CardLayout from "../../small_component/CardLayout";
import Breadcrumbs from "../../small_component/Breadcrumbs";

export default function ExhibitionListPage() {
	return (
		<section className="w-full mx-auto px-[40px] xl:px-0 lg:max-w-7xl mt-[15vh] lg:mt-[24vh]">
			<Breadcrumbs word="Project" word2="Exhibition" />
			<h2 className="text-center heading-bold lg:heading-bold-web mt-[40px]">展覽總覽</h2>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[2vw] gap-y-[60px] mt-[60px]">
				{exhibitionsData.map((exhibition, idx) => (
					<CardLayout key={idx} item={exhibition} />
				))}
			</div>
		</section>
	);
}
