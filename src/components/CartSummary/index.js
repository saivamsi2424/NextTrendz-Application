// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const count = cartList.length
      let total = 0
      cartList.forEach(eachItem => {
        total += eachItem.price * eachItem.quantity
      })

      return (
        <div className="main-container">
          <h1 className="total-heading">
            Order Total:<span>Rs {total}</span>
          </h1>
          <p className="para">{count} items in cart</p>
          <button
            type="button"
            data-testid="checkout"
            className="checkout-button"
          >
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
