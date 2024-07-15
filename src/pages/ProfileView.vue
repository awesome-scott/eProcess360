<template>
  <q-page padding>
    <h3 class="text-center">Profile</h3>
    <div class="row q-pa-md q-col-gutter-md">
      <div class="col-12 col-sm-6">
        <q-card class="q-pa-sm">
          <h6>Profile Details</h6>
          <q-input
            v-model="profile.name"
            label="Name"
            filled
            clearable
            class="q-mb-md"
          />
          <q-input
            v-model="profile.email"
            label="Email"
            filled
            clearable
            class="q-mb-md"
          />
          <q-input
            v-model="profile.phone"
            label="Phone"
            filled
            clearable
            class="q-mb-md"
          />
        </q-card>
      </div>
      <div class="col-12 col-sm-6">
        <q-card class="q-pa-sm">
          <h6>Role Details</h6>
          <h6 class="text-left">Department(s)</h6>
          <q-option-group
            v-model="profile.departments"
            label="Departments"
            type="checkbox"
            :options="departmentOptions"
            option-value="value"
            option-label="label"
          />
          <h6 class="text-left q-mt-sm">Role(s)</h6>
          <q-option-group
            v-model="profile.roles"
            label="Roles"
            type="checkbox"
            :options="roleOptions"
            option-value="value"
            option-label="label"
          />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const profile = ref({
  name: "John Doe",
  email: "jdoe@eprocess360.com",
  phone: "123-456-7890",
  departments: ["Building Department", "Fire Department"],
  roles: ["Admin", "Plan Reviewer"],
});

const departmentOptions = [
  { value: "Building Department", label: "Building Department" },
  { value: "Fire Department", label: "Fire Department" },
  { value: "Planning Department", label: "Planning Department" },
];

const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "Plan Reviewer", label: "Plan Reviewer" },
  { value: "Inspector", label: "Inspector" },
  { value: "Clerk", label: "Clerk" },
];
</script>
