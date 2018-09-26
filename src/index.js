import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import "assets/css/material-dashboard-react.css?v=1.4.1";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();
import zhCN from "./i18n/zh-CN.jsx"; //导入 i18n 配置文件
import enUS from "./i18n/en-US.jsx";

console.log("zhCN", zhCN);

ReactDOM.render(
  <IntlProvider locale="en" messages={enUS}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    </Router>
  </IntlProvider>,
  document.getElementById("root")
);
