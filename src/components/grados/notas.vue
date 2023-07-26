<template>
  <q-page>
    <q-dialog v-model="notasValue"  
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent>
      <q-card>
        <q-bar class="bg-indigo-1">
          <span class="text-center">Notas del grado</span>
          <q-space></q-space>
          <q-btn class="absolute-top-right" dense flat icon="close" @click="$emit('modalNotas', false)">
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

          <div class="row q-pl-md q-pr-md">
          <!-- <q-scroll-area class="col" style="height: 700px; max-width: 50%;">
            <q-markup-table class="q-ma-sm">
              <thead>
                <tr>
                  <th colspan="5">
                    <div class="row no-wrap items-center">
                      <div class="text-h6">Materias</div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th class="text-left">Nombre</th>
                  <th class="text-right">Descripción</th>
                  <th class="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(materia, index) in infoSubjectGrade" :key="index">
                  <td class="text-left">{{ materia.subject.name }}</td>
                  <td class="text-right">{{ materia.subject.description }}</td>
                  <td class="text-right">
                    <q-btn @click="removeSubject(materia.id)" icon="delete" size="sm" color="indigo" padding="none" rounded dense flat></q-btn>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-scroll-area> -->
          <q-scroll-area class="col" style="height: 700px; max-width: 100%;">
            <q-markup-table class="q-ma-sm">
              <thead>
                <tr>
                  <th colspan="5">
                    <div class="row no-wrap items-center">
                      <div class="text-h6">Relación de notas</div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th class="text-left">Nombres</th>
                  <th class="text-left">Apellidos</th>
                  <th class="text-right">Lapso</th>
                  <th class="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in infoStudentGrade" :key="index">
                  <td class="text-left">{{ student.student.persona.name }}</td>
                  <td class="text-left">{{ student.student.persona.surname }}</td>
                  <td class="text-right">
                  <q-select 
                        :rules="[ val => val || 'Campo requerido']"
                        color="grey-3" 
                        outlined
                        dense
                        label-color="indigo" 
                        v-model="grade" 
                        :options="getAllLapses"
                        label="lapso *">
                        <template v-slot:append>
                          <q-icon name="assignment_turned_in" color="indigo" />
                        </template>
                      </q-select>
                  </td>
                  <td class="text-right">
                    <q-btn @click="removeStudent(student.id)" icon="delete" size="sm" color="indigo" padding="none" rounded dense flat></q-btn>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-scroll-area>
          </div>
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
    notasValue: {
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
      maximizedToggle: true,
      id_subject : null,
      id_student: null,
      infoSubjectGrade: null,
      infoStudentGrade: null,
      user: {}, 
      relationsNotes: []
    }
  },
  computed:{
    
    auth() {
      return this.$store.getters["auth/getUserData"];
    },
    getSubjectAll() {
      return this.$store.getters["subjects/getAllS"];
    },
    getStudentAll() {
      let result = this.$store.getters["students/getAllStu"].map(item => {
        return {
          id: item.id,
          name: item.persona.name+" "+item.persona.surname
        }
      })
      return result
    },
    getAllGrades() {
      return this.$store.getters["grades/getAllGrades"];
    },
    materias(){
      return this.$store.getters["grades/getAllSubjectGrades"];
    },
    grados(){
      return this.$store.getters["grades/getAllStudentsGrades"];
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
    },
    getAllLapses() {
      return this.$store.getters["lapses/getAllLapses"];
    }
  },
  async created(){
    await this.getLapses()
    await this.getAllSubjects()
    await this.getAllStudents()
    await this.getAllSubjectsGrade()
    await this.getAllStudentsGrade()
    //this.relationsNotes
    /* this.infoStudentGrade.map(item => {
      return {
        id_student: item.id,
        
      }
    }) */
  },
  methods: {
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
    removeSubject(param) {
      this.$q.dialog({
        title: 'Eliminar materia del grado',
        message: '¿Quiere eliminar este elemento?',
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
    removeStudent(param) {
      this.$q.dialog({
        title: 'Eliminar estudiante del grado',
        message: '¿Quiere eliminar este elemento?',
        cancel: true,
        persistent: false,
        className: 'dialog-bg-red text-white'
      }).onOk(() => {
      }).onOk(() => {
        this.deleteConfirmStudent(param)
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    async deleteConfirmStudent(param) {
      await this.$store.dispatch('grades/deleteStudentGrade', param)
        .then((resp) => {
          Notify.create(
            { message: 'Estudiante eliminado.', 
              type: 'positive', 
              position: 'top-right'
          })
          this.getAllStudentsGrade()
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
    async deleteConfirm(param) {
      await this.$store.dispatch('grades/deleteSubjectGrade', param)
        .then((resp) => {
          Notify.create(
            { message: 'Materia eliminada.', 
              type: 'positive', 
              position: 'top-right'
          })
          this.getAllSubjectsGrade()
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
    async getAllStudents(){
      try {
        await this.$store.dispatch('students/allStudents')
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
        this.infoSubjectGrade = structuredClone(this.materias)
        let subjectsGrade = this.infoSubjectGrade.filter(item => item.id_grade === this.rowUpdate.id)
        this.infoSubjectGrade = subjectsGrade
        this.id_subject = null
      } catch (error) {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'positive', 
              position: 'top-right'
          })
      }
    },
    async getAllStudentsGrade(){
      try {
        await this.$store.dispatch('grades/getStudentsGrades')
        this.infoStudentGrade = structuredClone(this.grados)
        let studentsGrade = this.infoStudentGrade.filter(item => item.id_grade === this.rowUpdate.id)
        this.infoStudentGrade = studentsGrade
        this.id_subject = null
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
    if(this.infoSubjectGrade && this.infoSubjectGrade.find(item => item.id_subject === id_subject)){
      Notify.create(
        { message: "Materia ya asignada", 
          type: 'negative', 
          position: 'top-right'
      })
      return false
    }  
    let data = {
        id_subject: id_subject,
        id_grade: id_grade
      }
      try {
        await this.$store.dispatch('grades/gradeSubjectAsigned', data)
        this.getAllSubjectsGrade()
        Notify.create(
            { message: "Materia asignada", 
              type: 'positive', 
              position: 'top-right'
          })
      } catch (error) {
          error.map(item => {
            Notify.create(
              { message: item.msg, 
                type: 'negative', 
                position: 'top-right'
            })
          })
      }
    },
    async asignedEstudiante(id_student, id_grade){
      if(this.infoStudentGrade && this.infoStudentGrade.find(item => item.id_student === id_student)){
      Notify.create(
        { message: "Estudiante ya asignado", 
          type: 'negative', 
          position: 'top-right'
      })
        return false
      }  
      let data = {
          id_student: id_student,
          id_grade: id_grade
        }
        try {
          await this.$store.dispatch('grades/gradeStudentAsigned', data)
          this.getAllStudentsGrade()
          Notify.create(
              { message: "Estudiante asignado", 
                type: 'positive', 
                position: 'top-right'
            })
        } catch (error) {
            error.map(item => {
              Notify.create(
                { message: item.msg, 
                  type: 'negative', 
                  position: 'top-right'
              })
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
