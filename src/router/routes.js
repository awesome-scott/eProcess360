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
        path: "project/",
        component: () => import("pages/ProjectView.vue"),
      },
      {
        path: "project/step",
        component: () => import("pages/StepView.vue"),
      },
      {
        path: "project//hours",
        component: () => import("pages/HoursView.vue"),
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
      { path: "contracts", component: () => import("pages/ContractsView.vue") },
      { path: "contract", component: () => import("pages/ContractView.vue") },
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
