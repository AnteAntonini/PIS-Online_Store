<template>
  <div class="container mt-15">
    <h1 class="mt-10" style="text-align: center">Register</h1>

    <v-form class="form mx-auto" lazy-validation>
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="email" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" label="Password" 
      :rules="passwordRules" :type="show1 ? 'text' : 'password'" hint="At least 6 characters"></v-text-field>
      <v-btn class="my-4" color="green" @click="onSignUp">Create account</v-btn>
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
          password: '',
          show1: false,
          passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be at lest  6 characters',
          ],
        }
      },
      methods: {
        async onSignUp() {
            try {
                let data = {
                  name: this.name,
                  email: this.email,
                  password: this.password
                }

                let response = await this.$axios.$post('/api/auth/signup', data)
                console.log(response)

                if(response.success) {  //if response is success we want to trigger auth library
                  let data = await this.$auth.loginWith('local', { //auth library will trigger log in and send in email and password
                        data: {                    
                          email: this.email,
                          password: this.password
                        }
                    }); //auth library stores the token in the cookies and local storage, while stores users object on the Vuex
                    console.log(data.config.data)
                    this.$router.push('/')      //redirect user to homepage
                }
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
  border: 1px solid white
}
.sign-in-btn {
  text-decoration: none;
}
</style>