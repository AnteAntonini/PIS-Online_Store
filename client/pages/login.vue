<template>
  <div class="container mt-15">
    <h1 class="mt-10" style="text-align: center">Login</h1>
    <v-form class="form mx-auto" lazy-validation>
      <v-text-field v-model="email" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" label="Password" :type="show1 ? 'text' : 'password'"></v-text-field>
      <v-btn class="my-4" color="green" @click="onLogin">Login</v-btn>
      <v-divider class="my-3"></v-divider>
      <span>Don't have account? <v-btn text class="sign-in-btn blue--text" nuxt to="/signup">Sign up</v-btn></span>
    </v-form>

  </div>
</template>

<script>
export default {
    middleware: 'auth',
    auth: 'guest',          //only not loggedIn: false can access the page
    layout: 'none',
    data() {
        return {
            email: '',
            password: '',
            show1: false,
        }
    },
        methods: {
        async onLogin() {
            try {
                this.$auth.loginWith('local', {     //trigger auth library
                    data: {                     
                        email: this.email,
                        password: this.password
                    }
                });
                this.$router.push('/')     //redirect
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style scoped>
.form {
  width: 80% !important;
}
.container {
  width: 50%; 
  border: 1px solid white;
}
</style>