<template>
    <div class="container mx-auto mt-15 d-flex flex-no-wrap">
        <v-col md="3">
            <v-img src="https://shop.skolskaknjiga.hr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/7/172335.jpg"
            alt="" contain />
        </v-col>
        <v-col md="6">
            <h1>{{product.title}}</h1>
            <p>by {{product.owner.name}}</p>
            <h4 class="mt-10">Description:</h4>
            <p>{{product.description}}</p>
        </v-col>
        <v-col col="3" style="border: 1px solid white">
            <div style="display: inline-block">
                <label for="quantity">Quantity:</label>
                <input class="input-bg" value="1" v-model="test" type="number" id="quantity" name="quantity" min="1" :max="product.stockQuantity">
               <span class="ml-8 red--text">{{product.price}}$</span>
            </div>
            <h3 class="mt-3 green--text">In Stock</h3>
            <v-btn class="btn-width mt-6">Add to Cart</v-btn>
            <v-btn class="btn-width my-3">Buy Now</v-btn>
            <v-divider class="mt-15"></v-divider>
            <div class="justify-center">
                Buy Now: ${{totalPrice}}
            </div>
        </v-col>
    </div>
</template>

<script>
export default {
    async asyncData({$axios, params}) {
        try {
            let singleProduct = await $axios.$get(`/api/products/${params.id}`)
            console.log(singleProduct.product)

            
            return {
                product: singleProduct.product
            }
        } catch (err) {
            console.log(err)
        }
    },
    data() {
        return {
            test: [1]
        }
    },
    computed: {
        totalPrice() {
            return this.product.price*this.test
        }
    }
}
</script>

<style scoped>
.input-bg {
    background: white;
    width: 40px;
}
.btn-width {
    width: 90%;
}
</style>


