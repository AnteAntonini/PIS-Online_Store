<template>
  <div class="container d-flex">
    <v-col md="8">
      <h1 style="display: inline-block" class="ma-5">Shopping Cart</h1>
      <p class="mt-10" style="float: right">price</p>
      <v-divider></v-divider>
      <div class="cart-item my-3">
        <h3 class="inline">Product Title</h3>
        <span class="mb-3 price-right red--text">$49</span>
        <p>by Product Owner</p>
        <div class="mb-3">
          <label for="quantity">Quantity:</label>
          <input
            class="input-bg"
            value="1"
            type="number"
            id="quantity"
            name="quantity"
            min="1"
          />
          | <a href="#">Delete</a>
        </div>
        <v-divider></v-divider>
      </div>
      <span style="float: right"
        >Subtotal (2 item): <span class="red--text"> $99</span></span
      >
      
    </v-col>
    <v-col md="4" class="mt-10 ml-8" style="border-left: 1px solid white">
      <div class="ml-5">
        <h3>Subtotal (2 item): <span class="red--text">$99</span></h3>
        <v-btn class="mt-10" color="green">Proceed to checkout</v-btn>
      </div>
    </v-col>
  </div>
</template>

<script>
export default {
    
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