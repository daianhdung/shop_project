const { createContext, useState } = require("react");

const CartContext = createContext({
    items: [],
    addToCart: () => { },
    onIncrease: () => { },
    onReduce: () => { },
    onDelete: () => { },
    handleChange: () => { },
    getTotalCart: () => { },
    getTotalQuantityCart: () => { },
    deleteAllFromCart: () => { }
})

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('items')));

    var addToCart = (item) => {
        const items = []
        if(cartProducts === null){
            items.push(item)
            localStorage.setItem('items', JSON.stringify(items))
            setCartProducts(items)
        }else{
            const localItems = cartProducts
            localItems.map((itemLocal) => {
                if (item.id == itemLocal.id) {
                    item.quantity = itemLocal.quantity + item.quantity
                    
                } else {
                    items.push(itemLocal)
                }
            })
            items.push(item)
            localStorage.setItem('items', JSON.stringify(items))
            setCartProducts(items)
        }
    }

    var onReduce = (id) => {
        const updatedItemList = cartProducts.map((item) => {
            if (item.id === id && item.quantity > 0) {
                item.quantity--;
            }
            return item;
        });
        setCartProducts(updatedItemList);
        localStorage.setItem("items", JSON.stringify(updatedItemList));
    }

    var onIncrease = (id) => {
        const updatedItemList = cartProducts.map((item) => {
            if (item.id == id) {
                item.quantity++
            }
            return item
        })
        setCartProducts(updatedItemList);
        localStorage.setItem("items", JSON.stringify(updatedItemList));
    }

    var onDelete = (id) => {
        const updatedItemList = cartProducts.filter((item) => item.id !== id);
        if (updatedItemList.length === 0) {
            localStorage.removeItem('items')
            setCartProducts(null)
        } else {
            setCartProducts(updatedItemList);
            localStorage.setItem("items", JSON.stringify(updatedItemList));
        }
    }

    var handleChange = (e, id) => {
        const inputValue = e.target.value;
        const updatedItemList = cartProducts.map((item) => {
            const newCount = isNaN(inputValue) ? item.quantity : Number(inputValue);
            if (item.id == id) {
                item.quantity = newCount
            }
            return item
        })
        setCartProducts(updatedItemList);
        localStorage.setItem("items", JSON.stringify(updatedItemList));
    }

    var getTotalCart = () => {
        let total = 0
        if(cartProducts != null){
            cartProducts.map((item) => {
                total += item.price * item.quantity
            })
        }
        return total
    }

    const getTotalQuantityCart = () => {
        let totalQuantity = 0
        cartProducts.map((item) => {
            totalQuantity += item.quantity
        })
        return totalQuantity
    }

    const deleteAllFromCart = () => {
        setCartProducts('')
        localStorage.removeItem('items')
    }


    const value = {
        items: cartProducts,
        addToCart,
        onIncrease,
        onReduce,
        onDelete,
        handleChange,
        getTotalCart,
        getTotalQuantityCart,
        deleteAllFromCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext