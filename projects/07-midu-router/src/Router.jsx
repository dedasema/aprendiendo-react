import { EVENTS } from "./consts";
import { useState, useEffect, Children } from "react";
import { match } from "path-to-regexp";

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}) {
  const [currenPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  //Añadir las rutas del children <Route/> Component
  const routesFromChildren = Children.map(children, ({props, type}) => {
    const {name} = type
    const isRoute = name === 'Route'

    return isRoute ? props : null

  })

  const routeToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routeToUse.find(({ path }) => {
    if (path === currenPath) return true;

    //hemos usado path-to-regexp
    //para poder detectar rutas dinámicas cono por ejemplo
    // /search/:query <- :query es una ruta dinámica
    const matcherURL = match(path, { decode: decodeURIComponent });
    const matched = matcherURL(currenPath);
    if (!matched) return false;

    //guardar los parámetros de la url que eran dinámicos
    //y que hemos extraído con path-to-regexp
    //por ejemplo, si la ruta es /search/:query
    //y la url es /search/javascript
    //matched.params.query === 'javascript'
    routeParams = matched.params;
    return true;
  })?.Component;
  return Page 
  ? <Page routeParams={routeParams} /> 
  : <DefaultComponent routeParams={routeParams}/>;
}
