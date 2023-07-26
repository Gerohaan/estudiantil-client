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
            <p class="text-bold"><q-icon name="abc" size="sm" color="primary"></q-icon>Listado de secciones</p>      
        </div>
      </div>
      <div class="row">
        <div class="col-12 q-pa-xs">
          <q-table
            title=""
            :data="getSectionsAll"
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
                <q-td key="description" :props="props">
                  {{ props.row.description }}
                </q-td>
                <q-td key="actions" align="center" class="" :props="props">
                  <q-btn :disable="internalRol !== 'Administrador'" @click="modalAdd(true, props.row)" dense padding="none" color="indigo" flat icon="edit"></q-btn>
                  <q-btn :disable="internalRol !== 'Administrador'" @click="deleteSection(props.row.id)" dense padding="none" color="indigo" flat icon="delete"></q-btn>
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
      @getAllSections="getAllSections"
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
        { name: 'description', align: 'left', label: 'Descripción', field: row => row.description, sortable: true },
        { name: 'actions', align: 'rigth', label: 'Acciones'}
      ],
      modalAddValue: false
    }
  },
  computed:{
    auth() {
      return this.$store.getters["auth/getUserData"];
    },
    getSectionsAll() {
      return this.$store.getters["sections/getAllS"];
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
    await this.getAllSections()
  },
  methods: {
    deleteSection(param) {
      this.$q.dialog({
        title: 'Eliminar sección',
        message: '¿Quiere eliminar esta sección?',
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
      this.$store.dispatch('sections/deletes', param)
        .then((resp) => {
          Notify.create(
            { message: 'Sección eliminada.', 
              type: 'positive', 
              position: 'top-right'
          })
          this.getAllSections()
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
    async getAllSections(){
      try {
        await this.$store.dispatch('sections/getSectionsAll')
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
