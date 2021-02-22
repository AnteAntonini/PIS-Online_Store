<template>
  <div class="container d-flex">
    <v-col md="8">
      <h1 style="display: inline-block" class="ma-5">Shopping Cart</h1>
      <p class="mt-10" style="float: right">price</p>
      <v-divider></v-divider>
      <div class="cart-item my-3" v-for="product in getCart" :key="product._id">
        <h3 class="inline">{{product.title}}</h3>
        <span class="mb-3 price-right red--text">${{product.price}}</span>
        <p>by {{product.owner.name}}</p>
        <div class="mb-3">
          <span>Quantity:</span>
          <select class="input-bg mr-2" @click="onChangeQuantity($event, product)">
          <option
            v-for="i in 10" :key="i" 
            :selected="checkQty(product.quantity, i)"
            :value="i"
          >
            {{i}}
          </option>

          </select>
         | <v-btn href="#" @click="$store.commit('removeProduct', product)" class="red--text ml-2 ">Delete</v-btn>
        </div>
    
        <v-divider></v-divider>
      </div>
      <span style="float: right"
        >Subtotal ({{getCartLength}} item): <span class="red--text"> ${{getCartTotalPrice}}</span></span
      >
      
    </v-col>
    <v-col md="4" class="mt-10 ml-8" style="border-left: 1px solid white">
      <div class="ml-5">
        <h3>Subtotal ({{getCartLength}} item): <span class="red--text">${{getCartTotalPrice}}</span></h3>
        <h3 class="mt-3">BUY:</h3>
        <v-btn class="mt-4" nuxt to="/payment" color="green">With credit card</v-btn>
        <v-btn class="mt-10" @click="onPurchase; snackbar = true" color="green">Cash on delivery</v-btn>
      </div>
    </v-col>
    <div class="text-center">
        <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        >
        Purchase completed

        <template v-slot:action="{ attrs }">
            <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="onPurchase"
            >
            Close
            </v-btn>
        </template>
        </v-snackbar>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      multiLine: true,
      snackbar: false,   
      show1: false,
    }
  },
  computed: {
    ...mapGetters(['getCart', 'getCartTotalPrice', 'getCartLength'])
  },
  methods: {
    onChangeQuantity(event, product) {
      let qty = parseInt(event.target.value);       //access value of the option, and convert string to a number
      console.log(qty)
      this.$store.commit('changeQty', {product, qty});
    },
    checkQty(prodQty, qty) {       //save quantity after refresh in option
      if (parseInt(prodQty) === parseInt(qty)) {
        return true
      } else {
        return false
      }
    },
    async onPurchase() {
      try {
        let response = await this.$axios.$post('/api/payment', {
          totalPrice: this.getCartTotalPrice,
          cart: this.getCart,
          estimatedDelivery: this.getEstimatedDelivery
        })

        if(response.success) {
          //redirect
          this.$store.commit('clearCart')  //after purchase clear cart
          this.$router.push('/')
        }

      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.input-bg {
  background: white;
  width: 40px;
}
.inline {
  display: inline-block;
}
.price-right {
  float: right;
}
</style>