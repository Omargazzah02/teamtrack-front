import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Projects from "../views/Projects.vue";
import CreateProject from "../views/CreateProject.vue";
import ProjectDetails from "../views/ProjectDetails.vue";
import AddTask from "../views/AddTask.vue";
import Collaborators from "../views/Collaborators.vue";
import { me } from "../api/auth";

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { layout: 'default' } },
  { path: '/register', name: 'Register', component: Register, meta: { layout: 'default' } },
  { path: '/projects', name: 'Dashboard', component: Projects, meta: { requiresAuth: true, layout: 'dashboard' } },
  { path: '/project/add', component: CreateProject, meta: { requiresAuth: true, layout: 'dashboard' } },
  { path: '/project/:id', component: ProjectDetails, props: true, meta: { requiresAuth: true, layout: 'dashboard' } },
  { path: '/task/:id/add', component: AddTask, props: true, meta: { requiresAuth: true, layout: 'dashboard' } },
  { path: '/collaborators/:id', component: Collaborators, meta: { requiresAuth: true, layout: 'dashboard' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

async function isAuthenticated() {
  try {
    const response = await me();
    return response.status === 200;
  } catch (error) {
    console.error('Erreur auth:', error);
    return false;
  }
}

router.beforeEach(async (to, from, next) => {
  const auth = await isAuthenticated();

  if (to.path === '/') {
    if (auth) {
      next({ name: 'Dashboard' });
    } else {
      next({ name: 'Login' });
    }
    return;
  }

  if (to.meta.requiresAuth) {
    if (auth) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else if (to.name === 'Login' || to.name === 'Register') {
    if (auth) {
      next({ name: 'Dashboard' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
