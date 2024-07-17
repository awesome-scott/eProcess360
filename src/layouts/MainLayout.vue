<template>
  <q-layout view="hhr LpR ffr">
    <q-header>
      <q-toolbar class="q-pa-none custom-header bg-white text-primary">
        <q-skeleton class="logo" type="rect" />
        <q-toolbar-title align="center">
          <h1 class="title">City of AwesomeScott</h1>
        </q-toolbar-title>
        <q-btn to="/profile" flat no-caps
          >John Watson<br />Building Inspector
        </q-btn>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
      <q-tabs inline-label align="center" class="bg-primary text-white">
        <q-route-tab to="/" label="Home" icon="home" />
        <q-route-tab to="/dashboard" label="Dashboard" icon="analytics" />
        <q-route-tab to="/projects/all" label="Projects" icon="assignment" />
        <q-route-tab
          to="/contracts"
          label="Contracts"
          icon="document_scanner"
        />
        <q-route-tab to="/login" label="Log In" icon="login" />
      </q-tabs>
    </q-header>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      behavior="mobile"
      elevated
    >
      <q-list>
        <q-item-label header>Menu</q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="footer">
      <div class="row justify-between bg-primary items-center q-px-md">
        <div class="col">
          <small>Powered By: </small>
          <a href="eprocess360.com" target="_blank" class="footer-link"
            >eProcess360</a
          >
        </div>
        <div class="col text-center">
          <a href="eprocess360.com" target="_blank" class="footer-logo"
            ><img src="~assets/img/logo.svg"
          /></a>
        </div>
        <div class="col text-right"><small>v4.0.1</small></div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
// TODO: menubar is too long. Consider which are needed and consider only showing icons with tooltips ? (kind of hate that)
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Settings",
    caption: "Manage your preferences",
    icon: "settings",
    link: "/settings",
  },
  {
    title: "Profile",
    caption: "View and edit your profile",
    icon: "account_circle",
    link: "/profile",
  },
  {
    title: "Dashboard Editor",
    caption: "Overview of your activity",
    icon: "dashboard",
    link: "/dashboard-editor",
  },
  {
    title: "Theme Builder",
    caption: "Customize your theme",
    icon: "palette",
    link: "/theme-editor",
  },
  {
    title: "Admin Settings",
    caption: "Administer system settings",
    icon: "admin_panel_settings",
    link: "/admin-settings",
  },
  {
    title: "Logout",
    caption: "Sign out of your account",
    icon: "logout",
    link: "/logout",
  },
];

const rightDrawerOpen = ref(false);

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>
<style lang="scss">
.custom-header {
  height: 64px;
}
.title {
  font-size: 24px;
}
.logo {
  height: 64px;
  width: 64px;
}
.footer {
  min-height: 64px;
}
.footer-link {
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.footer-logo {
  min-height: 64px;
  max-height: 64px;
  img {
    min-height: 64px;
    max-height: 64px;
  }
}

@media (min-width: 1024px) {
  .custom-header {
    height: 96px;
  }
  .title {
    font-size: 36px;
  }
  .logo {
    height: 96px;
    width: 96px;
  }
}
</style>
