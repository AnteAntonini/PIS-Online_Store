<template>
  <div class="ma-4">
    <h1>All products</h1>
    <v-row class="mt-5">
      <div class="button-add-new">
        <v-btn to="/products">Add a new product</v-btn>
        <v-btn to="/category">Add a new category</v-btn>
        <v-btn to="/owner">Add a new owner</v-btn>
      </div>
    </v-row>
    <v-row class="mt-6">
      <v-col class="pa-0" sm="3" v-for="(product,index) in products" :key="product._id">
        <v-card class="my-3" max-width="200">
          <v-img
            height="150"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ><!-- :src="product.photo" --></v-img>

          
          <!-- Prodcut Title -->
          <v-card-title :class="'text-subtitle-1'">{{product.title}}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <!-- Product Rating -->
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>
            <!-- Product Price -->
            <div class="my-4 subtitle-1">$ {{product.price}}</div>
          </v-card-text>

          <v-card-actions>
            <!-- Update Button -->
            <v-btn
              :to="`/products/${product._id}`"
              color="deep-purple lighten-2" text>
              Update
            </v-btn>

            <!-- Delete Button -->
            <v-btn
              @click="onDeleteProduct(product._id, index)"
              color="deep-purple lighten-2" text>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>


export default {
  async asyncData({ $axios}) {
    try {
      let response = await $axios.$get('http://localhost:3000/api/products')
      console.log(response)
      return {
        products: response.products
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async onDeleteProduct(id, index) {
      try {
        let response = await this.$axios.$delete(
          `http://localhost:3000/api/products/${id}`
        );

        if (response.status) {
          //remove
          this.products.splice(index, 1);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>


<style scoped>

</style>