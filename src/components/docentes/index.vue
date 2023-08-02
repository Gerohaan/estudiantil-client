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
            <p class="text-bold"><q-icon name="group" size="sm" color="primary"></q-icon>  Listado de docentes</p>      
        </div>
      </div>
      <div class="row">
        <div class="col-12 q-pa-xs">
          <q-table
            title=""
            :data="getAllTeacher"
            :columns="columns"
            row-key="name"
            :filter="filter"
            :pagination="initialPagination"
          >
            <template v-slot:top>
              <q-space></q-space>
              <q-input 
                label-color="indigo" 
                outlined 
                dense 
                debounce="300" 
                color="primary" 
                label="Buscar..."
                clearable
                v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props" v-if="internalRol === 'Administrador' || auth.persona.id === props.row.persona.id">
                <q-td key="name" :props="props">
                  {{ props.row.persona.name }}
                </q-td>
                <q-td key="surname" :props="props">
                  {{ props.row.persona.surname }}
                </q-td>
                <q-td key="gender" :props="props">
                  {{ props.row.persona.gender }}
                </q-td>
                <q-td key="document" :props="props">
                  {{ props.row.persona.document }}
                </q-td>
                <q-td key="phone" :props="props">
                  {{ props.row.persona.phone }}
                </q-td>
                <q-td key="email" :props="props">
                  {{ props.row.persona.email }}
                </q-td>
                <q-td key="profession" :props="props">
                  {{ props.row.profession }}
                </q-td>
                <q-td key="birthDate" :props="props">
                  {{ calcularEdad(props.row.persona.birthDate) }}
                </q-td>
                <q-td key="actions" :props="props">
                  <q-btn @click="modalAdd(true, props.row)" dense padding="none" color="indigo" flat icon="person_search"></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </section>
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
      filter: '',
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 15
        // rowsNumber: xx if getting data from a server
      },
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
        { name: 'document', align: 'left', label: 'Nro de cédula', field: row => row.persona.document, sortable: true },
        { name: 'phone', align: 'left', label: 'Nro de teléfono', field: row => row.persona.phone, sortable: true },
        { name: 'email', align: 'left', label: 'Correo', field: row => row.persona.email, sortable: true },
        { name: 'profession', align: 'left', label: 'Profesión', field: row => row.profession, sortable: true },
        { name: 'birthDate', align: 'left', label: 'Edad', field: row => row.persona.birthDate, sortable: true },
        { name: 'actions', align: 'left', label: 'Acciones'},
      ],
      modalAddValue: false
    }
  },
  computed:{
    auth() {
      return this.$store.getters["auth/getUserData"];
    },
    getAllTeacher() {
      return this.$store.getters["teachers/getAllT"];
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
    await this.getTeacher()
  },
  methods: {
    calcularEdad(fecha) {
        let hoy = new Date();
        let cumpleanos = new Date(fecha);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        let m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    },
    internalRolMethod(param){
      switch (param) {
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
    },
    async getTeacher(){
      try {
        await this.$store.dispatch('teachers/allTeachers')
      } catch (error) {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'positive', 
              position: 'top-right'
          })
      }
    },
    modalAdd(param, param2){
      if(param2 !== undefined){
        this.rowUpdate = param2
      }
      this.modalAddValue = param 
      if(param === false){
        this.rowUpdate = {}
      }
    }
  }
}
</script>
