<template>
  <q-page padding>
    <q-breadcrumbs align="center" class="q-py-md">
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Contracts" />
    </q-breadcrumbs>
    <h3>Contracts</h3>
    <q-table
      :grid="$q.screen.lt.md"
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
            :color="
              calculateRemainingDays(props.row) < 0
                ? 'red'
                : calculateRemainingDays(props.row) < 30
                ? 'warning'
                : 'positive'
            "
            height="4px"
            class="q-mt-sm"
          />
        </q-td>
      </template>
      <template #item="{ row }">
        <q-card
          to="/contract"
          class="contract-card cursor-pointer col-12 q-my-sm"
          v-ripple
          @click="goToContract(row)"
        >
          <q-card-section :horizontal="$q.screen.gt.xs">
            <q-card-section class="col-grow">
              <div class="text-h6">{{ row.client }}</div>
              <div class="text-subtitle2">{{ row.department }}</div>
            </q-card-section>
            <q-card-section>
              <div class="text-caption">
                {{ row.startDate }} - {{ row.endDate }}
              </div>
              <q-btn
                @click="goToContract(row)"
                :label="`${calculateRemainingDays(row)} days`"
                :color="
                  calculateRemainingDays(row) < 0
                    ? 'red'
                    : calculateRemainingDays(row) < 30
                    ? 'warning'
                    : 'positive'
                "
              />
            </q-card-section>
          </q-card-section>
          <q-linear-progress
            v-if="row.startDate && row.endDate"
            :value="
              (new Date() - new Date(row.startDate)) /
              (new Date(row.endDate) - new Date(row.startDate))
            "
            :color="
              calculateRemainingDays(row) < 0
                ? 'red'
                : calculateRemainingDays(row) < 30
                ? 'warning'
                : 'positive'
            "
            height="4px"
            class="q-mt-sm"
          />
        </q-card>
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
      return calculateRemainingDays(row);
    },
    sortable: true,
  },
]);
const contracts = ref(
  [
    {
      id: "1",
      client: "Jaynesville",
      department: "Building Department",
      startDate: "2023-01-01",
      endDate: "2024-08-01",
      status: "Active",
    },
    {
      id: "2",
      client: "Cool County",
      department: "Planning Department",
      startDate: "2022-02-01",
      endDate: "2023-11-30",
      status: "Inactive",
    },
    {
      id: "3",
      client: "City of Elmsville",
      department: "Fire Department",
      startDate: "2022-03-01",
      endDate: "2024-10-31",
      status: "Active",
    },
    {
      id: "4",
      client: "Basstown",
      department: "Building Department",
      startDate: "2022-04-01",
      endDate: "2024-09-30",
      status: "Inactive",
    },
    {
      id: "5",
      client: "City of Pines",
      department: "Planning Department",
      startDate: "2024-07-01",
      endDate: "2024-08-02",
      status: "Active",
    },
    {
      id: "6",
      client: "Oak Coounty",
      department: "Fire Department",
      startDate: "2022-06-01",
      endDate: "2024-07-31",
      status: "Inactive",
    },
    {
      id: "7",
      client: "City of Mapleton",
      department: "Building Department",
      startDate: "2022-07-01",
      endDate: "2023-06-30",
      status: "Active",
    },
    {
      id: "8",
      client: "Ocean Grove",
      department: "Planning Department",
      startDate: "2022-08-01",
      endDate: "2022-05-31",
      status: "Inactive",
    },
    {
      id: "9",
      client: "Ocean Grove",
      department: "Fire Department",
      startDate: "2022-09-01",
      endDate: "2022-04-30",
      status: "Active",
    },
    {
      id: "10",
      client: "Applewood",
      department: "Building Department",
      startDate: "2022-10-01",
      endDate: "2022-03-31",
      status: "Inactive",
    },
    {
      id: "11",
      client: "City of Lawrence",
      department: "Planning Department",
      startDate: "2022-11-01",
      endDate: "2022-02-28",
      status: "Active",
    },
    {
      id: "12",
      client: "Jayhawk County",
      department: "Fire Department",
      startDate: "2023-12-01",
      endDate: "2024-01-31",
      status: "Inactive",
    },
    {
      id: "13",
      client: "City of Riverdale",
      department: "Building Department",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      status: "Active",
    },
    {
      id: "14",
      client: "City of Riverdale",
      department: "Planning Department",
      startDate: "2023-02-01",
      endDate: "2023-11-30",
      status: "Inactive",
    },
    {
      id: "15",
      client: "Layton City",
      department: "Fire Department",
      startDate: "2023-03-01",
      endDate: "2023-10-31",
      status: "Active",
    },
    {
      id: "16",
      client: "Layton City",
      department: "Building Department",
      startDate: "2023-04-01",
      endDate: "2023-09-30",
      status: "Inactive",
    },
    {
      id: "17",
      client: "Charlottesville",
      department: "Planning Department",
      startDate: "2023-05-01",
      endDate: "2023-08-31",
      status: "Active",
    },
    {
      id: "18",
      client: "Jaynesville",
      department: "Fire Department",
      startDate: "2023-06-01",
      endDate: "2023-07-31",
      status: "Inactive",
    },
    {
      id: "19",
      client: "Moorestown",
      department: "Building Department",
      startDate: "2023-07-01",
      endDate: "2023-06-30",
      status: "Active",
    },
    {
      id: "20",
      client: "Weber County",
      department: "Planning Department",
      startDate: "2023-08-01",
      endDate: "2023-05-31",
      status: "Inactive",
    },
    {
      id: "21",
      client: "Weber County",
      department: "Fire Department",
      startDate: "2023-09-01",
      endDate: "2023-04-30",
      status: "Active",
    },
    {
      id: "22",
      client: "Wrangler County",
      department: "Building Department",
      startDate: "2023-10-01",
      endDate: "2023-03-31",
      status: "Inactive",
    },
    {
      id: "23",
      client: "Knightsbridge City",
      department: "Planning Department",
      startDate: "2023-11-01",
      endDate: "2023-02-28",
      status: "Active",
    },
    {
      id: "24",
      client: "Knightsbridge City",
      department: "Fire Department",
      startDate: "2023-12-01",
      endDate: "2023-01-31",
      status: "Inactive",
    },
  ].map((contract) => {
    if (new Date(contract.endDate) < new Date(contract.startDate)) {
      contract.endDate = contract.startDate;
    }
    return contract;
  })
);
const goToContract = (row) => {
  router.push("/contract/");
};
const calculateRemainingDays = (row) => {
  if (row.startDate && row.endDate) {
    const today = new Date();
    const endDate = new Date(row.endDate);
    const timeDiff = endDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining;
  } else {
    return 0;
  }
};
</script>
<style scoped>
.contract-card:hover {
  background-color: #f5f5f5;
}
</style>
