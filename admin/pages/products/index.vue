<template>
  <div class="container d-flex">
    <v-col col="8">
     <h1 class="mb-3 text-center">Add a new Product</h1>
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
      <v-text-field
        v-model="title"
        outlined
        label="Title"
      ></v-text-field>

      <!-- Price -->
      <v-text-field
        v-model="price"
        outlined
        label="Price"
      ></v-text-field>

      <!-- Stock Quantity -->
      <v-text-field
        v-model="stockQuantity"
        outlined
        label="StockQuantity"
      ></v-text-field>

      <!-- Description -->
      <v-textarea
          v-model="description"
          outlined
          label="Description"
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
        <p>{{ fileName}}</p>
        </div>

        <!-- Button -->
        <div class="d-flex">
            <v-btn large class="mx-auto" @click="onAddProduct">
                Add product
            </v-btn>
        </div>
      
    </v-col>
  </div>
</template>

<script>
export default {
    data() {
      return {
        categories: [],
        owners: []
      }
    },
    async asyncData({ $axios}) {
    try {
      let categories = await $axios.$get('http://localhost:3000/api/categories')
      let owners = await $axios.$get('http://localhost:3000/api/owners')
      

      const [catResponse, ownerResponse] = await Promise.all([
        categories,
        owners
      ])

      return {
        categories : catResponse.categories,
        owners : ownerResponse.owners
      }
    } catch (err) {
        console.log(err)
    } 
  },

  data() {         
    return {
        categoryID: null,
        ownerID: null,
        title: '',
        price: 0,
        description: '',
        selectedFile: null,
        stockQuantity: 1,
        fileName: ''
    }
  },

    methods: {
      onFileSelected(event) {           //it will select a file that you chose and set it to this.selectedFIle
          this.selectedFile = event
          this.fileName = event.name
      },

      async onAddProduct() {
          try {
           /*  let data = new FormData()        //koristimo FormData jer cemo slat i photo, koji je drugi tip Data ,, koristimo sam URLSearchParams jer mi FormData nije radilo ??
            data.append('title', this.title)
            data.append('price', this.price)
            data.append('description', this.description)
            data.append('ownerID', this.ownerID)
            data.append('stockQuantity', this.stockQuantity)
            data.append('categoryID', this.categoryID)
            /* data.append('photo', this.selectedFile, this.selectedFile.name) */ 

            let data = {
              title: this.title,
              price: this.price,
              description: this.description,
              ownerID: this.ownerID,
              categoryID: this.categoryID,
              stockQuantity: this.stockQuantity
            }

            let result = await this.$axios.$post('http://localhost:3000/api/products', data)
            this.$router.push('/')
          } catch(err) {
              console.log(err)
          }
          
      }
  }
}
</script>

<style scoped>
.button {
    justify-content: center;
    align-content: center;
}
</style>