import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  onRemoveAllItems = () => {
    this.setState({cartList: []})
  }

  //   TODO: Update the code here to implement addCartItem
  addCartItem = product => {
    this.setState(prevState => {
      const isPresent = prevState.cartList.some(
        eachItem => eachItem.id === product.id,
      )
      if (isPresent) {
        return {
          cartList: prevState.cartList.map(eachItem =>
            eachItem.id === product.id
              ? {...eachItem, quantity: eachItem.quantity + 1}
              : eachItem,
          ),
        }
      }
      return {cartList: [...prevState.cartList, {...product, quantity: 1}]}
    })
  }

  onIncrementCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (eachCartItem.id === id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return {...eachCartItem}
      }),
    }))
  }

  onRemoveCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  onDecrementCartItem = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList
        .map(eachCartItem => {
          if (eachCartItem.id === id) {
            const updatedQuantity = eachCartItem.quantity - 1
            if (updatedQuantity > 0) {
              return {...eachCartItem, quantity: updatedQuantity}
            }
            return null // Mark for removal
          }
          return eachCartItem
        })
        .filter(item => item !== null) // Remove items marked for removal

      return {cartList: updatedCartList}
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.onIncrementCartItem,
          decrementCartItemQuantity: this.onDecrementCartItem,
          removeCartItem: this.onRemoveCartItem,
          removeAllCartItems: this.onRemoveAllItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
