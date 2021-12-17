import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import {
  faBullhorn,
  faCalendarAlt,
  faCircleNotch,
  faEllipsisH,
  faTachometerAlt,
  faTerminal,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

library.add(
  faTwitch,
  faTachometerAlt,
  faTerminal,
  faUsers,
  faEllipsisH,
  faCircleNotch,
  faCalendarAlt,
  faBullhorn
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
