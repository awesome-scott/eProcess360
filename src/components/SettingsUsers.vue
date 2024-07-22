<template>
  <div class="row q-col-gutter-md">
    <q-table
      dense
      :grid="$q.screen.lt.md"
      class="col-12"
      :rows="users"
      :columns="columns"
      row-key="email"
      card-container-class="q-col-gutter-md"
    >
      <template v-slot:body-cell-groups="props">
        <q-td :props="props">
          {{ props.row.groups.slice(0, 2).join(", ") }}
          <q-tooltip v-if="props.row.groups.length > 3"
            ><p v-for="group of props.row.groups" :key="group">
              {{ group }}
            </p></q-tooltip
          ><span v-if="props.row.groups.length > 2">...</span>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat dense icon="edit" color="secondary" />
          <q-btn flat dense icon="delete" color="negative" />
        </q-td>
      </template>
      <template #item="{ row }">
        <div class="col-12">
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ row.name }}</div>
              <div class="text-subtitle2">{{ row.email }}</div>
            </q-card-section>
            <q-card-section>
              <div class="row items-center">
                <q-icon name="work" class="q-mr-md" />
                <div>{{ row.title }}</div>
              </div>
              <div class="row items-center">
                <q-icon name="group" class="q-mr-md" />
                <div>{{ row.groups.length }} Groups</div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <q-btn flat label="Edit User" icon="edit" color="secondary" />
              <q-btn flat label="Delete User" icon="delete" color="negative" />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
const users = [
  {
    name: "John Doe",
    email: "jd@wc-3.com",
    title: "Plan Reviewer",
    groups: [
      "Admins",
      "Plan Reviewers",
      "Building Department",
      "Fire Department",
      "Planning Department",
      "Permit Techs",
    ],
  },
  {
    name: "Jane Doe",
    email: "jd@city.gov",
    title: "Staff",
    groups: ["Permit Techs", "Admins"],
  },
  {
    name: "Jimi Hendrix",
    email: "user1@cit.gov",
    title: "Plan Reviewer",
    groups: ["Planning Department", "Plan Reviewers"],
  },
  {
    name: "Kevin Smith",
    email: "user2@cit.gov",
    title: "Inspector",
    groups: ["Building Department", "Inspectors"],
  },
  {
    name: "Jacob Jinglheimer",
    email: "user3@cit.gov",
    title: "Staff",
    groups: ["Fire Department"],
  },
  {
    name: "Christopher Kringle",
    email: "user30@cit.gov",
    title: "Staff",
    groups: ["Building Department", "Planning Department"],
  },
];
const columns = ref([
  { name: "name", label: "Name", align: "left", field: "name" },
  { name: "email", label: "Email", align: "left", field: "email" },
  { name: "title", label: "Title", align: "left", field: "title" },
  { name: "groups", label: "Groups", align: "left", field: "groups" },
  { name: "actions", label: "Actions" },
]);
const groups = computed(() => {
  const allGroups = users.reduce((acc, user) => {
    if (user.groups) {
      user.groups.forEach((group) => {
        if (!acc.includes(group)) {
          acc.push(group);
        }
      });
    }
    return acc;
  }, []);
  return allGroups;
});
</script>
