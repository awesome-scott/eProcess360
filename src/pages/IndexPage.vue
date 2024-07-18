<template>
  <q-page padding>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6 column">
        <div>
          <p class="text-center q-mb-none">
            Please search for the parcel that you are working with.
          </p>
        </div>
        <q-input
          rounded
          outlined
          v-model="text"
          label="Lookup An Address"
          class="q-my-sm"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="search" />
          </template>
        </q-input>
        <q-skeleton
          type="rect"
          width="100%"
          height="400px"
          class="q-my-sm"
          @click="text = 'Some Address'"
        />
        <div class="results text-center" v-if="text">
          <h6 class="text-center">Sample Address For Project</h6>
          <q-btn
            to="/projects/all"
            label="New Project"
            icon="add"
            color="secondary"
          />
          <div class="row">
            <div class="col-12">
              <q-expansion-item
                switch-toggle-side
                expand-separator
                label="View Property Details"
                class="full-width text-left q-py-sm"
                header-style="secondary"
              >
                <q-list class="property-list" background="#eeeeeee">
                  <q-item
                    v-for="item in gisData"
                    :key="item.key"
                    clickable
                    class="property-item"
                  >
                    <q-item-section>
                      <strong class="field">{{ item.key }}</strong>
                    </q-item-section>
                    <q-item-section class="value">
                      {{ item.value }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 column q-col-gutter-md">
        <div class="row flex-center q-mt-md">
          <q-btn
            v-show="!isLoggedIn"
            label="Log In"
            icon="login"
            color="secondary"
            size="lg"
            @click="isLoggedIn = true"
          />
          <div v-show="isLoggedIn">
            <q-table
              title="Your Projects"
              :rows="activeProjects"
              :columns="columns"
              row-key="number"
              class="q-mt-md"
              @row-click="goToProject"
            >
              <template v-slot:body-cell-modified="props">
                <q-td :props="props">
                  <div>
                    <q-tooltip anchor="top middle">
                      <div>Created: {{ props.row.startDate }}</div>
                      <div>Modified: {{ props.row.modified }}</div>
                    </q-tooltip>
                    {{ props.row.modified.split(" ")[0] }}
                  </div>
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
        <div class="row q-gutter-md grid-container">
          <q-card
            v-ripple
            class="card cursor-pointer"
            v-for="link of links"
            :key="link.title"
            @click="$router.push(link.to)"
          >
            <q-card-section align="center" class="q-pb-none">
              <q-icon :name="link.icon" size="4em" color="secondary" />
            </q-card-section>
            <q-card-section class="card-details q-mt-none">
              <h6>{{ link.title }}</h6>
              <p>{{ link.description }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "stores/app";

const appStore = useAppStore();
appStore.pageNotes = `<p>Most users will interact with the map or go straight to the login.</p>
  <p>I'm still working on how to handle the title-bar for small screens. I think that those items should just be duplicated in the menu.</p>
  <p>If a user is logged_in, they should see their 'tasks' depending on their group. <ul><li>Civilians: Applications</li><li>Inspectors: Upcoming Inspections</li><li>Permit Techs: Permits needing TLC?</li><li>etc.</li></ul></p>`;

import gisData from "assets/data/gisdata.js";
defineOptions({
  name: "HomePage",
});
const router = useRouter();

const text = ref("");
const isLoggedIn = ref(false);
const columns = [
  { name: "type", label: "Project Type", align: "left", field: "type" },
  { name: "number", label: "Project #", align: "left", field: "number" },
  { name: "modified", label: "Modified", align: "left", field: "modified" },
  { name: "status", label: "Status", align: "left", field: "status" },
];
const activeProjects = ref([
  {
    number: "123-45-4444",
    type: "Building Permit",
    startDate: "2022-01-01 09:00",
    modified: "2022-01-31 17:00",
    status: "Complete",
  },
  {
    number: "43-45-3214",
    type: "Noise Complaint",
    startDate: "2022-02-01 08:00",
    modified: "2022-02-01 12:30",
    status: "Application / Fee",
  },
  {
    number: "885-032-3321",
    type: "Fire Plan Review",
    startDate: "2022-03-01 10:15",
    modified: "2022-03-01 15:45",
    status: "Inspection / Review",
  },
]);
const links = ref([
  {
    title: "Connect With Us",
    description: "I'm not sure what this section is for. Please clarify.",
    icon: "groups",
    to: "/contact",
  },
  {
    title: "File For A Permit",
    description: "Click here to begin your new permit application.",
    icon: "assignment",
    to: "/projects/permit",
  },
  {
    title: "Licensing",
    description:
      "Things to do with licenses. This is intentionally a longer description to show how flex-grow keeps the cards the same height. If it's working...",
    icon: "badge",
    to: "/projects/license",
  },
  {
    title: "Complaints",
    description: "Please don't complain about me.",
    icon: "report",
    to: "/projects/complaint",
  },
]);

const goToProject = (step) => {
  if (step == "step") {
    router.push(`/project/step`);
    return;
  }
  router.push(`/project`);
};
</script>

<style scoped>
.property-item {
  border-bottom: 1px dashed #ccc;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

.card {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  justify-content: start;
  &:hover {
    background: hsla(0, 0%, 95%, 1) !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    .permit-type-icon-bg {
      opacity: 1;
    }
  }
}

@media (min-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .order-md-1 {
    order: 1;
  }

  .order-md-2 {
    order: 2;
  }
}
</style>
