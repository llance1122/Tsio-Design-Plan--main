import { useEffect, useState } from "react";
import Footer from "../../index_component/Footer";
import Nav from "../../index_component/Nav";
import Breadcrumbs from "../../small_component/Breadcrumbs";
import ProfileCard from "../../small_component/ProfileCard";
import Title from "../../small_component/Title";

import leactureSpeaker_1 from "../../assets/imgs/leactureSpeaker_1.jpg"
import ExhibitionLayout from "../../assets/imgs/ExhibitionLayout.jpg"
import leactureImg_1 from "../../assets/imgs/leactureImg_1.jpg"
import leactureImg_2 from "../../assets/imgs/leactureImg_2.jpg"
import leactureImg_3 from "../../assets/imgs/leactureImg_3.jpg"
import { interval } from "../../config/motion";

export default function LecturePage() {
  return (
    <section className="space-y-[10vh]">

          <main className="space-y-[10vh] lg:space-y-[20vh] mt-[15vh] lg:mt-[24vh]">
            <div className="w-full mx-auto px-[40px] lg:max-w-7xl">
              <Breadcrumbs word="Project" word2="Lecture" />
            </div>

            <ImageGallery />

            <div>
              <Title
                className="headline"
                title="講座活動｜TALKS & SHARING"
                layout="horizontal"
              />
              <div className="headline mx-auto w-[82.2vw] mt-[var(--title-gap-text)] lg:w-[900px]">
                <p className="headline bodyText lg:bodyText-web">
                  我們經常在展覽裡談創作，談設計，談作品的樣貌。但我們更在意的是，這些作品背後那段無聲的過程——那些不被記錄的掙扎、遲疑、離開、或轉彎。《遠方還未說的話》是一場關於時間的展覽，也是一種溫柔的回望。它來自那些曾經走過這條路的人，帶著他們在現實與夢想之間行走的傷痕與光。用作品替代語言，告訴還在路上的我們一件事：你不是孤單的。在這裡，我們邀請你聽見那些未說出口的話。或許來自未來的你，也會留下幾句話，給還沒出發的人。「展覽不只是結果，它是一段曾經沒機會說出來的旅程。」— Lorem Chang, 策展人
                </p>
              </div>
            </div>

            <div className="">
              <Title
                className="headline"
                title="講者介紹｜GUEST SPEAKERS"
                layout="horizontal"
              />
              <div className="headline w-full mx-auto px-[40px] mt-[var(--title-gap)] space-y-[100px] lg:space-y-[100px] lg:max-w-7xl">
                  <ProfileCard size={"250px"} src={leactureSpeaker_1} name="林哲翔" job="產品設計師／自由創作者" content={"Talk 01｜設計是一條彎彎的路，還是可以折返的橋？畢業後進入科技業，曾任職於新創公司與大型 UX 團隊，後選擇離開制度、走向自由接案。他將分享關於「選擇」的故事——在創意與穩定、在理想與現實之間的每一次掙扎。設計不是直線，也不是答案，而是一種反覆折返與自問的方式。「我花了很多年，才學會不要為了成功而設計。」"} />
                  <ProfileCard size={"250px"} src={leactureSpeaker_1} name="林哲翔" job="產品設計師／自由創作者" content={"Talk 01｜設計是一條彎彎的路，還是可以折返的橋？畢業後進入科技業，曾任職於新創公司與大型 UX 團隊，後選擇離開制度、走向自由接案。他將分享關於「選擇」的故事——在創意與穩定、在理想與現實之間的每一次掙扎。設計不是直線，也不是答案，而是一種反覆折返與自問的方式。「我花了很多年，才學會不要為了成功而設計。」"} />
                  <ProfileCard size={"250px"} src={leactureSpeaker_1} name="林哲翔" job="產品設計師／自由創作者" content={"Talk 01｜設計是一條彎彎的路，還是可以折返的橋？畢業後進入科技業，曾任職於新創公司與大型 UX 團隊，後選擇離開制度、走向自由接案。他將分享關於「選擇」的故事——在創意與穩定、在理想與現實之間的每一次掙扎。設計不是直線，也不是答案，而是一種反覆折返與自問的方式。「我花了很多年，才學會不要為了成功而設計。」"} />
              </div>
            </div>

            <div>
              <Title
                className="headline"
                title="講座資訊｜SCHEDULE"
                layout="horizontal"
              />
              <div className="space-y-[35px] w-full mx-auto px-[40px] mt-[var(--title-gap)] lg:max-w-7xl md:flex md:flex-row md:items-center md:justify-center md:gap-[100px]">
                <div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
                  <img className="w-full h-full object-cover" src={ExhibitionLayout} alt="" />
                </div>

                <ul className="bodyText lg:bodyText-web space-y-[20px] lg:space-y-[35px]">
                  <li className="space-y-[10px]">
                    <h2>【TALK 01】</h2>
                    <p>
                    設計是一條彎彎的路，還是可以折返的橋？<br />
                    2025.08.17（日）14:00–15:30 <br />
                    設醮展場A區講座角落
                    </p>
                    <p>林哲翔</p>
                  </li>
                  <li className="space-y-[10px]">
                    <h2>【TALK 01】</h2>
                    <p>
                    設計是一條彎彎的路，還是可以折返的橋？<br />
                    2025.08.17（日）14:00–15:30 <br />
                    設醮展場A區講座角落
                    </p>
                    <p>林哲翔</p>
                  </li>
                  <li className="space-y-[10px]">
                    <h2>【TALK 01】</h2>
                    <p>
                    設計是一條彎彎的路，還是可以折返的橋？<br />
                    2025.08.17（日）14:00–15:30 <br />
                    設醮展場A區講座角落
                    </p>
                    <p>林哲翔</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full mx-auto px-[40px] lg:max-w-7xl">
              <hr className="border-t border-primary my-8 mb-[70px]" />
              <div className="">
                <Title
                  className="headline"
                  title="報名方式｜RESERVE A SEAT"
                  layout="horizontal"
                />
              </div>
              <p className="bodyText lg:bodyText-web text-center mt-[var(--title-gap-text)]">講座免費參加，部分座位可預約，名額有限。點擊報名連結或現場候補入場。</p>
              <button class="bodyText lg:bodyText-web bg-gray py-3 px-6 mx-auto block mt-[30px]">
                立即報名 Register Now
              </button>
            </div>

          </main>
    </section>
  )
}

const ImageGallery = () => {
  const images = [
    leactureImg_1,
    leactureImg_2,
    leactureImg_3,
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let intervalId;
    if (isMobile) {
      intervalId = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, interval.crossfade);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isMobile, images.length]);

  if (isMobile) {
    return (
      <div className="w-full aspect-video relative overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[var(--motion-slow)] ease-[var(--motion-ease-standard)] ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full aspect-video flex">
        <div className="w-[50%] h-full">
          <img className="h-full w-full object-cover" src={images[0]} alt="" />
        </div>
        <div className="w-[50%] h-full flex flex-col">
          <div className="w-full h-[50%]">
            <img className="h-full w-full object-cover" src={images[1]} alt="" />
          </div>
          <div className="w-full h-[50%]">
            <img className="h-full w-full object-cover" src={images[2]} alt="" />
          </div>
        </div>
      </div>
    );
  }
};