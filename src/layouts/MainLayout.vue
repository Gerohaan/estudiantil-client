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
        Usuario Docente
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
    link: ''
  },
  {
    title: 'Usuarios',
    caption: '',
    icon: 'person',
    link: ''
  },
  {
    title: 'Inscripción',
    caption: '',
    icon: 'file_open',
    link: ''
  },
  {
    title: 'Planificación',
    caption: '',
    icon: 'view_kanban',
    link: ''
  },
  {
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
  },
  {
    title: 'Salir',
    caption: '',
    icon: 'logout',
    link: ''
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
  }
}
</script>
