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
            <p class="text-bold"><q-icon name="history_edu" size="sm" color="primary"></q-icon>  Listado de grados</p>      
        </div>
      </div>
      <div class="row">
        <div class="col-12 q-pa-xs">
          <q-table
            title=""
            :data="getAllGrades"
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
              <q-tr :props="props" v-if="internalRol === 'Administrador' || auth.persona.id === props.row.teacher.persona.id">
                <q-td key="name" :props="props">
                  {{ props.row.name }}
                </q-td>
                <q-td key="section" :props="props">
                  {{ props.row.section.name }}
                </q-td>
                <q-td key="teacher" :props="props">
                  {{ props.row.teacher.profession +" "+props.row.teacher.persona.name+" "+props.row.teacher.persona.surname }}
                </q-td>
                <q-td key="turn" :props="props">
                  {{ props.row.turn }}
                </q-td>
                <q-td key="amount_in_tuition" :props="props">
                  {{ props.row.amount_in_tuition }}
                </q-td>
                <q-td key="limit" :props="props">
                  {{ props.row.limit }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ props.row.status }}
                </q-td>
                <q-td key="actions" :props="props">
                  <q-btn disable @click="modalNotas(true, props.row)" dense  color="indigo" flat icon="format_list_bulleted"></q-btn>
                  <q-btn @click="modalDetail(true, props.row)" dense  color="indigo" flat icon="person_search"></q-btn>
                  <q-btn :disable="internalRol !== 'Administrador'" @click="modalAdd(true, props.row)" dense  color="indigo" flat icon="edit"></q-btn>
                  <q-btn :disable="internalRol !== 'Administrador'" @click="removeGrade(props.row.id)" dense  color="indigo" flat icon="delete"></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <q-page-sticky v-if="internalRol === 'Administrador'" position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="indigo" @click="modalAdd(true)"/>
      </q-page-sticky>
    </section>
    <modal-add
      v-if="modalAddValue"
      :modalAddValue="modalAddValue"
      @modalAdd="modalAdd"
      @getGrades="getGrades"
      :rowUpdate="rowUpdate" 
    ></modal-add>
    <detail
      v-if="detailValue"
      :detailValue="detailValue"
      @modalDetail="modalDetail"
      @getGrades="getGrades"
      :rowUpdate="rowUpdate" 
    ></detail>
    <notas
      v-if="notasValue"
      :notasValue="notasValue"
      @modalNotas="modalNotas"
      @getGrades="getGrades"
      :rowUpdate="rowUpdate" 
    ></notas>
  </q-page>
</template>

<script>
import { Dialog } from 'quasar'
import { Notify } from 'quasar'
import modalAdd from './modalAdd.vue'
import detail from './detail.vue'
import notas from './notas.vue'

export default {
  name: 'index',
  components: {
    modalAdd,
    detail,
    notas
  },
  props: {
    /* title: {
      type: String,
      required: true
    }, */

  },
  data(){
    return {
      detailValue: false,
      notasValue: false,
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
        {
          name: 'name',
          required: true,
          label: 'Grado',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'section', align: 'left', label: 'Sección', field: row => row.section.name, sortable: true },
        { name: 'teacher', align: 'left', label: 'Docente', field: row => {
          return row.teacher.profession +" "+row.teacher.persona.name+" "+row.teacher.persona.surname
        }, sortable: true },
        { name: 'turn', align: 'left', label: 'Turno', field: row => row.turn, sortable: true },
        { name: 'amount_in_tuition', align: 'left', label: 'Cantidad en matrícula', field: row => row.amount_in_tuition, sortable: true },
        { name: 'limit', align: 'left', label: 'Limite', field: row => row.limit, sortable: true },
        { name: 'status', align: 'left', label: 'Estatus', field: row => row.status, sortable: true },
        { name: 'actions', align: 'left', label: 'Acciones'},
      ],
      modalAddValue: false
    }
  },
  computed:{
    auth() {
      return this.$store.getters["auth/getUserData"];
    },
    getAllGrades() {
      return this.$store.getters["grades/getAllGrades"];
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
    await this.getGrades()
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
    removeGrade(param) {
      this.$q.dialog({
        title: 'Eliminar grado',
        message: '¿Quiere eliminar este grado?',
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
      this.$store.dispatch('grades/deletes', param)
        .then((resp) => {
          Notify.create(
            { message: 'Grado eliminado.', 
              type: 'positive', 
              position: 'top-right'
          })
          this.getGrades()
        })
        .catch((err) => {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'positive', 
              position: 'top-right'
          })
        })
    },
    async getGrades(){
      try {
        await this.$store.dispatch('grades/allGrades')
      } catch (error) {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'positive', 
              position: 'top-right'
          })
      }
    },
    modalDetail(param, param2){
      if(param2 !== undefined){
        this.rowUpdate = param2
      }
      this.detailValue = param 
      if(param === false){
        this.rowUpdate = {}
      }
    },
    modalNotas(param, param2){
      if(param2 !== undefined){
        this.rowUpdate = param2
      }
      this.notasValue = param 
      if(param === false){
        this.rowUpdate = {}
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
