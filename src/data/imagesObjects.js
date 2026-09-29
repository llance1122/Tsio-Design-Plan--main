// ============================================================
//  JSON 資料的封面圖對照表（key = 資料的 id）
//  JSON 不能 import 圖檔，所以圖片在這裡 import，再用 id 對應。
//  沒有對應到的項目會用預設封面。
// ============================================================
import ExhibitionBanner from "../assets/imgs/ExhibitionBanner.webp";

// workshops.json 新增工作坊時，在這裡補上它的封面，例：
//   import UxCover from "../assets/imgs/ux-cover.webp";
//   "UX-W001": UxCover,
export const workshopImages = {};

export const exhibitionImages = {
	"2024-E001": ExhibitionBanner,
};
