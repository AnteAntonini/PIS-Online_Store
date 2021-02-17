<template>
  <div>
    <v-app-bar color="deep-purple accent-4" height="80" class="px-10">
      <v-btn plain text nuxt to="/">Online Store</v-btn>
      
      <v-spacer></v-spacer>
      
      <v-btn class="mx-6" nuxt to="/orders" text :disabled="!$auth.$state.loggedIn"> Orders </v-btn>

      <v-btn text class="mx-6" nuxt to="/cart" :disabled="!$auth.$state.loggedIn">
        Cart
        <v-icon>mdi-cart-variant</v-icon>
        {{getCartLength}}
      </v-btn>

      <div v-if="isLoggedIn">
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
import {mapGetters} from 'vuex'

export default {
  methods: {
    async onLogout() {
    await this.$auth.logout()  // clearing all the tokens in a local storage and cookies,redirect user to home page
    location.reload()
    location.replace('/')
    }
  },
  computed: {
    ...mapGetters(['getCartLength']),
    isLoggedIn() {
      return this.$auth.$state.loggedIn
    }
  },
  mounted() {
    if (localStorage.getItem('reloaded')) {
        localStorage.removeItem('reloaded');
    } else {
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
}
}
</script>

<style scoped>
.btn-font{
  font-size: 17px !important;
}
</style>