<template>
  <div class="container mt-15">
    <h1 class="mt-10" style="text-align: center">Profile</h1>

    <v-form class="mx-auto" lazy-validation>
      <v-text-field v-model="name" :label="$auth.$state.user.user.name"></v-text-field>
      <v-text-field v-model="email" :label="$auth.$state.user.user.email"></v-text-field>
      <v-text-field v-model="password" label="Password"></v-text-field>
      <v-btn class="my-4" color="green" @click="onUpdateProfile">Update Profile</v-btn>
    </v-form>

  </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
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

                    await this.$auth.$fetchUser() //refetch API back
                }
            } catch (err) {
                console.log(err);   
            }
        },
        async onLogout() {
            await this.$auth.logout()   //clear token from cookies and local storage, then redirect to homepage
        }
    }
};
</script>

<style>
.container {
  width: 50%; 
}
</style>
