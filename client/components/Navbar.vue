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

      <v-btn class="mx-6" text> Orders </v-btn>

      <v-btn text class="mx-6">
        Cart
        <v-icon>mdi-cart-variant</v-icon>
        0
      </v-btn>

      <div v-if="$auth.$state.loggedIn">
        <v-btn text style="font-size: 10px" class="text-capitalize btn-font" nuxt to="/profile">
          <span>Hello, <br>{{ $auth.$state.user.user.name}}</span>
        </v-btn>
        <v-btn text @click="onLogout">
          Log Out
        </v-btn>
      </div>
      <v-btn text style="font-size: 12px" nuxt to="/login" v-else>Sign in</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  methods: {
    async onLogout() {
    await this.$auth.logout()   // clearing all the tokens in a local storage and cookies,redirect user to home page
    }
  }
}
</script>

<style scoped>
.btn-font{
  font-size: 17px !important;
}
</style>