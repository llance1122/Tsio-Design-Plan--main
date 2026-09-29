// App.jsx
import './App.css';
import { ScrollRestoration } from 'react-router';
import Nav from './index_component/Nav';
import Footer from './index_component/Footer';
import PageTransition from './small_component/PageTransition';

function App() {
  // bg-white 是全站底色。Nav 顏色改由 data-navcolor 自適應偵測（見 Nav.jsx），
  // 深色區塊（Banner、Footer）掛 data-navcolor="white"，其餘預設深色字。
  //
  // flow-root 不能省：子頁面第一個區塊常帶 mt-[15vh]/mt-[24vh]，這個 margin 會
  // 往上穿透（margin collapsing）把本層一起推下去，導致畫面最頂端那段沒有白底。
  // flow-root 建立 BFC 把 margin 關在裡面，版面位置完全不變
  //（margin 從「推開本層」改成「本層內部的留白」）。
  return (
    <div className="relative flow-root w-full space-y-[120px] bg-white">
      <ScrollRestoration /> {/* 解決捲軸問題 */}
      <Nav />
      {/* PageTransition 內含 Outlet，會根據路由渲染正確的子頁面，
          並在每次換頁時讓整頁淡入上浮（動畫見 App.css 的 .page-enter）。
          Nav / Footer 刻意留在外層，換頁時不跟著閃。 */}
      <PageTransition />
      <Footer />
    </div>
  );
}

export default App;