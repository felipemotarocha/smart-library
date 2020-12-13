import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { appTheme } from "./App/App.theme";
import store from "./redux/store";

import App from "./App/App";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<ThemeProvider theme={appTheme}>
					<App />
				</ThemeProvider>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
