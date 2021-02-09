<template>
  <div class="container mb-10">
    <featured-product />
    <v-card nuxt :to="`products/${product._id}`" class="mt-10" height="170" v-for="product in products" :key="product._id">
      <div class="d-flex flex-no-wrap justify-start">
        <v-avatar tile height="170" width="120">
          <v-img
            src="https://shop.skolskaknjiga.hr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/7/172335.jpg"
          ></v-img><!-- :src="product.photo" -->
        </v-avatar>
        <div>
          <v-card-title class="align-start" style="display: inline-block">{{product.title}}
          </v-card-title>
          <v-card-subtitle>by {{product.owner.name}}</v-card-subtitle>
          <v-card-text>Price: ${{product.price}}</v-card-text>
        </div>
        <v-card-subtitle class="pa-0 pt-6 ma-0">Sep 3,2020</v-card-subtitle>
      </div>
    </v-card>
  </div>
</template>

<script>
import FeaturedProduct from '../components/FeaturedProduct'
export default {
  components: { FeaturedProduct },
  async asyncData({$axios}) {
    try {
      let response = await $axios.$get('/api/products')
      console.log(response)
      return {
        products: response.products
      }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
.featured-image {
  height: 300px;
}
</style>