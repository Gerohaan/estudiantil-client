<template>
  <q-page>
    <q-dialog v-model="modalDetailValue" full-width persistent>
      <q-card>
        <q-bar class="bg-indigo-1">
          <span class="text-center">Estudiante {{ rowData.persona.name }} {{ rowData.persona.surname  }}</span>
          <q-btn class="absolute-top-right" dense flat icon="close" @click="$emit('modalDetail', false)">
            <q-tooltip content-class="bg-indigo">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="row q-ma-sm">
          <div class="col-12 q-pa-sm text-indigo text-bold">
            <q-icon name="info" size="sm" color="indigo" /> Información general
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Correo" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{rowData.persona.email}}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Teléfono" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{rowData.persona.phone}}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Género" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{rowData.persona.gender}}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Edad" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{calcularEdad(rowData.persona.birthDate)}}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Nro de Identificación" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{rowData.persona.document}}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Status" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{rowData.status}}</div>
              </template>
            </q-field>
          </div>
        </q-card-section>
        <q-card-section v-if="getGradeStudent !== null" class="row q-ma-sm">
          <div class="col-12 q-pa-sm text-indigo text-bold">
            <q-icon name="info" size="sm" color="indigo" /> Grado
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Grado" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control> 
                <div class="self-center full-width no-outline" tabindex="0">{{ infoGradeStudent.grade.name }}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Turno" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control> 
                <div class="self-center full-width no-outline" tabindex="0">{{ infoGradeStudent.grade.turn }}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Sección" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control> 
                <div class="self-center full-width no-outline" tabindex="0">{{ infoGradeStudent.grade.section.name }}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Docente" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control> 
                <div class="self-center full-width no-outline" tabindex="0">{{ infoGradeStudent.grade.teacher.profession }}. {{ infoGradeStudent.grade.teacher.persona.name }} {{ infoGradeStudent.grade.teacher.persona.surname }}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Matrícula" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control> 
                <div class="self-center full-width no-outline" tabindex="0">{{ infoGradeStudent.grade.amount_in_tuition }}</div>
              </template>
            </q-field>
          </div>
          <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
            <q-field dense color="grey-3" label-color="indigo" outlined label="Limite permitido" stack-label>
              <template v-slot:append>
                <q-icon name="badge" color="indigo" />
              </template>
              <template v-slot:control> 
                <div class="self-center full-width no-outline" tabindex="0">{{ infoGradeStudent.grade.limit }}</div>
              </template>
            </q-field>
          </div>
        </q-card-section>
        <q-card-section v-else> 
          <div class="col-6 q-pa-sm text-indigo text-bold">
            <q-icon name="add" size="sm" color="indigo" /> Agregar Grado
            <q-select 
                :rules="[ val => val || 'Campo requerido']"
                color="grey-3" 
                outlined
                dense
                label-color="indigo" 
                v-model="id_grade" 
                :options="getAllGrades"
                emit-value
                option-label="name"
                option-value="id"
                map-options
                @input="asignedGrade(id_grade, rowData.id)"
                label="Asignar grado *">
                <template v-slot:append>
                  <q-icon name="grade" color="indigo" />
                </template>
            </q-select>
          </div>
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
    modalDetailValue: {
      type: Boolean,
      required: true
    },
    rowData: {
      type: Object,
      required: false
    },

  },
  data(){
    return {
      id_grade : null,
      infoGradeStudent: null,
      user: {},
      regEmail: "",
      optionsGender: [
        {
          label: 'Masculino',
          value: 'M' 
        },
        {
          label: 'Femenino',
          value: 'F' 
        }
      ],
      optionsStatus: [
        {
          label: 'Activo',
          value: 'Activo'
        },
        {
          label: 'Inactivo',
          value: 'Inactivo'
        }
      ],
      optionsType: [
        {
          label: 'Administrador',
          value: 'Admin'
        },
        {
          label: 'Docente',
          value: 'Teacher'
        },
        {
          label: 'Estudiante',
          value: 'Student'
        }
      ],
    }
  },
  computed:{
    
    auth() {
      return this.$store.getters["auth/getUserData"];
    },
    getAllGrades() {
      return this.$store.getters["grades/getAllGrades"];
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
    await this.getGrades()
    await this.gradeStudent()
    this.infoGradeStudent = structuredClone(this.getGradeStudent)
  },
  methods: {
   async asignedGrade(id_grade, id_student){
      let data = {
        id_grade: id_grade,
        id_student: id_student
      }
      try {
        await this.$store.dispatch('grades/gradeStudentAsigned', data)
        //await this.gradeStudent()
        this.$emit('modalDetail', false)
        Notify.create(
            { message: "Grado asignado", 
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
          console.log(err)
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
