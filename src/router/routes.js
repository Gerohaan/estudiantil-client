
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayoutNoLogin.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/Inicio',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Inicio.vue'), meta: { requiresAuth: true } },
      { path: 'perfil', component: () => import('pages/Perfil.vue'), meta: { requiresAuth: true } },
      { path: 'usuarios', component: () => import('pages/Usuarios.vue'), meta: { requiresAuth: true } },
      { path: 'lapsos', component: () => import('pages/Lapsos.vue'), meta: { requiresAuth: true } },
      { path: 'secciones', component: () => import('pages/Secciones.vue'), meta: { requiresAuth: true } },
      { path: 'materias', component: () => import('pages/Materias.vue'), meta: { requiresAuth: true } },
      { path: 'docentes', component: () => import('pages/Docentes.vue'), meta: { requiresAuth: true } },
      { path: 'estudiantes', component: () => import('pages/Estudiantes.vue'), meta: { requiresAuth: true } },
      { path: 'grados', component: () => import('pages/Grados.vue'), meta: { requiresAuth: true } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
