import { useWindowSize } from 'react-use';

/**
 * 通用的 Profile/Content 卡片元件
 * @param {string} size - 圖片在 lg 斷點時的寬度 (例如 '400px')
 * @param {string} src - 圖片來源 URL
 * @param {string} name - 人物/影片標題
 * @param {string} job - 職稱/副標題 (電影模式下隱藏)
 * @param {string} content - 簡介/內容
 * @param {string} variant - 卡片變體：'movie' 為電影模式，未設定則為預設講師模式
 */
export default function ProfileCard({ size, src, name, job, content, variant }) {
    const { width } = useWindowSize();
    const isLg = width >= 1024; // Tailwind CSS 預設的 lg 斷點
    const isMd = width >= 768; // Tailwind CSS 預設的 md 斷點

    // 1. 判斷是否為電影模式
    const isMovieVariant = variant === 'movie';

    // 2. 計算圖片寬度 (這部分邏輯不變，但應考慮 size 的單位)
    let imageWidth = '100%';
    if (isLg) {
        // 使用傳入的 size 作為寬度
        imageWidth = size;
    } else if (isMd) {
        // md 斷點時的固定寬度為 300px
        imageWidth = '300px'; 
    }
    
    // 3. 根據 variant 調整標題的 CSS class
    const titleClassName = isMovieVariant 
                           ? 'subtitle-bold lg:subtitle-bold-web' // 電影標題更大
                           : 'bodyText lg:bodyText-web'; // 講師標題

    return (
        <div className="space-y-[35px] flex flex-col md:flex-row md:justify-center md:items-center md:space-x-[70px] md:space-y-0">
            <div
                className="w-full"
                style={{
                    aspectRatio: '1 / 1', 
                    width: imageWidth, 
                }}
            >
                <img
                    className="w-full h-full object-cover"
                    src={src}
                    alt={name}
                />
            </div>
            
            <div className={`${isMovieVariant ? 'space-y-[25px]' : 'space-y-[10px]'}  md:w-[450px] lg:w-[800px]`}>
                <h2 className={titleClassName}>{name}</h2>
                {!isMovieVariant && (
                    <p className="bodyText lg:bodyText-web">{job}</p>
                )}
                <p className="bodyText lg:bodyText-web">{content}</p>
            </div>
        </div>
    );
}