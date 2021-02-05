<template>
    <div class="container">
        <v-col>
            <h2>Add a new category</h2>

            <!-- Type -->
            <v-text-field
                v-model="type"
                outlined
                label="Type"
            ></v-text-field>

            <!-- Button -->
            <div class="d-flex">
                <v-btn large class="mx-auto" @click="onAddCategory">
                    Add category
                </v-btn>
            </div>

            <!-- Category list -->
            <ul class="mt-10 ">
                <li class="category-list" v-for="category in categories" :key="category._id">
                    {{category.type}}
                </li>
            </ul>
        </v-col>
    </div>
</template>

<script>
export default {
    async asyncData( { $axios}) {
        try {
            let response = await $axios.$get('http://localhost:3000/api/categories')
            return {
                categories: response.categories
            }
        } catch(err) {
            console.log(err)
        }
    },
    data() {
        return {
            type: ''
        }
    },
    
    methods: {
        async onAddCategory() {
            try {
                let data = { type: this.type}
                let response = await this.$axios.$post('http://localhost:3000/api/categories', data)

                this.categories.push(data)

            } catch(err) {
                console.log(err)
            }
        }
    }
};
</script>

<style scoped>
.category-list {
    width: 100%;
    text-decoration: none;
    list-style-type: none;
    text-align: center;
    border: 2px solid white;
    padding: 4px;
}
</style>