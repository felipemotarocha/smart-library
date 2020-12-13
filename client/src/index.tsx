import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";

import { appTheme } from "./App/App.theme";

import App from "./App/App";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={appTheme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
