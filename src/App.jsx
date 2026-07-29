// App.jsx
import './App.css';
import { Outlet, ScrollRestoration } from 'react-router';
import Nav from './index_component/Nav';
import Footer from './index_component/Footer';

function App() {
  // bg-white 不能省：nav 的 mix-blend-difference 需要有實際繪製的背景才會混色，
  // 沒設背景的區域（瀏覽器畫布預設色）不參與混色，白字會直接消失
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