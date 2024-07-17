<template>
  <q-page padding>
    <q-breadcrumbs align="center" class="q-py-md">
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Contracts" />
    </q-breadcrumbs>
    <h3>Contracts</h3>
    <q-table
      title="Contracts"
      :rows="contracts"
      :columns="columns"
      row-key="number"
      class="q-mt-md"
      @row-click="goToContract"
    >
      <template v-slot:body-cell-remaining="props">
        <q-td :props="props">
          <q-btn
            @click="goToContract(props.row)"
            :label="`${props.value} days`"
            :color="
              props.value < 0
                ? 'red'
                : props.value < 30
                ? 'warning'
                : 'positive'
            "
          />
          <q-linear-progress
            v-if="props.row.startDate && props.row.endDate"
            :value="
              (new Date() - new Date(props.row.startDate)) /
              (new Date(props.row.endDate) - new Date(props.row.startDate))
            "
            color="primary"
            height="4px"
            class="q-mt-sm"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const columns = ref([
  {
    name: "client",
    label: "Client",
    align: "left",
    field: "client",
    sortable: true,
  },
  {
    name: "department",
    label: "Department",
    align: "left",
    field: "department",
    sortable: true,
  },
  {
    name: "startDate",
    label: "Start Date",
    align: "left",
    field: "startDate",
    sortable: true,
  },
  {
    name: "endDate",
    label: "End Date",
    align: "left",
    field: "endDate",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
    sortable: true,
  },
  {
    name: "remaining",
    label: "Days Remaining",
    align: "center",
    field: (row) => {
      const today = new Date();
      const endDate = new Date(row.endDate);
      const timeDiff = endDate.getTime() - today.getTime();
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysRemaining;
    },
    sortable: true,
  },
]);
const contracts = ref([
  {
    id: "1",
    client: "John Doe",
    department: "Building Department",
    startDate: "2023-01-01",
    endDate: "2024-08-01",
    status: "Active",
  },
  {
    id: "2",
    client: "Jane Smith",
    department: "Planning Department",
    startDate: "2022-02-01",
    endDate: "2023-11-30",
    status: "Inactive",
  },
  {
    id: "3",
    client: "Michael Johnson",
    department: "Fire Department",
    startDate: "2022-03-01",
    endDate: "2024-10-31",
    status: "Active",
  },
  {
    id: "4",
    client: "Emily Davis",
    department: "Building Department",
    startDate: "2022-04-01",
    endDate: "2024-09-30",
    status: "Inactive",
  },
  {
    id: "5",
    client: "Daniel Wilson",
    department: "Planning Department",
    startDate: "2024-07-01",
    endDate: "2024-08-02",
    status: "Active",
  },
  {
    id: "6",
    client: "Olivia Taylor",
    department: "Fire Department",
    startDate: "2022-06-01",
    endDate: "2024-07-31",
    status: "Inactive",
  },
  {
    id: "7",
    client: "Matthew Anderson",
    department: "Building Department",
    startDate: "2022-07-01",
    endDate: "2023-06-30",
    status: "Active",
  },
  {
    id: "8",
    client: "Sophia Martinez",
    department: "Planning Department",
    startDate: "2022-08-01",
    endDate: "2022-05-31",
    status: "Inactive",
  },
  {
    id: "9",
    client: "William Thompson",
    department: "Fire Department",
    startDate: "2022-09-01",
    endDate: "2022-04-30",
    status: "Active",
  },
  {
    id: "10",
    client: "Isabella Garcia",
    department: "Building Department",
    startDate: "2022-10-01",
    endDate: "2022-03-31",
    status: "Inactive",
  },
  {
    id: "11",
    client: "James Robinson",
    department: "Planning Department",
    startDate: "2022-11-01",
    endDate: "2022-02-28",
    status: "Active",
  },
  {
    id: "12",
    client: "Emma Clark",
    department: "Fire Department",
    startDate: "2023-12-01",
    endDate: "2024-01-31",
    status: "Inactive",
  },
  {
    id: "13",
    client: "Liam Rodriguez",
    department: "Building Department",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "Active",
  },
  {
    id: "14",
    client: "Ava Lee",
    department: "Planning Department",
    startDate: "2023-02-01",
    endDate: "2023-11-30",
    status: "Inactive",
  },
  {
    id: "15",
    client: "Noah Walker",
    department: "Fire Department",
    startDate: "2023-03-01",
    endDate: "2023-10-31",
    status: "Active",
  },
  {
    id: "16",
    client: "Mia Hall",
    department: "Building Department",
    startDate: "2023-04-01",
    endDate: "2023-09-30",
    status: "Inactive",
  },
  {
    id: "17",
    client: "Benjamin Young",
    department: "Planning Department",
    startDate: "2023-05-01",
    endDate: "2023-08-31",
    status: "Active",
  },
  {
    id: "18",
    client: "Charlotte Hernandez",
    department: "Fire Department",
    startDate: "2023-06-01",
    endDate: "2023-07-31",
    status: "Inactive",
  },
  {
    id: "19",
    client: "Elijah Moore",
    department: "Building Department",
    startDate: "2023-07-01",
    endDate: "2023-06-30",
    status: "Active",
  },
  {
    id: "20",
    client: "Amelia King",
    department: "Planning Department",
    startDate: "2023-08-01",
    endDate: "2023-05-31",
    status: "Inactive",
  },
  {
    id: "21",
    client: "Lucas Adams",
    department: "Fire Department",
    startDate: "2023-09-01",
    endDate: "2023-04-30",
    status: "Active",
  },
  {
    id: "22",
    client: "Harper Wright",
    department: "Building Department",
    startDate: "2023-10-01",
    endDate: "2023-03-31",
    status: "Inactive",
  },
  {
    id: "23",
    client: "Alexander Hill",
    department: "Planning Department",
    startDate: "2023-11-01",
    endDate: "2023-02-28",
    status: "Active",
  },
  {
    id: "24",
    client: "Sofia Baker",
    department: "Fire Department",
    startDate: "2023-12-01",
    endDate: "2023-01-31",
    status: "Inactive",
  },
]);
const goToContract = (row) => {
  router.push("/contract/");
};
</script>
