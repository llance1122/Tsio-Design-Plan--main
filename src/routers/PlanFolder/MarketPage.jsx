import Footer from "../../index_component/Footer";
import Nav from "../../index_component/Nav";
import Breadcrumbs from "../../small_component/Breadcrumbs";
import Title from "../../small_component/Title";

import ExhibitionBanner from "../../assets/imgs/ExhibitionBanner.png";
import ExhibitionLayout from "../../assets/imgs/ExhibitionLayout.jpg"

export default function MarketPage() {
  return (
    <section className="space-y-[10vh]">
      <main className="space-y-[10vh] lg:space-y-[20vh] mt-[15vh] lg:mt-[24vh]">
        <div className="w-full mx-auto px-[40px] lg:max-w-7xl">
          <Breadcrumbs word="Project" word2="Market" />
        </div>
        
        <div className="space-y-[30px]">
          <div className="w-full aspect-[1917/796]">
            <img className="w-full h-full object-cover" src={ExhibitionBanner} alt="" />
          </div>
          <div className="w-full mx-auto px-[40px] lg:max-w-7xl">
          <p className="bodyText text-center lg:bodyText-web">
            這裡有一封封未寄出的信、一張張記憶裡的風景、一件件等待被帶走的物品。
            逛市集，不只是購物，而是一場對話——和物件、與人、以及與自己的對話。
            一場延伸展覽精神的創意市集，集結來自不同地方的手作品牌、獨立出版、插畫與設計小物。
          </p>
          </div>
        </div>

        <div>
          <Title
            className="headline"
            title="01. 手寫與印刷"
            layout="horizontal"
          />
          <div className="w-full mx-auto px-[40px] mt-[var(--title-gap)] lg:max-w-7xl md:flex md:flex-row md:items-center md:justify-center">
            <div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
              <img className="w-full h-full object-cover" src={ExhibitionLayout} alt="" />
            </div>
            <div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
              <img className="w-full h-full object-cover" src={ExhibitionLayout} alt="" />
            </div>
          </div>
        </div>

                <div>
          <Title
            className="headline"
            title="01. 手寫與印刷"
            layout="horizontal"
          />
          <div className="w-full mx-auto px-[40px] mt-[var(--title-gap)] lg:max-w-7xl md:flex md:flex-row md:items-center md:justify-center">
            <div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
              <img className="w-full h-full object-cover" src={ExhibitionLayout} alt="" />
            </div>
            <div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
              <img className="w-full h-full object-cover" src={ExhibitionLayout} alt="" />
            </div>
          </div>
        </div>

                <div>
          <Title
            className="headline"
            title="01. 手寫與印刷"
            layout="horizontal"
          />
          <div className="w-full mx-auto px-[40px] mt-[var(--title-gap)] lg:max-w-7xl md:flex md:flex-row md:items-center md:justify-center">
            <div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
              <img className="w-full h-full object-cover" src={ExhibitionLayout} alt="" />
            </div>
            <div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
              <img className="w-full h-full object-cover" src={ExhibitionLayout} alt="" />
            </div>
          </div>
        </div>

        <div className="max-w-[82.2vw] mx-auto">
          <hr className="border-t border-primary my-8 mb-[70px]" />
          <div>
            <Title
              className="headline"
              title="報名方式｜RESERVE A SEAT"
              layout="horizontal"
            />
          </div>
          <p className="bodyText lg:bodyText-web text-center mt-[var(--title-gap-text)]">
            想成為這場市集的一部分嗎？無論你是手作創作者、插畫家、獨立出版人，還是有獨特故事想分享的品牌，我們都期待你加入。
          </p>
          <button className="bodyText lg:bodyText-web bg-gray py-3 px-6 mx-auto block mt-[30px]">
            立即報名 Register Now
          </button>
        </div>
      </main>
    </section>
  );
}
