<template>
      <div class="container">
        <v-col>
            <h2>Add a new owner</h2>

            <!-- Name -->
            <v-text-field
                v-model="name"
                outlined
                label="Name"
            ></v-text-field>

             <!-- About -->
            <v-text-field
                v-model="about"
                outlined
                label="About"
            ></v-text-field>

             <!-- Add owner photo -->
            <div class="add-photo">
            <v-file-input
                label="Add photo"
                outlined
                type="file"
                prepend-icon="mdi-camera"
                @change="onFileSelected"
            ></v-file-input>
            </div>

            <!-- Button -->
            <div class="d-flex">
                <v-btn large class="mx-auto" @click="onAddOwner">
                    Add owner
                </v-btn>
            </div>

            <!-- Owner list -->
            <ul class="mt-10 ">
                <li class="owner-list" v-for="owner in owners" :key="owner._id">
                    {{owner.name}}
                </li>
            </ul>
        </v-col>
    </div>
</template>

<script>
export default {
    async asyncData( { $axios}) {
        try {
            let response = await $axios.$get('http://localhost:3000/api/owners')
            return {
                owners: response.owners
            }
        } catch(err) {
            console.log(err)
        }
    },
    data() {
        return {
            name: '',
            about: '',
            selectedFile: null,
            fileName: ''
        }
    },
    
    methods: {
        onFileSelected(event) {         
          this.selectedFile = event
          this.fileName = event.name
      },
        async onAddOwner() {
            try {
                /* let data = new FormData()
                   data.append('name', this.name)
                   data.append('about', this.about)
                   data.append('photo', this.selectedFile, this.selectedFile.name)
                */
                let data = {name: this.name, about: this.about}
                let response = await this.$axios.$post('http://localhost:3000/api/owners', data)

                this.owners.push({name: this.name})
                
                this.name = '',
                this.about = ''

            } catch(err) {
                console.log(err)
            }
        },
        
    }
};
</script>

<style scoped>
.owner-list {
    width: 100%;
    text-decoration: none;
    list-style-type: none;
    text-align: center;
    border: 2px solid white;
    padding: 4px;
}
</style>