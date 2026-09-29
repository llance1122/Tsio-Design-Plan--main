import { useParams } from "react-router";
import NotFoundPage from "../NotFoundPage";
import ExhibitionPage from "./ExhibitionPage";

// ============================================================
//  展覽內頁分派：/Plan/ExhibitionList/:exhibitionId
//  每檔展覽的版面差異大，各自一個元件；辦新展時在這裡加一行對應即可。
//  （id 要與 exhibitions.json、imagesObjects.js、config/pages.js 一致）
// ============================================================
const PAGES = {
	"2024-E001": ExhibitionPage,
};

export default function ExhibitionDetailPage() {
	const { exhibitionId } = useParams();
	const Page = PAGES[exhibitionId];
	return Page ? <Page /> : <NotFoundPage />;
}
