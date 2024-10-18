import { lazy, Suspense } from "react";
// import HomePage from "./assets/pages/Home";
// import AboutPage from './assets/pages/About'
import Page404 from "./assets/pages/404";
import SearchPage from "./assets/pages/SeachPage";
import { Router } from "./Router";
import { Route } from "./Route";
import "./App.css";

const LazyHomePage = lazy(() => import('./assets/pages/Home'))
const LazyAboutPage = lazy(() => import('./assets/pages/About'))

const appRoutes = [
  {
    path: "/search/:query", //El query es dinámico
    Component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={<div>Cargando</div>}>
        <Router routes={appRoutes} defaulComponent={Page404}>
          <Route path="/" Component={LazyHomePage} />
          <Route path="/about" Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
