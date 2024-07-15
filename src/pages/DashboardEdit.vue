<template>
  <q-page padding>
    <h3>Dashboard Management</h3>
    <div class="row justify-center q-mb-md">
      <q-select
        v-model="selectedDashboard"
        label="Select Dashboard"
        outlined
        :options="[
          'Permits Overview',
          'Inspections Overview',
          'Add New Dashboard',
        ]"
        style="width: 30ch"
      />
    </div>
    <div class="row justify-center q-gutter-sm">
      <q-btn label="Delete Dashboard" icon-right="delete" color="red" />
      <q-btn label="Add Widget" icon-right="add" color="secondary" />
      <q-btn
        label="Save Layout"
        icon-right="save"
        color="green"
        to="/dashboard"
      />
    </div>
    <div
      v-if="selectedDashboard === 'Permits Overview'"
      class="row charts q-col-gutter-lg q-mt-md text-center justify-center"
    >
      <div class="col-4">
        <BarChart :chartData="barChartData" :options="chartOptions" />
      </div>
      <div class="col-4">
        <LineChart :chartData="lineChartData" :options="chartOptions" />
      </div>
    </div>
    <div
      v-if="selectedDashboard === 'Inspections Overview'"
      class="row charts q-col-gutter-lg justify-center"
    >
      <div class="col-4">
        <LineChart :chartData="lineChartData" :options="chartOptions" />
      </div>
      <div class="col-4">
        <BarChart :chartData="barChartData" :options="chartOptions" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { BarChart, LineChart } from "vue-chart-3";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController,
} from "chart.js";

// Register the necessary controllers, elements, and scales
ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController
);

const selectedDashboard = ref("Permits Overview");

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const barChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const lineChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.1,
    },
  ],
};
</script>
