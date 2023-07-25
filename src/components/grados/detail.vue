<template>
  <q-page>
    <q-dialog v-model="detailValue" full-width full-height persistent>
      <q-card>
        <q-bar class="bg-indigo-1">
          <span class="text-center">Información del Grado</span>
          <q-btn class="absolute-top-right" dense flat icon="close" @click="$emit('modalDetail', false)">
            <q-tooltip content-class="bg-indigo">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="row q-ma-sm">
          <div class="col-12 q-pa-sm text-indigo text-bold">
            <q-icon name="info" size="sm" color="indigo" /> Información general
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Nombre" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ rowUpdate.name }}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Turno" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ rowUpdate.turn }}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Docente" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  {{ rowUpdate.teacher.profession }}. {{ rowUpdate.teacher.persona.name }} {{ rowUpdate.teacher.persona.surname }}
                </div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Sección" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ rowUpdate.section.name }}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Descripción" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ rowUpdate.section.description }}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Status" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ rowUpdate.status }}</div>
              </template>
            </q-field>
          </div>
        </q-card-section>
        <q-card-section> 
          <div class="col-12 q-ma-sm text-indigo text-bold">
            <q-icon name="add" size="sm" color="indigo" /> Agregar Materias
            <q-select 
                :rules="[ val => val || 'Campo requerido']"
                color="grey-3" 
                outlined
                dense
                label-color="indigo" 
                v-model="id_subject" 
                :options="getSubjectAll"
                emit-value
                option-label="name"
                option-value="id"
                map-options
                @input="asignedMateria(id_subject, rowUpdate.id)"
                label="Asignar grado *">
                <template v-slot:append>
                  <q-icon name="grade" color="indigo" />
                </template>
            </q-select>
          </div>
          <q-markup-table class="q-ma-sm">
            <thead>
              <tr>
                <th class="text-left">Nombre</th>
                <th class="text-right">Descripción</th>
                <th class="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(materia, index) in materias" :key="index">
                <td class="text-left">{{ materia.subject.name }}</td>
                <td class="text-right">{{ materia.subject.description }}</td>
                <td class="text-right"></td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
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
    detailValue: {
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
      id_subject : null,
      infoSubjectGrade: null,
      user: {},  
    }
  },
  computed:{
    
    auth() {
      return this.$store.getters["auth/getUserData"];
    },
    getSubjectAll() {
      return this.$store.getters["subjects/getAllS"];
    },
    getAllGrades() {
      return this.$store.getters["grades/getAllGrades"];
    },
    materias(){
      return this.$store.getters["grades/getAllSubjectGrades"];
    },
    getGradeStudent() {
      return this.$store.getters["grades/getGradeStudent"];
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

    await this.getAllSubjects()
    /* await this.getGrades() */
    //await this.gradeStudent()
    await this.getAllSubjectsGrade()
    this.infoSubjectGrade = structuredClone(this.materias)
    let subjectsGrade = this.infoSubjectGrade.filter(item => item.id_grade === this.rowUpdate.id)
    this.infoSubjectGrade = subjectsGrade
  },
  methods: {
    async getAllSubjects(){
      try {
        await this.$store.dispatch('subjects/getSubjectAll')
      } catch (error) {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'positive', 
              position: 'top-right'
          })
      }
    },
    async getAllSubjectsGrade(){
      try {
        await this.$store.dispatch('grades/getSubjectGrades')
      } catch (error) {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'positive', 
              position: 'top-right'
          })
      }
    },
   async asignedMateria(id_subject, id_grade){
      let data = {
        id_subject: id_subject,
        id_grade: id_grade
      }
      try {
        await this.$store.dispatch('grades/gradeSubjectAsigned', data)
        //await this.gradeStudent()
        this.$emit('modalDetail', false)
        Notify.create(
            { message: "Materia asignado", 
              type: 'positive', 
              position: 'top-right'
          })
      } catch (error) {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'positive', 
              position: 'top-right'
          })
      }
    },
    async getGrades(){
      try {
        await this.$store.dispatch('grades/allGrades')
      } catch (error) {
          console.log(error)
          Notify.create(
            { message: err.message, 
              type: 'positive', 
              position: 'top-right'
          })
      }
    },
    async gradeStudent(){
      try {
        await this.$store.dispatch('grades/gradeStudent', this.rowData.id)
      } catch (error) {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'positive', 
              position: 'top-right'
          })
      }
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
    isValidEmail () {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(this.regEmail) || 'Correo inválido';
    },
    closeModal(){
      this.user = {}
      this.$emit('modalAdd', false)
    },
    
  }
}
</script>
