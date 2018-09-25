// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

// import Home from "@material-ui/icons/Home";
// import Home from "views/Home/Home.jsx";
import Loadable from "react-loadable";
import Loading from "../components/Loading/Loading";

const dashboardRoutes = [
  /// start

  {
    path: "/home",
    sidebarName: "Home",
    navbarName: "Home",
    icon: Dashboard,
    component: Loadable({
      loader: () => import("views/Home/Home.jsx"),
      loading: Loading
    })
  },

  {
    path: "/blocklist",
    sidebarName: "BlockList",
    navbarName: "BlockList",
    icon: Dashboard,
    component: Loadable({
      loader: () => import("views/BlockList/BlockList.jsx"),
      loading: Loading
    })
  },
  {
    path: "/block/:index",
    // sidebarName: "Block",
    navbarName: "Block",
    icon: Dashboard,
    component: Loadable({
      loader: () => import("views/Block/Block.jsx"),
      loading: Loading
    })
  },

  {
    path: "/transactionlist",
    sidebarName: "TransactionList",
    navbarName: "TransactionList",
    icon: Dashboard,
    component: Loadable({
      loader: () => import("views/TransactionList/TransactionList.jsx"),
      loading: Loading
    })
  },
  {
    path: "/transaction/:txid",
    // sidebarName: "Transaction",
    navbarName: "Transaction",
    icon: Dashboard,
    component: Loadable({
      loader: () => import("views/Transaction/Transaction.jsx"),
      loading: Loading
    })
  },

  {
    path: "/assetlist",
    sidebarName: "AssetList",
    navbarName: "AssetList",
    icon: Dashboard,
    component: Loadable({
      loader: () => import("views/AssetList/AssetList.jsx"),
      loading: Loading
    })
  },
  {
    path: "/asset",
    // sidebarName: "Asset",
    navbarName: "Asset",
    icon: Dashboard,
    component: Loadable({
      loader: () => import("views/Asset/Asset.jsx"),
      loading: Loading
    })
  },
  {
    path: "/address/:address",
    // sidebarName: "Address",
    navbarName: "Address",
    icon: Dashboard,
    component: Loadable({
      loader: () => import("views/Address/Address.jsx"),
      loading: Loading
    })
  },

  { redirect: true, path: "/", to: "/home", navbarName: "Redirect" }
];

export default dashboardRoutes;
