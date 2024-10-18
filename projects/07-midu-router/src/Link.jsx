import { EVENTS } from './consts';
import { BUTTONS } from './consts';


export function navigate(href) {
  window.history.pushState({}, "", href); // cambiar la url sin recargar la pagina
  //crear un evento personalizado de navegación
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Link ({target, to, ...props}){
  const handleClick = (e) => {
    e.preventDefault()

    const isMainEvent = e.button === BUTTONS.primary //primer click
    const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if(isMainEvent && isManageableEvent && !isModifiedEvent){
      navigate(to)//navegación SPA
      window.scrollTo(0,0)
    }
    
  }
  return <a onClick={handleClick} href={to} target={target} {...props}></a>
}