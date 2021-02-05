<template>
  <v-app dark>
    <Navbar/>
    <nuxt app/>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>
