// ============================================================
//  展覽、工作坊的封面圖：JSON 的 cover 欄位填 src/assets/imgs/ 裡的檔名即可
//  例："cover": "ExhibitionBanner.webp"
//  （JSON 不能 import 圖檔，這裡把 imgs/ 整個資料夾載入，再用檔名對應）
//  沒填或找不到檔案時回傳 undefined，卡片會自動用預設封面。
// ============================================================
const images = import.meta.glob("../assets/imgs/*.{webp,jpg,jpeg,png}", {
	eager: true,
	import: "default",
});

export const coverUrl = (fileName) =>
	fileName ? images[`../assets/imgs/${fileName}`] : undefined;
