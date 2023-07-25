<template>
  <q-page>
    <section>
      <q-form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="">
      <div class="row q-mt-lg">
        <div class="col-12 q-pt-md">
          <p class="text-h6 text-center">¡Hola {{ internalRol }}!</p>         
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-left q-pa-xs">
            <p class="text-bold"><q-icon name="info" size="sm" color="primary"></q-icon>  Información general</p>      
        </div>
      </div>
      <div class="row">
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-input
            :disable="!changeInfo" 
            :rules="[ val => val && val.length > 0 || 'Campo requerido']" 
            color="grey-3" 
            label-color="indigo" 
            outlined 
            v-model="auth.persona.name" 
            label="Nombres *">
            <template v-slot:append>
              <q-icon name="badge" color="indigo" />
            </template>
          </q-input>
        </div>
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-input
            :disable="!changeInfo" 
            :rules="[ val => val && val.length > 0 || 'Campo requerido']" 
            color="grey-3" 
            label-color="indigo" 
            outlined 
            v-model="auth.persona.surname" 
            label="Apellidos *">
            <template v-slot:append>
              <q-icon name="badge" color="indigo" />
            </template>
          </q-input>
        </div>
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-input
            :disable="!changeInfo" 
            :rules="[ val => val && val.length > 0 || 'Campo requerido']" 
            color="grey-3" 
            label-color="indigo" 
            outlined 
            v-model="auth.persona.document" 
            label="Cédula de identidad Nro *">
            <template v-slot:append>
              <q-icon name="assignment_ind" color="indigo" />
            </template>
          </q-input>
        </div>
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-input
            :disable="!changeInfo" 
            :rules="[ val => val && val.length > 0 || 'Campo requerido']" 
            color="grey-3" 
            label-color="indigo" 
            outlined 
            v-model="auth.persona.phone" 
            label="Número de teléfono *">
            <template v-slot:append>
              <q-icon name="contact_phone" color="indigo" />
            </template>
          </q-input>
        </div>
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-input
            :disable="!changeInfo" 
            :rules="[ val => val && val.length > 0 || 'Campo requerido']" 
            color="grey-3" 
            label-color="indigo" 
            outlined 
            v-model="auth.persona.email" 
            label="Correo *">
            <template v-slot:append>
              <q-icon name="alternate_email" color="indigo" />
            </template>
          </q-input>
        </div>
        <!-- <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-select 
            :disable="!changeInfo"
            :rules="[ val => val || 'Campo requerido']"
            color="grey-3" 
            outlined
            label-color="indigo" 
            v-model="auth.persona.gender" 
            :options="genderView"
            map-options
            option-label="label"
            option-value="value"
            emit-value
            label="Género *">
            <template v-slot:append>
              <q-icon name="transgender" color="indigo" />
            </template>
          </q-select>
        </div> -->
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-input 
            :disable="!changeInfo"
            :rules="[ val => val && calcularEdad(val) >= acceptedAge || 'Fecha de nacimiento no permitida']"
            color="grey-3"  
            label-color="indigo" 
            outlined 
            v-model="auth.persona.birthDate" 
            label="Fecha de nacimiento *">
            <template v-slot:append>
              <q-icon name="event" color="indigo" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="auth.persona.birthDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-input 
            :disable="!changeInfo"
            color="grey-3" 
            label-color="indigo" 
            outlined 
            v-model="authPass" 
            label="Contraseña ">
            <template v-slot:append>
              <q-icon name="password" color="indigo" />
            </template>
          </q-input>
        </div>
      </div>
      <q-page-sticky position="top-right" :offset="[18, 68]">
        <q-btn type="submit" fab :icon="changeInfo ? 'send' : 'edit'" size="xs" color="indigo" @click="changeInfo = !changeInfo"/>
      </q-page-sticky>
    </q-form>
    </section>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
export default {
  name: 'index',
  props: {
    /* title: {
      type: String,
      required: true
    }, */

  },
  data(){
    return {
      auth: {},
      changeInfo: false,
      authPass: null,
      genderView: [ 
        {
          label: 'Masculino',
          value: 'M' 
        },
        {
          label: 'Femenino',
          value: 'F' 
        }
      ]
    }
  },
  watch: {
    changeInfo(newValue, oldValue){

    }
  },
  computed:{
    infoUser() {
      //this.infoUser = [] 
      return this.$store.getters["auth/getUserData"];
    },
    acceptedAge(){
      if(this.auth.type && this.auth.type === 'Student'){
        return 5
      }else if(this.auth.type && this.auth.type === 'Teacher'){
        return 18
      }else{
        return 18
      }
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
    async onSubmit(){
      Notify.create(
        { message: 'Funcionalidad en mantenimiento', 
          type: 'negative', 
          position: 'top-right'
      })
      return false
      if(!this.changeInfo){
        let user = {
          birthDate: this.auth.persona.birthDate,
          password: this.authPass === null ? this.auth.password : this.authPass,
          name: this.auth.persona.name,
          surname: this.auth.persona.surname,
          gender: this.auth.persona.gender,
          document: this.auth.persona.document,
          phone: this.auth.persona.phone,
          email: this.auth.persona.email,
          id:this.auth.id,
          id_person: this.auth.persona.id
        }
        try { 
        await this.$store.dispatch('auth/editProfiles', user)
        let message =  'Perfil actualizado' 
        Notify.create(
            { message: message, 
              type: 'positive', 
              position: 'top-right'
          })
          this.closeModal()
          this.$emit('getUsers')
      } catch (error) {
        console.log(error)
          console.log(error.errors)
          error.errors.map(item => {
            Notify.create(
              { message: item.msg, 
                type: 'negative', 
                position: 'top-right'
            })
          })
      }
      }else{
        return false
      }
    }
  },
  created(){
    
    this.auth = structuredClone(this.infoUser)  
  }
}
</script>
