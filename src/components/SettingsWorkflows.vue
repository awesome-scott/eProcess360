<template>
  <div v-if="selectedWorkflow">
    <div class="row justify-center actions q-gutter-sm">
      <q-btn
        @click="selectedWorkflow = false"
        label="Back"
        icon="arrow_back"
        color="grey"
      />
      <q-btn
        @click="selectedWorkflow = false"
        label="Save"
        icon="save"
        color="secondary"
      />
      <q-btn
        @click="selectedWorkflow = false"
        label="Save & Publish"
        icon-right="arrow_forward"
        color="positive"
      />
    </div>
    <div class="row q-my-md">
      <div class="col-12 col-sm-6">
        <div class="row show-hover-button">
          <h5 class="text-left">Selected Workflow</h5>
          <q-space />
          <q-btn flat dense color="secondary" icon="edit" class="hide-button" />
        </div>
        <div class="row show-hover-button">
          <p>Workflow Description</p>
          <q-space />
          <q-btn flat dense color="secondary" icon="edit" class="hide-button" />
        </div>
      </div>
      <div class="col-12 col-sm-6 text-right">
        <q-chip label="Draft" />
        <div>Published: 04/01/2024</div>
        <div>Modified: 07/11/2024</div>
      </div>
    </div>
    <div class="row">
      <q-btn color="secondary" icon="add" label="Add Stage" />
    </div>
    <div class="row">
      <q-list dense>
        <q-item
          dense
          switch-toggle-side
          expand-separator
          v-for="stage in stages"
          :key="stage.name"
          class="column item"
        >
          <div
            class="row items-center show-hover-button cursor-pointer q-pa-sm"
          >
            <q-item-label>
              <q-tooltip v-if="stage.description">{{
                stage.description
              }}</q-tooltip>
              {{ stage.name }}
            </q-item-label>
            <q-space />
            <div>
              <q-btn
                flat
                dense
                color="secondary"
                icon="edit"
                class="q-ml-lg hide-button"
              />
            </div>
          </div>
          <div class="row items-center">
            <q-list v-if="stage.steps" dense class="steps q-ml-lg">
              <q-item v-for="step in stage.steps" :key="step.name" class="item">
                <div
                  class="row items-center show-hover-button-child cursor-pointer q-pa-sm full-width"
                >
                  <div>
                    <q-tooltip v-if="step.description">{{
                      step.description
                    }}</q-tooltip
                    >{{ step.name }}
                  </div>
                  <q-space />
                  <q-btn
                    flat
                    dense
                    color="secondary"
                    icon="edit"
                    class="q-ml-lg hide-button-child"
                  />
                </div>
              </q-item>
            </q-list>
          </div>
        </q-item>
      </q-list>
    </div>
  </div>
  <div v-else>
    <q-table
      grid
      flat
      bordered
      :rows="workflows"
      :columns="columns"
      row-key="id"
      card-container-class="q-col-gutter-md"
    >
      <template v-slot:item="{ row }">
        <div class="col-12 col-md-6">
          <q-card
            v-ripple
            @click="selectedWorkflow = true"
            class="cursor-pointer workflow-card"
          >
            <q-card-section>
              <div class="text-h6">{{ row.name }}</div>
              <div class="text-subtitle2">{{ row.description }}</div>
              <q-chip style="position: absolute; top: 10px; right: 10px">{{
                row.status
              }}</q-chip>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="text-caption">
                <div v-show="row.modified">Modified: {{ row.modified }}</div>
                <div v-show="row.published">Published: {{ row.published }}</div>
              </div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn
                @click="selectedWorkflow = true"
                label="Delete"
                icon="delete"
                color="negative"
              />

              <q-btn
                @click="selectedWorkflow = true"
                label="Edit"
                icon="edit"
                color="secondary"
              />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { ref } from "vue";
const selectedWorkflow = ref(false);
const columns = [
  { name: "name", label: "Name", align: "left", field: "name" },
  {
    name: "description",
    label: "Description",
    field: "description",
  },
  { name: "status", label: "Status", field: "status" },
  { name: "modified", label: "Modified", field: "modified" },
  { name: "published", label: "Published", field: "published" },
  { name: "actions", label: "Actions" },
];
const workflows = [
  {
    id: 1,
    name: "Workflow 1",
    description: "This is a description",
    status: "Draft",
    modified: "2021-09-01",
    published: "2021-09-01",
  },
  {
    id: 2,
    name: "Workflow 2",
    description: "This is a description",
    status: "Published",
    modified: "2021-09-01",
    published: "2021-09-01",
  },
  {
    id: 3,
    name: "Workflow 3",
    description: "This is a description",
    status: "Draft",
    modified: "2021-09-01",
    published: "2021-09-01",
  },
];
const stages = [
  {
    name: "Application",
    description: "This is a description",
    done: true,
    steps: [
      {
        name: "Information",
        done: true,
        description: "User should enter their information",
      },
      {
        name: "Submittals",
        done: true,
        description: "User should submit their documents",
      },
      {
        name: "More Details",
        done: true,
        description: "User should provide more details",
      },
    ],
  },
  {
    name: "Application Fee",
    done: true,
    description: "User should pay their application fee",
  },
  {
    name: "Intake Checklist",
    done: true,
    description: "User should complete the intake checklist",
  },
  {
    name: "Review",
    done: true,
    description: "User should review their application",
    description: "User should review their application",
  },
  {
    name: "Issuance",
    description: "This is a description",
    steps: [
      {
        name: "BPC Checklist",
        done: true,
        description: "User should complete the BPC checklist",
      },
      {
        name: "Permit Issuance",
        current: true,
        description: "User should issue the permit",
      },
    ],
  },
  { name: "Inspection", description: "This is a description" },
  { name: "Final", description: "This is a description" },
  { name: "Review", done: true },
  {
    name: "Issuance",
    steps: [
      { name: "BPC Checklist", done: true },
      { name: "Permit Issuance", current: true },
    ],
  },
  { name: "Inspection" },
  { name: "Final" },
];
</script>
<style labng="scss" scoped>
.item {
  padding-left: 0 !important;
}
.workflow-card {
  transition: background 0.3s, box-shadow 0.3s;
  &:hover {
    background: hsla(0, 0%, 95%, 1) !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    .permit-type-icon-bg {
      opacity: 1;
    }
  }
}
.steps {
  border-left: 10px solid hsl(0, 0%, 95%);
}
.show-hover-button,
.show-hover-button-child {
  &:hover {
    background: hsl(0, 0%, 95%);
  }
}
.hide-button,
.hide-button-child {
  visibility: hidden;
}
.show-hover-button {
  &:hover {
    & .hide-button {
      visibility: visible;
    }
  }
}
.show-hover-button-child {
  &:hover {
    & .hide-button-child {
      visibility: visible;
    }
  }
}
</style>
