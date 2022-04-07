import { CssBaseline } from "@mui/material";
import * as React from "react";
import { Routes, Route, Outlet, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Admin from "./admin";
import { ProvideAuth, useAuth } from "./hooks/useAuth";
import Login from "./private/login";

export default function App() {
	return (
		<ProvideAuth>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="logout" element={<Logout />} />
					<Route path="*" element={<NoMatch />} />
				</Route>
				<Route path="/admin/*" element={
					<ProtectedRoute>
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

	auth.logout();

	navigate("/");

	return null;
}

function Layout() {
	return (
		<div>
			{/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/nothing-here">Nothing Here</Link>
					</li>
					<li>
						<Link to="/admin">Admin</Link>
					</li>
				</ul>
			</nav>

			<hr />

			{/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
			<Outlet />
		</div>
	);
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