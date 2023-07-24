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
      :width="230"
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          {{ auth.persona.name }} {{ auth.persona.surname }}
        <q-item-label caption>
          {{ internalRol }}
        </q-item-label>  
      </q-item-label>
        <q-item
          clickable
          to="/inicio/"
        >
          <q-item-section
            avatar
          >
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Inicio</q-item-label>
            <q-item-label caption>
              <!-- caption menú -->
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          to="/inicio/perfil"
        >
          <q-item-section
            avatar
          >
            <q-icon name="account_circle" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Perfil</q-item-label>
            <q-item-label caption>
              <!-- caption menú -->
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          to="/inicio/usuarios"
        >
          <q-item-section
            avatar
          >
            <q-icon name="person" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Usuarios</q-item-label>
            <q-item-label caption>
              <!-- caption menú -->
            </q-item-label>
          </q-item-section>
        </q-item>
       <!--  <q-item
          clickable
          tag="a"
          href="#"
        >
          <q-item-section
            avatar
          >
            <q-icon name="event_note" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Inscribir</q-item-label>
            <q-item-label caption>
            </q-item-label>
          </q-item-section>
        </q-item> -->
        <q-expansion-item
          expand-separator
          icon="event_note"
          label="Inscribir"
        >
          <q-card>
            <q-card-section>
              <q-item
                  clickable
                  tag="a"
                  to="/inicio/materias"
                >
                  <q-item-section
                    avatar
                  >
                <q-icon name="subject" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Materias</q-item-label>

                <q-item-label caption>
                  
                </q-item-label>
              </q-item-section>
              </q-item>
              <q-item
                  clickable
                  tag="a"
                  to="/inicio/docentes"
                >
                <q-item-section
                  avatar
                >
                <q-icon name="group" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Docentes</q-item-label>

                <q-item-label caption>
                  
                </q-item-label>
              </q-item-section>
              </q-item>
              <q-item
                  clickable
                  tag="a"
                  to="/inicio/estudiantes"
                >
                  <q-item-section
                    avatar
                  >
                <q-icon name="groups" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Estudiantes</q-item-label>

                <q-item-label caption>
                  
                </q-item-label>
              </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <!-- <q-item
          clickable
          tag="a"
          href="#"
        >
          <q-item-section
            avatar
          >
            <q-icon name="school" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Académico</q-item-label>

            <q-item-label caption>
              
            </q-item-label>
          </q-item-section>
        </q-item> -->
        <q-expansion-item
          expand-separator
          icon="school"
          label="Académico"
        >
          <q-card>
            <q-card-section>
              <q-item
                  clickable
                  tag="a"
                  to="/inicio/lapsos"
                >
                  <q-item-section
                    avatar
                  >
                <q-icon name="date_range" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Lapsos</q-item-label>

                <q-item-label caption>
                  
                </q-item-label>
              </q-item-section>
              </q-item>
              <q-item
                  clickable
                  tag="a"
                  to="/inicio/secciones"
                >
                <q-item-section
                  avatar
                >
                <q-icon name="abc" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Secciones</q-item-label>

                <q-item-label caption>
                  
                </q-item-label>
              </q-item-section>
              </q-item>
              <q-item
                  clickable
                  tag="a"
                  to="/inicio/grados"
                >
                  <q-item-section
                    avatar
                  >
                <q-icon name="history_edu" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Grados</q-item-label>

                <q-item-label caption>
                  
                </q-item-label>
              </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-item
          clickable
          tag="a"
          href="#"
        >
          <q-item-section
            avatar
          >
            <q-icon name="drive_folder_upload" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Carga de documentos</q-item-label>
            <q-item-label caption>
              <!-- caption menú -->
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          @click="logout()"
        >
          <q-item-section
            avatar
          >
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Salir</q-item-label>
            <q-item-label caption>
              <!-- caption menú -->
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { Dialog } from 'quasar'
import { Notify } from 'quasar'

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
  methods: {
    logout() {
      this.$q.dialog({
        title: 'Cerrar sesión',
        message: '¿Quiere salir de la aplicación?',
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

    logoutConfirm() {
      const token = {}
      token.token = localStorage.getItem('token')
      this.$store.dispatch('auth/logout', token)
        .then((resp) => {
          Notify.create(
            { message: 'Sesión cerrada.', 
              type: 'positive', 
              position: 'top-right'
          })
          this.$RoutePush('/')
        })
        .catch((err) => {
          console.log(err)
          Notify.create(
            { message: err.message, 
              type: 'positive', 
              position: 'top-right'
          })
        })
    },
  }
}
</script>
