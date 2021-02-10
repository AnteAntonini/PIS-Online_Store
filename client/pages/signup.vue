<template>
  <div class="container mt-15">
    <h1 class="mt-10" style="text-align: center">Register</h1>
    <v-form v-model="valid" class="form mx-auto" lazy-validation>
      <v-text-field v-model="name" label="Name" required></v-text-field>

      <v-text-field v-model="email" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" label="Password" 
      :rules="passwordRules" :type="show1 ? 'text' : 'password'" hint="At least 6 characters"></v-text-field>
      <v-btn class="my-4" color="green">Create account</v-btn>
      <v-divider class="my-3"></v-divider>
      <span>Already have account? <v-btn text class="sign-in-btn blue--text">Sign in</v-btn></span>
    </v-form>
  </div>
</template>

<script>
    export default {
      layout: 'none',
      data() {
        return {
          name: '',
          email: '',
          valid: '',
          password: '',
          show1: false,
          passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be at lest  6 characters',
          ],
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
  border: 1px solid white
}
.sign-in-btn {
  text-decoration: none;
}
</style>