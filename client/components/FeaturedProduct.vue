<template>
    <div align="center">
        <h1>Books</h1>

        <p>Browse for more Books
        <a href="#">History or</a>
        <a href="#">Fantasy books</a>
        </p>
        <v-row class="featured-product">
            <v-col col="3">
                <img class="featured-image mt-3 pl-15" src="img/harry-potter.jpg"/>
            </v-col>
            <v-col col=9 class="pr-15 featured-details">
                <h2 class="mt-10">Harry Potter i Kamen mudraca</h2>
                <p>Harry Potter i Kamen mudraca prva je od sedam knjiga iz serijala
                     o Harryju Potteru autorice J. K. Rowling</p>
               <!--  <a href="#" class="featured-orderBtn">Order now</a> -->
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.featured {
    &-details {
    position: relative;
    }
    &-product {
    background: rgb(64, 60, 60);
    }
    &-image {
    height: 300px;
    }
    &-orderBtn {
    position: absolute;
    bottom: 50px;
    }
}
</style>