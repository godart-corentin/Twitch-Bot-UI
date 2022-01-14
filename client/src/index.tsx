import * as React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, faTwitch } from "@fortawesome/free-brands-svg-icons";
import {
  faBullhorn,
  faCalendarAlt,
  faCheckCircle,
  faChevronRight,
  faCircleNotch,
  faCrown,
  faEdit,
  faMoon,
  faPlusCircle,
  faShieldAlt,
  faSignOutAlt,
  faSun,
  faTachometerAlt,
  faTerminal,
  faTrashAlt,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

import { App } from "./App";
import theme from "./lib/theme";

library.add(
  fab,
  faTwitch,
  faChevronRight,
  faTachometerAlt,
  faTerminal,
  faCalendarAlt,
  faBullhorn,
  faUsers,
  faSignOutAlt,
  faCircleNotch,
  faCrown,
  faShieldAlt,
  faUser,
  faSun,
  faMoon,
  faPlusCircle,
  faCheckCircle,
  faEdit,
  faTrashAlt
);

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
