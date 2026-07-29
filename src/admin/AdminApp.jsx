// ============================================================
//  後台入口：未登入顯示登入頁，登入後顯示管理面板
//  掛在 /admin 路由（獨立於主站 App，不含 Nav / Footer）
// ============================================================
import { useState } from "react";
import { getToken, clearToken } from "./api";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

export default function AdminApp() {
	const [authed, setAuthed] = useState(!!getToken());

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
