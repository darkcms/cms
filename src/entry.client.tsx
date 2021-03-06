import * as React from "react";
import "bootstrap";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "./App";


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("app")
);
