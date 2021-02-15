<template>
    <div>
        <h1 class="ma-5">Review your order</h1>
        <div class="mx-10 d-flex">
            <v-col md="9" >
                <v-row class="order-box">
                    <v-col>
                        <span class="order-detail">Shipping Address</span>
                        
                    </v-col>
                    <v-col>
                        <span class="order-detail">Payment Method</span>
                        <div class="mt-3">VISA ending in 6397</div>
                    </v-col>
                </v-row>
                <v-row class="order-box">
                    <v-col md="6">
                    <span class="my-5 order-detail red--text">Estimated delivery: <br> 29 November 2021</span>
                    <div class="d-flex" v-for="product in getCart" :key="product._id">
                        <v-col md="4" class="pa-0 mt-3">
                            "ode ide slika"
                        </v-col>

                        <v-col md="8" class="pa-0 mt-3">
                            <div><strong>{{product.title}}</strong></div>
                        <div>{{product.owner.name}}</div>
                        <div class="red--text">${{product.price}}</div>
                        <div>Quantity: {{product.quantity}}</div>
                        </v-col>
                        
                    </div>
                    </v-col>
                    <v-col md="6">
                        <span>Choose a delivery option: </span>
                    </v-col>
                </v-row>
            </v-col>
            <v-col md=3 class="pt-0">
                <div class="order-summary-box">
                    <span>Order Summary</span>
                    <div class="order-total red--text">
                        <span>Order total:</span>
                        <span class="price-span">${{getCartTotalPrice}}</span>
                    </div>
                </div>
            </v-col>
        </div>
    </div>
</template>


<script>
import {mapGetters} from 'vuex';

export default {
  layout: "default",
/*   async asyncData({$axios, store}) {
    try {
      let response = await $axios.$post('/api/shipment', {shipment: 'normal'});

      store.commit('setShipping', {
        price: response.shipment.price,
        estimatedDelivery: response.shipment.estimated
      })

      return {
        shippingPrice: response.shipment.price,
        estimatedDelivery: response.shipment.estimated
      }
    }catch(err) {
      console.log(err)
    }
  }, */
  computed: {
    ...mapGetters(['getCart','getCartTotalPrice'])
  },
/*   methods: {
    async onChooseShipping(shipment) {
      try {
        let response = await  this.$axios.$post('/api/shipment', {
          shipment: shipment
        });

        this.$store.commit('setShipping', {
          price: response.shipment.price,
          estimatedDelivery: response.shipment.estimated
        })


        this.shippingPrice = response.shipment.price
        this.estimatedDelivery = response.shipment.estimated

      }catch(err) {
        console.log(err)
      }
    }
  } */
};
</script>

<style scoped>
.order-box {
    border: 1px solid white;
}
.order-summary-box {
    height: 280px;
    padding: 10px;
    border: 1px solid white;
    position: relative;
}
.order-total {
    font-size: 20px;
    position: absolute;
    bottom: 10px;
}
.price-span {
    position: absolute;
    right: -150px;
}
.order-detail {
    font-size: 20px;
}
</style>