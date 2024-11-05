import { RouteObject } from "react-router-dom";
import Home from "./page/Home";
import Book from "./page/Book";
import History from "./page/History";
import Search from "./page/Search";
import Setting from "./page/Setting";
import Chapter from "./page/Chapter";
import Follow from "./page/Follow";
import Latest from "./page/Latest";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/book/:id",
    element: <Book />,
  },
  {
    path: "/chapter/:id/",
    element: <Chapter />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/follow",
    element: <Follow />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/latest",
    element: <Latest />,
  },
];

export default routes;
