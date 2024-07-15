<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-md-6 order-md-2 column q-col-gutter-md">
        <div class="row flex-center q-mt-md">
          <q-btn label="Log In" icon="login" color="secondary" />
        </div>
        <div class="row q-gutter-md grid-container">
          <q-card
            v-ripple
            class="card"
            v-for="link of links"
            :key="link.title"
            @click="$router.push(link.to)"
          >
            <q-card-section align="center" class="q-pb-none">
              <q-icon :name="link.icon" size="4em" />
            </q-card-section>
            <q-card-section class="card-details q-mt-none">
              <h6>{{ link.title }}</h6>
              <p>{{ link.description }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-12 col-md-6 order-md-1 column q-pa-sm">
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
        <h6 class="text-center">Sample Address For Project</h6>
        <q-btn
          to="/projects"
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
              class="full-width"
              header-style="secondary"
            >
              <q-list class="property-list" background="#eeeeeee">
                <q-item
                  v-for="(item, index) in [
                    'Field 1',
                    'Field 2',
                    'Field 3',
                    'Field 4',
                    'Field 5',
                  ]"
                  :key="index"
                  clickable
                  class="property-item"
                >
                  <q-item-section>
                    <strong class="field">{{ item }}</strong>
                  </q-item-section>
                  <q-item-section class="value">
                    Value {{ index + 1 }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
defineOptions({
  name: "HomePage",
});
const text = ref("");
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
    to: "/permits",
  },
  {
    title: "Licensing",
    description:
      "Things to do with licenses. This is intentionally a longer description to show how flex-grow keeps the cards the same height. If it's working...",
    icon: "badge",
    to: "licensing",
  },
  {
    title: "Complaints",
    description: "Please don't complain about me.",
    icon: "report",
    to: "/complaints",
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
