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
            <p class="text-bold"><q-icon name="date_range" size="sm" color="primary"></q-icon>Listado de lapsos</p>      
        </div>
      </div>
      <div class="row">
        <div class="col-12 q-pa-xs">
          <q-table
            title=""
            :data="getAllLapses"
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
              <q-tr :props="props">
                <q-td key="name" :props="props">
                  {{ props.row.name }}
                </q-td>
                <q-td key="start_date" :props="props">
                  {{ props.row.start_date }}
                </q-td>
                <q-td key="end_date" :props="props">
                  {{ props.row.end_date }}
                </q-td>
                <q-td key="actions" :props="props">
                  <q-btn @click="modalAdd(true, props.row)" dense padding="none" color="indigo" flat icon="edit"></q-btn>
                  <q-btn @click="deleteLapse(props.row.id)" dense padding="none" color="indigo" flat icon="delete"></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
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
      @getLapses="getLapses"
      :rowUpdate="rowUpdate" 
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
      filter: '',
      rowUpdate: {},
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 15
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        { name: 'name', align: 'left', label: 'Nombre', field: row => row.name, sortable: true },
        { name: 'start_date', align: 'left', label: 'Fecha inicial', field: row => row.start_date, sortable: true },
        { name: 'end_date', align: 'left', label: 'Fecha final', field: row => row.end_date, sortable: true },
        { name: 'actions', align: 'left', label: 'Acciones'}
      ],
      modalAddValue: false
    }
  },
  computed:{
    auth() {
      return this.$store.getters["auth/getUserData"];
    },
    getAllLapses() {
      return this.$store.getters["lapses/getAllLapses"];
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
    await this.getLapses()
  },
  methods: {
    deleteLapse(param) {
      this.$q.dialog({
        title: 'Eliminar lapso',
        message: '¿Quiere eliminar este lapso?',
        cancel: true,
        persistent: false,
        className: 'dialog-bg-red text-white'
      }).onOk(() => {
      }).onOk(() => {
        this.deleteConfirm(param)
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    deleteConfirm(param) {
      this.$store.dispatch('lapses/deletes', param)
        .then((resp) => {
          Notify.create(
            { message: 'Lapso eliminado.', 
              type: 'positive', 
              position: 'top-right'
          })
          this.getLapses()
        })
        .catch((err) => {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'negative', 
              position: 'top-right'
          })
        })
    },
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
    async getLapses(){
      try {
        await this.$store.dispatch('lapses/getLapsesAll')
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
