import { useState } from "react";
import { login } from "./api";

export default function LoginForm({ onSuccess }) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [busy, setBusy] = useState(false);

	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		setError("");
		try {
			await login(password);
			onSuccess();
		} catch (err) {
			setError(err.message);
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
			<form
				onSubmit={submit}
				className="w-full max-w-sm bg-white rounded-xl shadow p-8 space-y-6"
			>
				<h1 className="text-xl font-semibold text-center">設醮後台登入</h1>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="請輸入管理員密碼"
					autoFocus
					className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400"
				/>
				{error && <p className="text-red-600 text-sm">{error}</p>}
				<button
					disabled={busy}
					className="w-full bg-neutral-800 text-white rounded-lg py-2 hover:bg-neutral-700 disabled:opacity-50"
				>
					{busy ? "登入中…" : "登入"}
				</button>
			</form>
		</div>
	);
}
