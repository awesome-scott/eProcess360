<template>
  <q-page padding>
    <q-breadcrumbs align="center" class="q-py-md">
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el :label="pageTitle" />
    </q-breadcrumbs>
    <header class="q-pa-sm text-center">
      <h3>{{ pageTitle }}</h3>
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
      <div class="row" v-show="selectedTags.length > 0">
        <q-chip
          clickable
          color="negative"
          text-color="white"
          @click="selectedTags = []"
          icon="close"
          label="Clear All"
        />
        <q-chip
          v-for="tag in selectedTags"
          clickable
          :key="tag"
          color="secondary"
          text-color="white"
          selected
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </q-chip>
      </div>
      <div class="row q-mb-md chip-suggestions">
        <q-chip
          v-for="tag in filteredTags"
          clickable
          :key="tag"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </q-chip>
      </div>
      <div class="row q-col-gutter-md q-mb-md">
        <div
          class="col-12 col-sm-6 col-md-4"
          v-for="projectType in filteredProjects"
          :key="projectType.title"
        >
          <q-card
            v-ripple
            @click="$router.push(`/project/step/`)"
            class="permit-card"
          >
            <q-card-section horizontal class="permit-card-content">
              <q-card-section
                :class="`bg-${projectType.color}`"
                class="permit-type-icon-bg flex items-center justify-center"
              >
                <q-icon :name="projectType.icon" size="4em" color="white" />
              </q-card-section>
              <q-card-section class="flex-column items-center justify-center">
                <h6>{{ projectType.title }}</h6>
                <q-separator class="q-my-sm" />
                <p class="q-mb-none q-mt-xs">{{ projectType.description }}</p>
                <q-separator class="q-my-sm" />
                <div class="chips text-right">
                  <q-chip v-for="tag in projectType.tags" :key="tag">
                    <q-icon v-if="selectedTags.includes(tag)" name="check" />
                    {{ tag }}
                  </q-chip>
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
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import permits from "assets/data/permits";
import licenses from "assets/data/licenses";
import complaints from "assets/data/complaints";

const route = useRoute();
const pageTitle = ref("Projects");
const projectType = ref(route.params.type);
const searchText = ref("");
const projects = ref([...permits, ...licenses, ...complaints]);
const filteredProjects = ref([]);
const allTags = ref([]);
const filteredTags = ref([]);
const selectedTags = ref([]);

watch(
  () => route.params.type,
  (newValue) => {
    selectedTags.value = [newValue];
    switch (newValue) {
      case "permit":
        pageTitle.value = "Permits";
        break;
      case "license":
        pageTitle.value = "Licenses";
        break;
      case "complaint":
        pageTitle.value = "Complaints";
        break;
      default:
        pageTitle.value = "Projects";
    }
  }
);

onMounted(() => {
  switch (projectType.value) {
    case "permit":
      selectedTags.value = ["permit"];
      break;
    case "license":
      selectedTags.value = ["license"];
      break;
    case "complaint":
      selectedTags.value = ["complaint"];
      break;
    default:
      selectedTags.value = [];
  }

  if (projects.value) {
    const tags = new Set();
    projects.value.forEach((project) => {
      project.tags.forEach((tag) => {
        tags.add(tag);
      });
    });
    allTags.value = Array.from(tags);
    filteredProjects.value = projects.value;
    updateFilteredTags();
  }
});

const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value = [...selectedTags.value, tag];
  }
};

watch([selectedTags, searchText], ([tags, search]) => {
  if (tags.length === 0) {
    filteredProjects.value = projects.value;
  } else {
    filteredProjects.value = projects.value.filter((project) =>
      tags.every((tag) => project.tags.includes(tag))
    );
  }
  if (search !== "") {
    const searchValue = search.toLowerCase().trim();
    filteredProjects.value = filteredProjects.value.filter(
      (project) =>
        project.title.toLowerCase().includes(searchValue) ||
        project.description.toLowerCase().includes(searchValue) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchValue))
    );
  }
  updateFilteredTags();
});

const updateFilteredTags = () => {
  const tags = new Set();
  filteredProjects.value.forEach((project) => {
    project.tags.forEach((tag) => {
      if (!selectedTags.value.includes(tag)) {
        tags.add(tag);
      }
    });
  });
  filteredTags.value = Array.from(tags);
  const rarityMap = new Map();
  filteredProjects.value.forEach((project) => {
    project.tags.forEach((tag) => {
      if (!selectedTags.value.includes(tag)) {
        if (rarityMap.has(tag)) {
          rarityMap.set(tag, rarityMap.get(tag) + 1);
        } else {
          rarityMap.set(tag, 1);
        }
      }
    });
  });
};
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
