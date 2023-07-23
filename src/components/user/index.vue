<template>
  <q-page>
    <section>
      <div class="row q-mt-lg">
        <div class="col-12 q-pt-md">
          <p class="text-h6 text-center">¡Hola {{ internalRol }}!</p>         
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-left q-pa-xs">
            <p class="text-bold"><q-icon name="group" size="sm" color="primary"></q-icon>  Listado de usuarios</p>      
        </div>
      </div>
      <div class="row">
        <div class="col-12 q-pa-xs">
          <q-table
            title=""
            :data="getAllUser"
            :columns="columns"
            row-key="name"
          />
        </div>
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="indigo" @click="modalAdd(true)"/>
      </q-page-sticky>
    </section>
    <modal-add
      v-if="modalAddValue"
      :modalAddValue="modalAddValue"
      @modalAdd="modalAdd"
    ></modal-add>
  </q-page>
</template>

<script>
import { Dialog } from 'quasar'
import { Notify } from 'quasar'
import modalAdd from './modalAdd.vue'

export default {
  name: 'index',
  components: {
    modalAdd
  },
  props: {
    /* title: {
      type: String,
      required: true
    }, */

  },
  data(){
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombres',
          align: 'left',
          field: row => row.persona.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'surname', align: 'left', label: 'Apellidos', field: row => row.persona.surname, sortable: true },
        { name: 'gender', align: 'left', label: 'Género', field: row => row.persona.gender, sortable: true },
        { name: 'type', align: 'left', label: 'Tipo', field: row => row.type, sortable: true },
        { name: 'document', align: 'left', label: 'Nro de cédula', field: row => row.persona.document, sortable: true },
        { name: 'phone', align: 'left', label: 'Nro de teléfono', field: row => row.persona.phone, sortable: true },
        { name: 'email', align: 'left', label: 'Correo', field: row => row.persona.email, sortable: true },
        { name: 'actions', align: 'left', label: 'Acciones'},
      ],
      modalAddValue: false
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
