import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/project",
    name: "Project",
    component: () => import("../views/project/ProjectList.vue")
  },
  {
    path: "/project/edit",
    redirect: "/project/edit/0"
  },
  {
    path: "/project/edit/:projectId",
    name: "ProjectEdit",
    component: () => import("../views/project/ProjectEdit.vue")
  },
  {
    path: "/project/:projectId",
    name: "ProjectShow",
    component: () => import("../views/project/ProjectShow.vue")
  },
  {
    path: "/task",
    name: "TaskList",
    component: () => import("../views/TaskList.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
