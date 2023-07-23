<template>
  <q-page>
    <q-dialog v-model="modalAddValue" full-width persistent>
        <q-card>
        <q-bar class="bg-indigo-1">
          <span class="text-center">Registro de usuario</span>
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
                v-model="user.name" 
                label="Nombres *">
                <template v-slot:append>
                  <q-icon name="badge" color="indigo" />
                </template>
              </q-input>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-input 
                :rules="[ val => val && val.length > 0 || 'Campo requerido']"
                color="grey-3"  
                label-color="indigo" 
                outlined 
                dense
                v-model="user.surname" 
                label="Apellidos *">
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
                v-model="user.gender" 
                :options="optionsGender"
                label="Género *">
                <template v-slot:append>
                  <q-icon name="transgender" color="indigo" />
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
                v-model="user.document" 
                mask="########"
                label="Nro de cédula *">
                <template v-slot:append>
                  <q-icon name="assignment_ind" color="indigo" />
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
                v-model="user.phone" 
                mask="(####) ### - ####"
                label="Nro de teléfono *">
                <template v-slot:append>
                  <q-icon name="contact_phone" color="indigo" />
                </template>
              </q-input>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-input 
                type="email"
                :rules="[val => !!val || 'Campo requerido', isValidEmail()]"
                color="grey-3" 
                dense 
                label-color="indigo" 
                outlined 
                v-model="user.email" 
                label="Correo *">
                <template v-slot:append>
                  <q-icon name="alternate_email" color="indigo" />
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
                v-model="user.type" 
                :options="optionsType"
                label="Tipo *">
                <template v-slot:append>
                  <q-icon name="settings_accessibility" color="indigo" />
                </template>
              </q-select>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-select 
                :rules="[ val => val || 'Campo requerido']"
                color="grey-3" 
                outlined
                dense
                disable
                label-color="indigo" 
                v-model="user.status" 
                :options="optionsStatus"
                label="Status *">
                <template v-slot:append>
                  <q-icon name="recent_actors" color="indigo" />
                </template>
              </q-select>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-input 
                :rules="[ val => val && calcularEdad(val) > 6|| 'Fecha de nacimiento no permitida']"
                color="grey-3" 
                dense 
                label-color="indigo" 
                outlined 
                v-model="user.birthDate" 
                label="Fecha de nacimiento *">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="user.birthDate">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Cerrar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
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
                disable
                v-model="user.password" 
                label="Contraseña *">
                <template v-slot:append>
                  <q-icon name="password" color="indigo" />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="q-ma-sm bg-white text-indigo">
            <q-btn type="submit" padding="2px 22px 2px 22px" outline dense no-caps label="Agregar"/>
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

  },
  data(){
    return {

      user: {
        birthDate: formattedString,
        status: {
          label: 'Activo',
          value: 'Activo'
        },
        password: '1234'
      },
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
    isValidEmail () {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(this.regEmail) || 'Correo inválido';
    },
    closeModal(){
      this.user = {}
      this.$emit('modalAdd', false)
    },
    async onSubmit(){
      try {
        let user = {
          birthDate: this.user.birthDate,
          status: this.user.status.value,
          password: this.user.password,
          name: this.user.name,
          surname: this.user.surname,
          gender: this.user.gender.value,
          document: this.user.document,
          phone: this.user.phone,
          email: this.user.email,
          type: this.user.type.value,
        }
        await this.$store.dispatch('auth/registerUser', user)
          Notify.create(
            { message: "Usuario creado", 
              type: 'positive', 
              position: 'top-right'
          })
          this.user = {}
          this.closeModal()
          this.$emit('getUsers')
      } catch (error) {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'negative', 
              position: 'top-right'
          })
      }
    }
  }
}
</script>
