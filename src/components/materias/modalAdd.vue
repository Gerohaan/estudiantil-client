<template>
  <q-page>
    <q-dialog v-model="modalAddValue" full-width persistent>
        <q-card>
        <q-bar class="bg-indigo-1">
          <span class="text-center">{{ Object.entries(rowUpdate).length === 0 ? 'Registro de materia' : 'Edición de materia'  }} </span>
          <q-btn class="absolute-top-right" dense flat icon="close" @click="closeModal()">
            <q-tooltip content-class="bg-indigo">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
          <q-card-section class="row q-ma-sm">
            <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
              <q-input 
                :rules="[ val => val && val.length > 0 || 'Campo requerido']" 
                color="grey-3" 
                label-color="indigo" 
                outlined 
                dense
                v-model="section.name" 
                label="Nombre *">
                <template v-slot:append>
                  <q-icon name="badge" color="indigo" />
                </template>
              </q-input>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
              <q-input 
                :rules="[ val => val && val.length > 0 || 'Campo requerido']" 
                color="grey-3" 
                label-color="indigo" 
                outlined 
                dense
                v-model="section.description" 
                label="Descripción *">
                <template v-slot:append>
                  <q-icon name="badge" color="indigo" />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="q-ma-sm bg-white text-indigo">
            <q-btn 
              type="submit" 
              padding="2px 22px 2px 22px" 
              outline 
              dense 
              no-caps 
              :label="Object.entries(rowUpdate).length === 0 ? 'Agregar' : 'Editar'"
              />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { Dialog } from 'quasar'
import { Notify } from 'quasar'

import { date } from 'quasar'
const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD')

export default {
  name: 'add',
  props: {
    modalAddValue: {
      type: Boolean,
      required: true
    },
    rowUpdate: {
      type: Object,
      required: false
    },

  },
  data(){
    return {

      section: {}
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
    if(Object.entries(this.rowUpdate).length !== 0){
      this.section = {
        name: this.rowUpdate.name,
        description: this.rowUpdate.description
      }
    }else{
      this.section = {
        name: '',
        description: '',
      }
    }
  },
  methods: {
    closeModal(){
      this.section = {}
      this.$emit('modalAdd', false)
    },
    async onSubmit(){
      try {
        let section = {
          name: this.section.name,
          description: this.section.description,
          id: Object.entries(this.rowUpdate).length === 0 ? '' : this.rowUpdate.id,
        }
        let dispatchDir = Object.entries(this.rowUpdate).length === 0 ? 'subjects/registerS' : 'subjects/editS' 
        await this.$store.dispatch(dispatchDir, section)
        let message =  Object.entries(this.rowUpdate).length === 0 ? 'Materia creada' : 'Materia actualizada' 
        Notify.create(
            { message: message, 
              type: 'positive', 
              position: 'top-right'
          })
          this.closeModal()
          this.$emit('getAllSubjects')
      } catch (error) {
          console.log(error)
          Notify.create(
            { message: error.message, 
              type: 'negative', 
              position: 'top-right'
          })
      }
    }
  }
}
</script>
