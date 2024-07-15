<template>
  <q-page padding>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6 column">
        <div>
          <p>Please search for the parcel that you are working with.</p>
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
        <q-skeleton type="rect" width="100%" height="400px" class="q-my-sm" />
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
              row-key="id"
              class="q-mt-md"
            >
              <template v-slot:body-cell-actions="{ row }">
                <div
                  v-if="row.status !== 'Complete' && row.status !== 'Canceled'"
                >
                  <q-btn
                    label="Continue"
                    color="secondary"
                    to="/project/step"
                    class="q-mt-xs"
                    size="sm"
                  />
                </div>
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
import gisData from "assets/data/gisdata.js";
defineOptions({
  name: "HomePage",
});
const text = ref("");
const isLoggedIn = ref(false);
const columns = [
  { name: "type", label: "Project Type", align: "left", field: "name" },
  { name: "startDate", label: "Start Date", align: "left", field: "startDate" },
  { name: "endDate", label: "End Date", align: "left", field: "endDate" },
  { name: "status", label: "Status", align: "left", field: "status" },
  { name: "actions", label: "Actions", align: "left", field: "actions" },
];
const activeProjects = [
  {
    id: 1,
    type: "Building Permit",
    startDate: "2022-01-01",
    endDate: "2022-01-31",
    status: "Complete",
  },
  {
    id: 2,
    name: "Noise Complaint",
    startDate: "2022-02-01",
    endDate: "",
    status: "Stage/Step",
  },
  {
    id: 3,
    name: "Fire Plan Review",
    startDate: "2022-03-01",
    endDate: "",
    status: "Stage/Step",
  },
];
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
  {
    title: "Contact Us",
    description: "We're here to help.",
    icon: "contact_support",
    to: "/contact",
  },
]);
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
