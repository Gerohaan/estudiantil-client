<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          U.E Herminio Leon Colmenarez
        </q-toolbar-title>

        <div>v 1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="200"
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        Usuario Administrador
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Inicio',
    caption: '',
    icon: 'home',
    link: '',
    method: ''
  },
  {
    title: 'Perfil',
    caption: '',
    icon: 'account_circle',
    link: '',
    method: ''
  },
  {
    title: 'Registrar Usuario',
    caption: '',
    icon: 'person_add',
    link: '',
    method: ''
  },
  {
    title: 'Inscribir',
    caption: '',
    icon: 'event_note',
    link: '',
    method: ''
  },
  {
    title: 'Académico',
    caption: '',
    icon: 'school',
    link: '',
    method: ''
  },
  {
    title: 'Carga de documentos',
    caption: '',
    icon: 'drive_folder_upload',
    link: '',
    method: ''
  },
  /* {
    title: 'Calendario Académico',
    caption: '',
    icon: 'calendar_month',
    link: ''
  }, */
  /* {
    title: 'Alumnos',
    caption: '',
    icon: 'person',
    link: ''
  }, */
  /* {
    title: 'Mis Notas',
    caption: '',
    icon: 'file_open',
    link: ''
  }, */
  /* {
    title: 'Planificación',
    caption: '',
    icon: 'view_kanban',
    link: ''
  }, */
  /* {
    title: 'Académico',
    caption: '',
    icon: 'school',
    link: ''
  },
  {
    title: 'Administración',
    caption: '',
    icon: 'settings',
    link: ''
  }, */
  
  {
    title: 'Salir',
    caption: '',
    icon: 'logout',
    link: '',
    method: 'logout()'
  }
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    logout() {
      this.$q.dialog({
        title: 'Cerrar sesión',
        message: '¿Estas seguro de querer salir de la aplicación?',
        cancel: true,
        persistent: false,
        className: 'dialog-bg-red text-white'
      }).onOk(() => {
      }).onOk(() => {
        this.logoutConfirm()
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
  }
}
</script>
