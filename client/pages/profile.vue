<template>
  <div class="container mt-15">
    <h1 class="mt-10" style="text-align: center">Profile</h1>
    <v-form class="mx-auto" lazy-validation>
      <v-text-field v-model="name" :label="$auth.$state.user.user.name"></v-text-field>
      <v-text-field v-model="email" :label="$auth.$state.user.user.email"></v-text-field>
      <v-text-field v-model="password" label="Password" :type="show1 ? 'text' : 'password'"></v-text-field>
      <v-btn class="my-4" color="green" @click="onUpdateProfile; snackbar = true">Update Profile</v-btn>
      <div class="text-center">
        <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        >
        Profile Updated

        <template v-slot:action="{ attrs }">
            <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
            >
            Close
            </v-btn>
        </template>
        </v-snackbar>
      </div>
    </v-form>

  </div>
</template>

<script>
export default {
    data() {
        return {
            multiLine: true,
            snackbar: false,   
            show1: false, 
            name: '',
            email: '',
            password: '',
            
        }
    },
    methods: {
        async onUpdateProfile() {
            let data = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            try {
                let response = await this.$axios.$put('/api/auth/user', data);  //by default it will attach token to our axios call

                if(response.success) {
                    this.name = ''
                    this.email = ''
                    this.password = ''

                    await this.$auth.fetchUser() //refetch API back
                }
            } catch (err) {
                console.log(err);   
            }
        },
    }
};
</script>

<style>
.container {
  width: 50%;
}
</style>
