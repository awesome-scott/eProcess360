<template>
  <q-page padding>
    <q-breadcrumbs align="center" class="q-py-md">
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Permit: ###-###-##" to="/permits" />
      <q-breadcrumbs-el label="Hours" />
    </q-breadcrumbs>
    <div class="q-pa-sm">
      <h3 class="text-center">Hours</h3>
      <q-dialog v-model="addHoursDialog">
        <q-card class="q-pa-lg">
          <q-card-section>
            <div class="text-h6">Add New Entry</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="addNewEntry" class="q-gutter-md">
              <q-input v-model="newEntry.name" label="Name" filled />
              <q-input v-model="newEntry.type" label="Type" filled />
              <q-input
                v-model="newEntry.hours"
                label="Hours"
                type="number"
                filled
              />
              <q-input
                v-model="newEntry.datetime"
                label="Date/Time"
                type="date"
                filled
              />
              <q-btn
                type="submit"
                color="primary"
                label="Add New Entry"
                class="q-mt-md"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-table
        title="Hours Log"
        :rows="tableData"
        :columns="columns"
        row-key="id"
        class="q-mt-md"
        :rows-per-page-options="[10, 20, 50]"
        :sort-method="(a, b) => new Date(b.datetime) - new Date(a.datetime)"
      >
        <template v-slot:top-right>
          <q-btn
            class="q-mx-xs"
            color="secondary"
            icon-right="add"
            label="Add Hours"
            @click="addHoursDialog = true"
          />
          <q-btn
            class="q-mx-xs"
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:body-cell-delete="props">
          <q-td :props="props">
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="deleteEntry(props.row.uid)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script setup>
// TODO: have a by-user summary
// TODO: havea a by-type summary
// TODO: have a by-month summary

import { ref } from "vue";
import { uid } from "quasar";

defineOptions({
  name: "HoursView",
});

const addHoursDialog = ref(false);

const newEntry = ref({
  name: "",
  type: "",
  hours: "",
  datetime: "",
});

const tableData = ref([
  {
    uid: uid(),
    name: "Maurice Kaufman",
    type: "Civil Plan Review",
    hours: 0.5,
    datetime: "2023-01-15",
  },
  {
    uid: uid(),
    name: "Maurice Kaufman",
    type: "Site Visit",
    hours: 1.2,
    datetime: "2023-02-05",
  },
  {
    uid: uid(),
    name: "Maurice Kaufman",
    type: "Civil Plan Review",
    hours: 0.8,
    datetime: "2023-01-20",
  },
  {
    uid: uid(),
    name: "Andrea Arrojado",
    type: "Fire Plan Review",
    hours: 2,
    datetime: "2023-02-10",
  },
  {
    uid: uid(),
    name: "Andrea Arrojado",
    type: "Fire Plan Review",
    hours: 1.5,
    datetime: "2023-02-15",
  },
  {
    uid: uid(),
    name: "Anthony Schaffer",
    type: "Inspection",
    hours: 1,
    datetime: "2023-03-05",
  },
  {
    uid: uid(),
    name: "Anthony Schaffer",
    type: "Inspection",
    hours: 1.5,
    datetime: "2023-03-10",
  },
  {
    uid: uid(),
    name: "Kevin Smith",
    type: "Inspection Followup",
    hours: 2,
    datetime: "2023-03-20",
  },
  {
    uid: uid(),
    name: "Kevin Smith",
    type: "Inspection Followup",
    hours: 1,
    datetime: "2023-03-25",
  },
  {
    uid: uid(),
    name: "John Doe",
    type: "Design Review",
    hours: 1.5,
    datetime: "2023-01-25",
  },
  {
    uid: uid(),
    name: "John Doe",
    type: "Design Review",
    hours: 0.5,
    datetime: "2023-01-30",
  },
  {
    uid: uid(),
    name: "Jane Smith",
    type: "Consultation",
    hours: 1,
    datetime: "2023-02-05",
  },
  {
    uid: uid(),
    name: "Jane Smith",
    type: "Consultation",
    hours: 0.5,
    datetime: "2023-02-10",
  },
  {
    uid: uid(),
    name: "Michael Johnson",
    type: "Approval Process",
    hours: 2.5,
    datetime: "2023-02-15",
  },
  {
    uid: uid(),
    name: "Michael Johnson",
    type: "Approval Process",
    hours: 2,
    datetime: "2023-02-20",
  },
  {
    uid: uid(),
    name: "Sarah Adams",
    type: "Field Work",
    hours: 3,
    datetime: "2023-03-10",
  },
  {
    uid: uid(),
    name: "Sarah Adams",
    type: "Field Work",
    hours: 2,
    datetime: "2023-03-15",
  },
]);

const columns = ref([
  { name: "name", label: "Name", align: "left", field: "name", sortable: true },
  { name: "type", label: "Type", align: "left", field: "type", sortable: true },
  {
    name: "hours",
    label: "Hours",
    align: "center",
    field: "hours",
    sortable: true,
  },
  {
    name: "datetime",
    label: "Date/Time",
    align: "center",
    field: "datetime",
    sortable: true,
  },
  {
    name: "delete",
    label: "Delete",
    align: "center",
  },
]);

const deleteEntry = (uid) => {
  tableData.value = tableData.value.filter((entry) => entry.uid !== uid);
};

const addNewEntry = () => {
  // Push newEntry to tableData array
  tableData.value.push({ ...newEntry.value });

  // Reset newEntry object
  newEntry.value = { uid: uid(), name: "", type: "", hours: "", datetime: "" };
};

const exportTable = () => {
  console.log("download");
};
</script>
