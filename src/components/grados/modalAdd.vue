<template>
  <q-page>
    <q-dialog v-model="modalAddValue" full-width persistent>
        <q-card>
        <q-bar class="bg-indigo-1">
          <span class="text-center">{{ Object.entries(rowUpdate).length === 0 ? 'Registro de grado' : 'Edición de grado'  }} </span>
          <q-btn class="absolute-top-right" dense flat icon="close" @click="closeModal()">
            <q-tooltip content-class="bg-indigo">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
          <q-card-section class="row q-ma-sm">
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-input 
                :rules="[ val => val && val.length > 0 || 'Campo requerido']" 
                color="grey-3" 
                label-color="indigo" 
                outlined 
                dense
                v-model="grade.name" 
                label="Nombre *">
                <template v-slot:append>
                  <q-icon name="badge" color="indigo" />
                </template>
              </q-input>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-select 
                :rules="[ val => val || 'Campo requerido']"
                color="grey-3" 
                outlined
                dense
                label-color="indigo" 
                v-model="grade.id_section" 
                :options="optionsSection"
                option-value="id"
                option-label="name"
                emit-value
                map-options
                label="Sección *">
                <template v-slot:append>
                  <q-icon name="abc" color="indigo" />
                </template>
              </q-select>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-select 
                :rules="[ val => val || 'Campo requerido']"
                color="grey-3" 
                outlined
                dense
                label-color="indigo" 
                v-model="grade.id_teacher" 
                :options="optionsTeacher"
                option-value="id"
                option-label="name"
                emit-value
                map-options
                label="Docente *">
                <template v-slot:append>
                  <q-icon name="group" color="indigo" />
                </template>
              </q-select>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-select 
                :rules="[ val => val || 'Campo requerido']"
                color="grey-3" 
                outlined
                dense
                label-color="indigo" 
                v-model="grade.turn" 
                :options="optionsTurn"
                label="Turno *">
                <template v-slot:append>
                  <q-icon name="assignment_turned_in" color="indigo" />
                </template>
              </q-select>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-input 
                :rules="[ val => val && val.length > 0 || 'Campo requerido']"
                color="grey-3" 
                dense 
                label-color="indigo" 
                outlined 
                v-model="grade.amount_in_tuition" 
                mask="##"
                label="Cantidad en matrícula *">
                <template v-slot:append>
                  <q-icon name="looks_one" color="indigo" />
                </template>
              </q-input>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-input 
                :rules="[ val => val && val.length > 0 || 'Campo requerido']"
                color="grey-3" 
                dense 
                label-color="indigo" 
                outlined 
                v-model="grade.limit" 
                mask="##"
                label="Limite *">
                <template v-slot:append>
                  <q-icon name="looks_one" color="indigo" />
                </template>
              </q-input>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-select 
                :rules="[ val => val || 'Campo requerido']"
                color="grey-3" 
                outlined
                dense
                label-color="indigo" 
                v-model="grade.status" 
                :options="optionsStatus"
                label="Estatus *">
                <template v-slot:append>
                  <q-icon name="military_tech" color="indigo" />
                </template>
              </q-select>
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
      grade: {},
      regEmail: "",
      optionsTurn: [
        {
          label: 'Mañana',
          value: 'mañana' 
        },
        {
          label: 'Tarde',
          value: 'Tarde' 
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
    acceptedAge(){
      if(this.grade.type && this.grade.type.value === 'Student'){
        return 5
      }else if(this.grade.type && this.grade.type.value === 'Teacher'){
        return 18
      }else{
        return 18
      }
    },
    auth() {
      return this.$store.getters["auth/getgradeData"];
    },
    getAllgrade() {
      return this.$store.getters["auth/getAllgrade"];
    },
    optionsSection() {
      return this.$store.getters["sections/getAllS"]
    },
    optionsTeacher() {
      let teacher = this.$store.getters["teachers/getAllT"].map(item => {
        return {
          id: item.id,
          name: item.persona.name +' '+item.persona.surname
        }
      })
      return teacher
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
    await this.getSections()
    await this.getTeachers()
    if(Object.entries(this.rowUpdate).length !== 0){
      let status = {
        label: this.rowUpdate.status,
        value: this.rowUpdate.status
      }
      let turn = {
          label: this.rowUpdate.turn,
          value: this.rowUpdate.turn
      }
      this.grade = {
        name: this.rowUpdate.name,
        id_section: this.rowUpdate.id_section,
        id_teacher: this.rowUpdate.id_teacher,
        turn: turn,
        amount_in_tuition: this.rowUpdate.amount_in_tuition,
        limit: this.rowUpdate.limit.toString(),
        status:  status
      }
    }else{
      this.grade = {
        status: {
          label: 'Activo',
          value: 'Activo'
        }
      }
    }
  },
  methods: {
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
      this.grade = {}
      this.$emit('modalAdd', false)
    },
    async onSubmit(){
      try {
        let grade = {
          name: this.grade.name,
          id_section: this.grade.id_section,
          id_teacher: this.grade.id_teacher,
          turn: this.grade.turn.value,
          amount_in_tuition: parseFloat(this.grade.amount_in_tuition),
          limit: parseFloat(this.grade.limit),
          status: this.grade.status.value,
          id: Object.entries(this.rowUpdate).length === 0 ? '' : this.rowUpdate.id
        }
        //return false
        let dispatchDir = Object.entries(this.rowUpdate).length === 0 ? 'grades/registerGrade' : 'grades/editGrade' 
        await this.$store.dispatch(dispatchDir, grade)
        let message =  Object.entries(this.rowUpdate).length === 0 ? 'Grado creado' : 'Usuario Grado' 
        Notify.create(
            { message: message, 
              type: 'positive', 
              position: 'top-right'
          })
          this.closeModal()
          this.$emit('getGrades')
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
    async getTeachers(){
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
    async getSections(){
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
    }
  }
}
</script>
