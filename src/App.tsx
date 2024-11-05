import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import DefaultLayout from "./DefaultLayout";
import { HeaderProvider } from "./context/useHeader";
import { MangaProvider } from "./context/useManga";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <MangaProvider>
                <HeaderProvider>
                  <DefaultLayout activePage={"Home"}>
                    {route.element}
                  </DefaultLayout>
                </HeaderProvider>
              </MangaProvider>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
