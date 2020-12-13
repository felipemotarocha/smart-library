import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { GlobalStyle } from "./App.styles";

import HomePage from "../pages/home/home.page";
import Navbar from "../components/navbar/navbar.component";

const App = () => {
	return (
		<>
			<GlobalStyle />
			<Navbar />
			<Switch>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
		</>
	);
};

export default App;
