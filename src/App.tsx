import * as React from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Admin from "./admin";
import { ProvideAuth, useAuth } from "./hooks/useAuth";
import Login from "./private/login";
import Layout from "./layout";
import { useEffect } from "react";

export default function App() {
	return (
		<ProvideAuth>
			<Routes>
				<Route path="/">
					<Route index element={<>
						<Layout />
						<Home />
					</>} />
					<Route path="login" element={<><Layout /><Login /></>} />
					<Route path="logout" element={<Logout />} />
					<Route path="*" element={<NoMatch />} />
				</Route>
				<Route path="/admin/*" element={
					<ProtectedRoute>
						<Layout />
						<Admin />
					</ProtectedRoute>
				} />
			</Routes>
		</ProvideAuth>
	);
}
function Logout() {
	const auth = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		auth.logout();
		navigate("/login");
	})

	return null;
}

function Home() {
	return (
		<div>
			<h2>Home</h2>
		</div>
	);
}

function NoMatch() {
	return (
		<div>
			<h2>Nothing to see here!</h2>
			<p>
				<Link to="/">Go to the home page</Link>
			</p>
		</div>
	);
}

const ProtectedRoute = ({ children }: any) => {
	const auth = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!auth.user) {
			navigate("/login", {
				replace: true,
				state: {
					from: location
				}
			});
		}
	})

	if (!auth.user) {
		return null;
	} else {
		return children;
	}
}