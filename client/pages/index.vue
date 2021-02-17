<template>
  <div class="container mb-10">
    <v-text-field
        filled
        label="Search products"
        class="mt-6 ml-10"
        append-icon="mdi-magnify"
        color="white"
        v-model="search"
      ></v-text-field>
    <featured-product />
    <v-card nuxt :to="`products/${product._id}`" class="mt-10" height="170" v-for="product in filteredProducts" :key="product._id">
      <div class="d-flex flex-no-wrap justify-start">
        <v-avatar tile height="170" width="120">
          <v-img
            src="img/harry-potter.jpg"
          ></v-img><!-- :src="product.photo" -->
        </v-avatar>
        <div>
          <v-card-title class="align-start" style="display: inline-block">{{product.title}}
          </v-card-title>
          <v-card-subtitle>by {{product.owner.name}}</v-card-subtitle>
          <v-card-text>Type: {{product.category.type}}
          <br>Price: ${{product.price}}</v-card-text>
        </div>
        <v-card-subtitle class="pa-0 pt-6 ma-0">Sep 3,2020</v-card-subtitle>
      </div>
    </v-card>
  </div>
</template>

<script>
import FeaturedProduct from '../components/FeaturedProduct'
export default {
  data() {
    return {
      search: ''
    }
  },
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
  },
  computed:{
    filteredProducts() {
      return this.products.filter((product) => {
        if (this.search == '') {
          return product.title
        }
        else {
        return product.title.toLowerCase().match(this.search)
        }
      })
    }
  }
}
</script>

<style scoped>
.featured-image {
  height: 300px;
}
</style>