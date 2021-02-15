<template>
    <div class="container">
        <h1 class="ma-3">Make a payment</h1>
        <p>The total price is: $9999</p>
        <v-btn>Purchase</v-btn>
    </div>
</template>

<script>
import {mapGetters } from 'vuex';

export default {
  data() {
    return {
      error: '',
      stripe: null,
      card: null
    }
  },
  computed: {
    ...mapGetters([
      'getCart',
      'getCartTotalPriceWithShipping', 
      'getEstimatedDelivery'
    ])
  },
  mounted() {
    this.stripe = Stripe('pk_test_51IJk1wIpQJZuZMlvGdc4WA3nHPdsHHuafdFWTCrZImQrO8pIkWOfJgklAue0myb3VArJUNTaXbWg9PDNihyFIT4K00xOby5oFe')
    let elements = this.stripe.elements()
    this.card = elements.create('card')
    this.card.mount(this.$refs.card)
  },
  methods: {
    async onPurchase() {
      try {
        let token = await this.stripe.createToken(this.card);
        let response = await this.$axios.$post('/api/payment', {
          token: token,
          totalPrice: this.getCartTotalPriceWithShipping,
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