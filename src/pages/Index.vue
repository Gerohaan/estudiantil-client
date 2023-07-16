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
        v-model="name"
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
        v-model="name"
        label="Contraseña *"
        hint="Contraseña"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor escriba su contraseña']"
      />

      <div align="center">
        <q-btn padding="2px 52px 2px 52px" no-caps dense label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn padding="2px 52px 2px 52px" no-caps dense label="Entrar" type="submit" color="primary" />
      </div>
    </form>
  </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      name: null,
      age: null,

      accept: false
    }
  },

  methods: {
    onSubmit () {
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