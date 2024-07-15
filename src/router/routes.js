const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "projects/:type",
        component: () => import("pages/ProjectsView.vue"),
        props: true,
      },
      {
        path: "project/:type",
        component: () => import("pages/ProjectView.vue"),
        props: true,
      },
      {
        path: "project/:type/step",
        component: () => import("pages/StepView.vue"),
        props: true,
      },
      {
        path: "project/:type/hours",
        component: () => import("pages/HoursView.vue"),
        props: true,
      },
      { path: "profile", component: () => import("pages/ProfileView.vue") },
      { path: "dashboard", component: () => import("pages/DashboardView.vue") },
      {
        path: "dashboard-editor",
        component: () => import("pages/DashboardEdit.vue"),
      },
      { path: "settings", component: () => import("pages/SettingsView.vue") },
      {
        path: "admin-settings",
        component: () => import("pages/AdminSettings.vue"),
      },
      { path: "theme-editor", component: () => import("pages/ThemeView.vue") },
      { path: "contact", component: () => import("pages/ContactPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
