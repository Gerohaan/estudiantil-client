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
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
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
        </div>
      </div>
      <q-page-sticky position="top-right" :offset="[18, 68]">
        <q-btn type="submit" fab icon="edit" size="xs" color="indigo" @click="changeInfo = !changeInfo"/>
      </q-page-sticky>
    </q-form>
    </section>
  </q-page>
</template>

<script>
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
      changeInfo: false,
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
    auth() {
      return this.$store.getters["auth/getUserData"];
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
  created(){
    
  }
}
</script>
