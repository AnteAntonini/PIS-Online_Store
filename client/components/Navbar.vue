<template>
  <div>
    <v-app-bar color="deep-purple accent-4" height="80" class="px-10">
      <v-btn plain text nuxt to="/">Online Store</v-btn>
      <v-text-field
        filled
        label="Search products"
        class="mt-6 ml-10"
        append-icon="mdi-magnify"
        color="white"
      ></v-text-field>
      <v-spacer></v-spacer>

        <v-btn text style="font-size: 12px" nuxt to="/signup">Sign in</v-btn>

      <v-btn class="mx-6" text> Orders </v-btn>

      <v-btn text class="mx-6">
        Cart
        <v-icon>mdi-cart-variant</v-icon>
        0
      </v-btn>
    </v-app-bar>
  </div>
</template>

<style scoped>
</style>