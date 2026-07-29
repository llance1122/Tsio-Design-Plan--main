export default function ContactInfoItem({ Icon, srText, infoText }) {
    // 用 div 而非 p：內含的 Icon 是 block 元素，包在 p 裡不合法，
    // 瀏覽器會提前關閉 p，導致這裡的 flex 排版失效
    return (
        <div className="footer flex flex-row gap-[20px] text-secondary items-center lg:bodyText-web lg:text-secondary">
            {/* 渲染傳入的 IconComponent */}
            <Icon />
            {/* sr-only 的文字是為了螢幕閱讀器，描述這個圖示代表什麼 */}
            {infoText}
            <span className='sr-only'>{srText}</span>
            {/* 顯示實際的資訊文字 */}
        </div>
    );
}