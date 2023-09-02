import { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    
    function increaseItemQuantity (index) {
        let cartCopy = [...cart]
        cartCopy[index].quantity += 1
        setCart(cartCopy)
    }

    function decreaseItemQuantity (index) {
        let cartCopy = [...cart]
        if (cartCopy[index].quantity === 1) {
            cartCopy = cartCopy.filter((item, itemIndex) => itemIndex!==index )
        }else{            
            cartCopy[index].quantity -= 1
        }
        setCart(cartCopy)
    }

    
    function addToCart (itemToAdd) {
        let index = null

        if(itemToAdd.quantity <= 0) {
            throw Error('Cannot add less than 1 item')
        }

        let itemFound = cart.filter((cartItem, itemIndex) => {
            if(cartItem.productId === itemToAdd.productId &&
                cartItem.additionalInfo === itemToAdd.additionalInfo) {
                    index = itemIndex
                    return cartItem
                }
            })

        if(itemFound[0]) {
            let cartCopy = [...cart]
            cartCopy[index].quantity += itemToAdd.quantity
            setCart(cartCopy) 
        } else {
            setCart([...cart, itemToAdd])
        }
        
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, increaseItemQuantity, decreaseItemQuantity}}>
            {children}
        </ CartContext.Provider>
    )
}