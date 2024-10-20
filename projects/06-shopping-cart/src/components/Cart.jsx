import { ClearCartIcon, CartIcon } from "./Icons"
import { useId } from "react"
import './Cart.css'
import { useCart } from "../hooks/useCart"

function CartItem ({price, title, quantity, addToCart}) {
  return (
    <li>
      <img 
        src='https://th.bing.com/th/id/OIP.lb2OtD40lN1XgwQbVWcriwHaEl?rs=1&pid=ImgDetMain' 
        alt={title} 
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <small>
          Qty: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export function Cart () {
  const cartCheckboxId = useId()
  const {cart, clearCart, addToCart} = useCart()

  return (
    <>
      <label htmlFor={cartCheckboxId} className="cart-button">
        <CartIcon/>
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden/>

      <aside className="cart">
        <ul>
          {cart.map(product => (
            <CartItem 
              key={product.id} 
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon/>
        </button>

      </aside>
    </>
  )
}