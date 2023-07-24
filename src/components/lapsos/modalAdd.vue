<template>
  <q-page>
    <q-dialog v-model="modalAddValue" full-width persistent>
        <q-card>
        <q-bar class="bg-indigo-1">
          <span class="text-center">{{ Object.entries(rowUpdate).length === 0 ? 'Registro de lapso' : 'Edición de lapso'  }} </span>
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
                v-model="lapse.name" 
                label="Nombre *">
                <template v-slot:append>
                  <q-icon name="badge" color="indigo" />
                </template>
              </q-input>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-input 
                :rules="[ val => val && val.length >  0 || 'Fecha no permitida']"
                color="grey-3" 
                dense 
                label-color="indigo" 
                outlined 
                v-model="lapse.start_date" 
                label="Fecha inicio *">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="lapse.start_date">
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
                :rules="[ val => val && val.length > 0 || 'Fecha no permitida']"
                color="grey-3" 
                dense 
                label-color="indigo" 
                outlined 
                v-model="lapse.end_date" 
                label="Fecha fin *">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="lapse.end_date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Cerrar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <!-- <div :style="Object.entries(rowUpdate).length !== 0 ? 'display:none;' : ''" class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
              <q-input 
                :rules="[ val => val && val.length > 0 || 'Campo requerido']"
                color="grey-3" 
                dense 
                label-color="indigo" 
                outlined 
                disable
                v-model="lapse.password" 
                label="Contraseña *">
                <template v-slot:append>
                  <q-icon name="password" color="indigo" />
                </template>
              </q-input>
            </div> -->
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

      lapse: {}
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
      this.lapse = {
        name: this.rowUpdate.name,
        start_date: this.rowUpdate.start_date,
        end_date: this.rowUpdate.end_date,
      }
    }else{
      this.lapse = {
        start_date: formattedString,
        end_date: formattedString,
      }
    }
  },
  methods: {
    closeModal(){
      this.lapse = {}
      this.$emit('modalAdd', false)
    },
    async onSubmit(){
      try {
        let lapse = {
          name: this.lapse.name,
          start_date: this.lapse.start_date,
          end_date: this.lapse.end_date,
          id: Object.entries(this.rowUpdate).length === 0 ? '' : this.rowUpdate.id,
        }
        let dispatchDir = Object.entries(this.rowUpdate).length === 0 ? 'lapses/registerLapse' : 'lapses/editLapse' 
        await this.$store.dispatch(dispatchDir, lapse)
        let message =  Object.entries(this.rowUpdate).length === 0 ? 'Lapso creado' : 'Lapso actualizado' 
        Notify.create(
            { message: message, 
              type: 'positive', 
              position: 'top-right'
          })
          this.closeModal()
          this.$emit('getLapses')
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
