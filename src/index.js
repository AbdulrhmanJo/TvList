import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootRuducer from "./reducer";
import thunk from "redux-thunk";

const store = createStore(rootRuducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store} basename={process.env.PUBLIC_URL}>
    <App />
  </Provider>,
  document.getElementById("root")
);
