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
            <p class="text-bold"><q-icon name="info" size="sm" color="primary"></q-icon>  Información general</p>      
        </div>
      </div>
      <div class="row">
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-field color="grey-3" label-color="indigo" outlined label="Nombres" stack-label>
            <template v-slot:append>
              <q-icon name="badge" color="indigo" />
            </template>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{auth.persona.name}}</div>
            </template>
          </q-field>
        </div>
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-field color="grey-3" label-color="indigo" outlined label="Apellidos" stack-label>
            <template v-slot:append>
              <q-icon name="badge" color="indigo" />
            </template>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{auth.persona.surname}}</div>
            </template>
          </q-field>
        </div>
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-field color="grey-3" label-color="indigo" outlined label="Cédula de identidad Nro" stack-label>
            <template v-slot:append>
              <q-icon name="assignment_ind" color="indigo" />
            </template>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{auth.persona.document}}</div>
            </template>
          </q-field>
        </div>
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-field color="grey-3" label-color="indigo" outlined label="Número de teléfono" stack-label>
            <template v-slot:append>
              <q-icon name="contact_phone" color="indigo" />
            </template>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{auth.persona.phone}}</div>
            </template>
          </q-field>
        </div>
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-field color="grey-3" label-color="indigo" outlined label="Correo" stack-label>
            <template v-slot:append>
              <q-icon name="alternate_email" color="indigo" />
            </template>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{auth.persona.email}}</div>
            </template>
          </q-field>
        </div>
        <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
          <q-field color="grey-3" label-color="indigo" outlined label="Género" stack-label>
            <template v-slot:append>
              <q-icon :name="auth.persona.gender === 'F' ? 'woman_2' : 'man_4'" color="indigo" />
            </template>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{auth.persona.gender === 'M' ? 'Masculino' : 'Femenino' }}</div>
            </template>
          </q-field>
        </div>
      </div>
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
    console.log(process.env.API_URL)
  }
}
</script>
