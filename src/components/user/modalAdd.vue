<template>
  <q-page>
    <q-dialog
      v-model="modalAddValue"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Medium</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Click/Tap on the backdrop.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" @click="$emit('modalAdd', false)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { Dialog } from 'quasar'
import { Notify } from 'quasar'

export default {
  name: 'add',
  props: {
    modalAddValue: {
      type: Boolean,
      required: true
    },

  },
  data(){
    return {
      
    }
  },
  computed:{
    auth() {
      return this.$store.getters["auth/getUserData"];
    },
    getAllUser() {
      return this.$store.getters["auth/getAllUser"];
    },
    internalRol(){
      switch (this.auth.type) {
        case "Teacher":
          return "Docente"
        break;
        case "Student":
          return "Estudiante"
        break;
        case "Admin":
          return "Administrador"
        break;
      
        default:
          return "Usuario"
          break;
      }
    }
  },
  async created(){
    await this.getUsers()
  },
  methods: {
    async getUsers(){
      try {
        await this.$store.dispatch('auth/getAllUsers')
      } catch (error) {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'positive', 
              position: 'top-right'
          })
      }
    },
    modalAdd(param){
      this.modalAddValue = param 
    }
  }
}
</script>
