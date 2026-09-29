// ============================================================
//  後台入口：未登入顯示登入頁，登入後顯示管理面板
//  掛在 /admin 路由（獨立於主站 App，不含 Nav / Footer）
// ============================================================
import { useEffect, useState } from "react";
import { getToken, clearToken } from "./api";
import { pageMeta } from "../lib/meta";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

export const meta = ({ location }) => pageMeta({ title: "後台", location, noindex: true });

export default function AdminApp() {
	// 登入狀態存在瀏覽器的 sessionStorage，伺服器產生頁面時讀不到，
	// 所以先不顯示，等瀏覽器端確認過再決定顯示登入頁或管理面板
	const [authed, setAuthed] = useState(null);
	useEffect(() => setAuthed(!!getToken()), []);

	if (authed === null) return null;
	if (!authed) return <LoginForm onSuccess={() => setAuthed(true)} />;
	return (
		<Dashboard
			onLogout={() => {
				clearToken();
				setAuthed(false);
			}}
		/>
	);
}
