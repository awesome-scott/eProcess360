const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "projects", component: () => import("pages/ProjectsView.vue") },
      { path: "permits", component: () => import("pages/PermitsView.vue") },
      { path: "permit/step", component: () => import("pages/StepView.vue") },
      { path: "permit/hours", component: () => import("pages/HoursView.vue") },
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
