// App.jsx
import './App.css';
import { Outlet, ScrollRestoration } from 'react-router';
import Nav from './index_component/Nav';
import Footer from './index_component/Footer';

function App() {
  // bg-white 是全站底色。Nav 顏色改由 data-navcolor 自適應偵測（見 Nav.jsx），
  // 深色區塊（Banner、Footer）掛 data-navcolor="white"，其餘預設深色字。
  return (
    <div className="relative w-full space-y-[120px] bg-white">
      <ScrollRestoration /> {/* 解決捲軸問題 */}
      <Nav />
      {/* Outlet 會根據路由渲染正確的子頁面 */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;