<template>
  <q-page class="flex flex-center">  
  <div class="q-pl-xl q-pr-xl q-pb-xl bg-blue-2" style="border-radius: 8px; width: 30vw;">
    <p class="text-h6 text-center q-pa-md text-primary">Acceso</p>
    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
      <q-input
        ref="email"
        standout
        dense
        type="email"
        bg-color="grey-2"
        input-class="text-black"
        v-model="user.email"
        label="Correo *"
        hint="Correo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor escriba su correo']"
      />

      <q-input
        ref="pass"
        standout
        type="password"
        dense
        bg-color="grey-2"
        input-class="text-black"
        v-model="user.password"
        label="Contraseña *"
        hint="Contraseña"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor escriba su contraseña']"
      />

      <div align="center">
        <q-btn padding="2px 52px 2px 52px" no-caps dense label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn padding="2px 52px 2px 52px" :loading="loading" no-caps dense label="Entrar" type="submit" color="primary" />
      </div>
    </form>
  </div>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'

export default {
  data () {
    return {
      name: null,
      age: null,   
      accept: false,
      loading: false,
      user: {}
    }
  },
  computed:{
    auth() {
      return this.$store.getters["auth/getUserData"];
    }
  },
  methods: {
   async onSubmit() {
      /* if (this.recordarme) {
        localStorage.setItem("username", this.user.username);
      } */
      this.loading = true
      try {
        this.loading = false
        await this.$store.dispatch("auth/loginUser", this.user)
        Notify.create(
          { message: 'Inicio de sesión exitoso', 
            type: 'positive', 
            position: 'top-right'
        })
        this.$RoutePush("/Inicio");
      } catch (error) {
        if(error.response.data.errors){
          Notify.create(
            { message: error.response.data.errors[0].msg, 
              type: 'negative', 
              position: 'top-right'
          })
        }else{
          Notify.create(
            { message: error.response.data.msg, 
              type: 'negative', 
              position: 'top-right'
          })
        }
        this.loading = false;
      }
    },
    onSubmitOld () {
      this.$refs.name.validate()
      this.$refs.age.validate()

      if (this.$refs.name.hasError || this.$refs.age.hasError) {
        this.formHasError = true
      }
      else if (this.accept !== true) {
        this.$q.notify({
          color: 'negative',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null

      this.$refs.name.resetValidation()
      this.$refs.age.resetValidation()
    }
  }
}
</script>