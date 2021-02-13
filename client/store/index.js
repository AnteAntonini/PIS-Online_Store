export const state = () => ({
    //state
    cart: [],
    cartLength: 0,
    shippingPrice: 0,
    shippingEstimatedDelivery: '',
})


export const getters = {
    getCartLength(state) {
        return state.cartLength;
    },
    getCart(state) {
        return state.cart;
    },
    getCartTotalPrice(state) {          //total price of cart
        let total = 0;
        state.cart.map(product => {
            total += product.price * product.quantity;
        });

        return total;
    },
    getCartTotalPriceWithShipping(state) {
        let total = 0;
        state.cart.map(product => {
            total += product.price + product.quantity;
        });

        return total + state.shippingPrice;
    },
    getEstimatedDelivery(state) {
        return state.shippingEstimatedDelivery;
    }
}

export const mutations = {
    pushProductToCart(state, product) {         //pushing the product to cart for the first time, we add additional key to our product object which is quantity = 1
        product.quantity = 1;
        state.cart.push(product);
    },

    incrementProductQty(state, product) {       // update the quantity, if the product exist we just want to update quantity
        product.quantity++;
        let indexOfProduct = state.cart.indexOf(product);
        state.cart.splice(indexOfProduct, 1, product);          //update a cart
    },
    incrementCartLength(state) {
        state.cartLength = 0;           //it will always set the cart to zero
        if (state.cart.length > 0) {
            state.cart.map(product => {
                state.cartLength += product.quantity;       //accumulate all of the product quantity and make it equal to cart length
            });
        }
    },



    /*1. Find the product in the cart
      2. Change the quantity of the product
      3. Update the length of the cart
      4. Replace the old product with the updated product */

    changeQty(state, { product, quantity }) {
        let cartProduct = state.cart.find(prod => prod._id === product._id);
        cartProduct.quantity = quantity;
        console.log(cartProduct.quantity)

        state.cartLength = 0;
        if (state.cart.length > 0) {
            state.cart.map(product => {
                state.cartLength += product.quantity;
            });
        }

       
    },


    /* 
1. Remove the product quantity from the cartLength
2. Get the index of the product that we want to delete
3. Remove that product by using splice
*/

    removeProduct(state, product) {
        state.cartLength -= product.quantity;
        let indexOfProduct = state.cart.indexOf(product);
        state.cart.splice(indexOfProduct, 1);
    },

    setShipping(state, { price, estimatedDelivery }) {
        state.shippingPrice = price;
        state.shippingEstimatedDelivery = estimatedDelivery;
    },

    clearCart(state) {
        state.cart = []
        state.cartLength = 0
        state.shippingPrice = 0
        state.shippingEstimatedDelivery = ''
    }
}

export const actions = {
    addProductToCart({ state, commit }, product) {
        const cartProduct = state.cart.find(prod => prod._id === product._id);  //check if product exist

        if (!cartProduct) {
            commit('pushProductToCart', product);   //if a product doesn't exist then  push product to the cart 
        } else {
            commit('incrementProductQty', cartProduct); //if product does exist increase the quantity of the product
        }

        commit('incrementCartLength');  //just increase length of the cart
    }
};