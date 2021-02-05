<template>
<div class="container d-flex">
    <v-col col="8">
     <h1 class="mb-3 text-center">Update {{product.title}}</h1>
      <!-- Select Category -->
      <v-select
        v-model="categoryID"
        label="Select Category"
        outlined
        :items="categories"
        item-text="type"
        :item-value="categories.id"
        return-object
      >

      </v-select>

      <!-- Select Owner -->

      <v-select
        v-model="ownerID"
        label="Select Owner"
        outlined
        :items="owners"
        item-text="name"
        :item-value="owners.id"
        return-object
      >
      </v-select>

      <!-- Title -->
      <p>Title</p>
      <v-text-field
        v-model="title"
        outlined
        :label="product.title"
      ></v-text-field>

      <!-- Price -->
      <p>Price:</p>
      <v-text-field
        v-model="price"
        outlined
        :label="product.price + ' $'"
      ></v-text-field>
      
      <!-- Stock Quantity -->
      <p>Stock Quantity:</p>
      <v-text-field
        v-model="stockQuantity"
        outlined
        :label="product.stockQuantity"
      ></v-text-field>

      <!-- Description -->
      <p>Description:</p>
      <v-textarea
          v-model="description"
          outlined
          :label="product.description"
          value=""
        ></v-textarea>

        <!-- Add photo -->
        <div class="add-photo">
        <v-file-input
            label="Add photo"
            outlined
            type="file"
            prepend-icon="mdi-camera"
            @change="onFileSelected"
        ></v-file-input>
        </div>

        <!-- Button -->
        <div class="d-flex">
            <v-btn large class="mx-auto" @click="onUpdateProduct">
                Update product
            </v-btn>
        </div>
      
    </v-col>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {         
    try {
      let categories = $axios.$get("http://localhost:3000/api/categories");
      let owners = $axios.$get("http://localhost:3000/api/owners");
      let product = $axios.$get(`http://localhost:3000/api/products/${params.id}`);

      const [catResponse, ownerResponse, productResponse] = await Promise.all([
        categories,
        owners,
        product
      ]);

      
      return {
        categories: catResponse.categories, 
        owners: ownerResponse.owners,
        product: productResponse.product
      };
    } catch (err) {
      console.log(err);
    }
  },

  data() {          
    return {
        categoryID: null,
        ownerID: null,
        title: '',
        price: null,
        description: '',
        selectedFile: null,
        stockQuantity: null,
        fileName: ''
    }
  },

  methods: {
      onFileSelected(event) {           
          this.selectedFile = event
          this.fileName = event.name
      },

      async onUpdateProduct() {
          try {
            /* let data = new FormData()       //koristimo FormData jer cemo slat i photo, koji je drugi tip Data ,, koristimo sam URLSearchParams jer mi FormData nije radilo ??
            data.append('title', this.title)
            console.log(data.title)
            data.append('price', this.price)
            data.append('description', this.description)
            data.append('ownerID', this.ownerID)
            data.append('stockQuantity', this.stockQuantity)
            data.append('categoryID', this.categoryID)
            data.append('photo', this.selectedFile, this.selectedFile.name) */
            let data = {
              title : this.title,
              price :  this.price,
              ownerID: this.ownerID,
              categoryID: this.categoryID,
              description :  this.description,
              stockQuantity : this.stockQuantity

            }
            let result = await this.$axios.$put(`http://localhost:3000/api/products/${this.$route.params.id}`, data) //passing data to body
            this.$router.push('/')
          } catch(err) {
              console.log(err)
          }
          
      }
  }
};
</script>