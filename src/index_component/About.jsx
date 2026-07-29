import MoreLink from "../small_component/MoreLink";

export default function About() {
    return (
<section className="w-full h-full lg:mt-[120px]">
    {/* 設醮 — 主題大字，上方間距覆蓋掉 Main 的 300px、下方與內文之間留小間距 */}
    <h2 className="concept-title lg:concept-title-web headline text-center mb-[60px] lg:mb-[120px]">
        設醮
    </h2>

    <div className="headline mx-auto max-w-[300px] lg:max-w-none lg:w-fit">
        <div className="flex flex-row items-end gap-[30px] justify-center lg:gap-[280px]">
            <h2 className="subtitle-bold tracking-[0.4em] [writing-mode:vertical-lr] lg:subtitle-bold-web lg:tracking-[0.4em]">為地方設下儀式，為人群打開空間</h2>
            <div className="w-[276px] pt-[80px] lg:w-[550px] lg:pt-[170px]">
                <p className='bodyText lg:bodyText-large-web'>
                核心精神｜
                <br /><br />
                「設醮」是一種對地方的提問與回應。
                設，是設計的行動；醮，是一種文化的語言。
                在快速流動的時代裡，
                我們選擇用設計設下一場儀式，
                讓空間再次成為人群相遇的可能。
                <br /><br />
                透過裝置、文本、影像與體驗，
                我們探索人與地方、人與記憶、人與關係之間
                的可能，也嘗試在其中創造一種新的共同體感。
                這場展覽不是終點，而是一場設醮的開始。
                </p>
                <MoreLink to="/About" label="了解更多" align="end" className="mt-[40px]" />
            </div>
        </div>
    </div>
</section>
    )
}