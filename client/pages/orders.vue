<template>
    <div class="container mt-3">
        <h1 class="ma-3">Your Orders</h1>
        <span class="orange-border">Orders</span>
        <v-divider></v-divider>
        <div v-for="order in orders" :key="order._id">
        <v-row class="mt-5 order-box">
            <v-col>
                <span class="green--text">Delivered</span>
            </v-col>
            <v-col>
            ORDER PLACED<br>
            May 16,2016
            </v-col>
            <v-col>
                TOTAL: <br>
                ${{order.totalPrice}}
            </v-col>
            <v-col>
                ORDER #: {{order._id}} <br>
            </v-col>
        </v-row>
        <v-row class="order-box items">
            <v-col md="12"  v-for="product in order.products" :key="product._id">
                <span>Title: {{product.productID.title}}</span> <br>
                <span>Sold by Online Store</span><br>
                <span>Quantity: {{product.quantity}}</span><br>
                <span class="red--text">${{product.price}}</span><br>
                <v-btn class="mt-5" nuxt :to="`/products/${product.productID._id}`">View your item</v-btn>
            </v-col>
        </v-row>
        </div>
    </div>
</template>

<script>
export default {
  async asyncData({$axios}) {
    try {
      let response = await $axios.$get('/api/orders')

      return {
        orders: response.products
      }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>   

<style scoped>
.orange-border {
    border-bottom: 1px solid orangered;
    padding-bottom: 2px;
}
.order-box {
    border: 1px solid white;
}
.items {
    height: 100%;
}
</style>