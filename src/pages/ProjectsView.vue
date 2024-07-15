<template>
  <q-page padding>
    <q-breadcrumbs align="center" class="q-py-md">
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Permits" />
    </q-breadcrumbs>
    <header class="q-pa-sm text-center">
      <h3>Permits</h3>
    </header>
    <section>
      <q-input
        rounded
        outlined
        v-model="searchText"
        label="What type of permit are you looking for?"
        class="q-my-sm"
      >
        <template v-slot:append>
          <q-btn round dense flat icon="search" />
        </template>
      </q-input>
      <div class="row q-my-md chip-suggestions">
        <q-chip
          v-for="tag of allTags"
          clickable
          :key="tag.name"
          :color="tag.color"
          text-color="white"
          @click="filterPermitsByTag(tag.name)"
          >{{ tag.name }}</q-chip
        >
      </div>
      <div class="row q-col-gutter-md q-mb-md">
        <div
          class="col-12 col-sm-6 col-md-4"
          v-for="permitType of filteredPermits"
          :key="permitType.title"
        >
          <q-card
            v-ripple
            @click="$router.push('/permit/step')"
            class="permit-card"
          >
            <q-card-section horizontal class="permit-card-content">
              <q-card-section
                :class="`bg-${permitType.color}`"
                class="permit-type-icon-bg flex items-center justify-center"
              >
                <q-icon :name="permitType.icon" size="4em" color="white" />
              </q-card-section>
              <q-card-section class="flex-column items-center justify-center">
                <h6>{{ permitType.title }}</h6>
                <q-separator class="q-my-sm" />
                <p class="q-mb-none q-mt-xs">{{ permitType.description }}</p>
                <q-separator class="q-my-sm" />
                <div class="chips text-right">
                  <q-chip
                    v-for="tag of permitType.tags"
                    :key="tag"
                    :color="permitType.color"
                    text-color="white"
                    >{{ tag }}</q-chip
                  >
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, watch } from "vue";
defineOptions({
  name: "ProjectsView",
});
const searchText = ref("");
const allTags = [
  { name: "permit", color: "grey" },
  { name: "building", color: "red" },
  { name: "new construction", color: "red" },
  { name: "residential", color: "red" },
  { name: "commercial", color: "blue" },
  { name: "renovation", color: "red" },
  { name: "construction", color: "grey" },
  { name: "signage", color: "purple" },
  { name: "installation", color: "purple" },
  { name: "demolition", color: "orange" },
  { name: "event", color: "green" },
  { name: "outdoor", color: "green" },
  { name: "public", color: "grey" },
  { name: "restaurant", color: "blue" },
  { name: "patio", color: "blue" },
  { name: "pool", color: "red" },
];

const permitTypes = [
  {
    title: "New Residential Building Permit",
    description:
      "This is a building permit for new construction in residential areas.",
    icon: "home",
    tags: ["permit", "building", "new construction", "residential"],
    color: "red",
  },
  {
    title: "Parking Lot - Commercial (Other)",
    description: "A cleared area intended for parking vehicles",
    icon: "local_parking",
    tags: ["permit", "commercial", "new construction"],
    color: "blue",
  },
  {
    title: "Home Renovation Permit",
    description:
      "Permit for renovations and alterations to residential properties.",
    icon: "build",
    tags: ["permit", "renovation", "residential", "construction"],
    color: "red",
  },
  {
    title: "Commercial Sign Installation Permit",
    description: "Permit required for installing signage in commercial areas.",
    icon: "storefront",
    tags: ["permit", "commercial", "signage", "installation"],
    color: "purple",
  },
  {
    title: "Demolition Permit",
    description: "Permit for the demolition of buildings or structures.",
    icon: "construction",
    tags: ["permit", "demolition", "construction"],
    color: "orange",
  },
  {
    title: "Outdoor Event Permit",
    description: "Permit for organizing events in outdoor public spaces.",
    icon: "event",
    tags: ["permit", "event", "outdoor", "public"],
    color: "green",
  },
  {
    title: "Restaurant Patio Construction Permit",
    description:
      "Permit for constructing outdoor dining patios for restaurants.",
    icon: "dining",
    tags: ["permit", "restaurant", "construction", "patio"],
    color: "blue",
  },
  {
    title: "Pool Installation Permit",
    description:
      "Permit for the installation of swimming pools in residential properties.",
    icon: "pool",
    tags: ["permit", "pool", "residential", "construction"],
    color: "red",
  },
];

const filteredPermits = ref(permitTypes);

const filterPermitsByTag = (tagName) => {
  filteredPermits.value = permitTypes.filter((permit) =>
    permit.tags.includes(tagName)
  );
};
watch(searchText, (newValue) => {
  if (newValue !== "") {
    const search = searchText.value.toLowerCase().trim();
    filteredPermits.value = permitTypes.filter(
      (permit) =>
        permit.title.toLowerCase().includes(search) ||
        permit.description.toLowerCase().includes(search) ||
        permit.tags.some((tag) => tag.toLowerCase().includes(search))
    );
  }
});
</script>
<style lang="scss">
.permit-card {
  background-color: hsla(0, 0%, 100%, 1);
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  height: 100%;
}
.permit-card-content {
  height: 100%;
}
.permit-type-icon-bg {
  height: 100%;
  opacity: 0.75;
  transition: opacity 0.3s ease-in-out;
}
.permit-card:hover {
  background-color: hsla(0, 0%, 95%, 1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  .permit-type-icon-bg {
    opacity: 1;
  }
}
</style>
