<template>
  <div>
    <v-app-bar color="deep-purple accent-4" height="80" class="px-10">
      <v-toolbar-title>Online Store</v-toolbar-title>
      <v-text-field
        filled
        label="Search products"
        class="mt-6 ml-10"
        append-icon="mdi-magnify"
        color="white"
      ></v-text-field>
      <v-spacer></v-spacer>

      <div class="d-flex flex-column mt-4">
        <span style="font-size: 12px">Hello, Sign in</span>
        <v-btn small class="mx-2" text style="font-size: 10px">
          Accounts
          <v-icon small>mdi-arrow-down</v-icon>
        </v-btn>
      </div>

      <v-btn class="mx-6" text> Orders </v-btn>

      <v-btn icon class="mx-6">
        Cart
        <v-icon>mdi-cart-variant</v-icon>
        0
      </v-btn>
    </v-app-bar>
  </div>
</template>

<style scoped>
</style>