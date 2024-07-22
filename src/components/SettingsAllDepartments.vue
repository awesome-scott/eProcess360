<template>
  <div class="row justify-end q-mb-md">
    <q-btn color="secondary" label="Add New Department" icon="add" />
  </div>
  <div class="row q-col-gutter-md q-mt-md">
    <div
      v-for="department in departments"
      :key="department.name"
      class="col-12 col-md-4"
    >
      <q-card>
        <q-item-label
          header
          :class="`bg-${department.color}`"
          class="text-white text-center q-pa-md"
          >{{ department.name }}</q-item-label
        >
        <q-card-section>
          <div class="row q-mb-md items-center">
            <q-icon name="location_on" class="q-mr-md" />
            <div class="column">
              <div>{{ department.address }}</div>
              <div>
                {{ department.city }}, {{ department.state }}
                {{ department.zipcode }}
              </div>
            </div>
          </div>
          <div class="row q-mb-md items-center">
            <q-icon name="phone" class="q-mr-md" />
            <div>{{ department.phoneNumber }}</div>
          </div>
          <div class="row q-mb-md items-center">
            <q-icon name="email" class="q-mr-md" />
            <div>{{ department.email }}</div>
          </div>
          <div class="row q-mb-md items-center">
            <q-icon name="people" class="q-mr-md" />
            <div>{{ department.members }} Members</div>
          </div>
          <div class="row items-center">
            <q-icon name="route" class="q-mr-md" />
            <div>{{ department.workflows }} Workflows</div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn
            flat
            label="Delete Department"
            icon="delete"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script setup>
const departments = [
  {
    name: "Building Deparment",
    color: "purple-4",
    address: "123 Main St.",
    city: "New York",
    state: "NY",
    zipcode: "10001",
    phoneNumber: "555-1234",
    email: "email@here.com",
    members: 22,
    workflows: 14,
  },
  {
    name: "Planning Department",
    color: "green-4",
    address: "221B Baker St.",
    city: "New York",
    state: "NY",
    zipcode: "10001",
    phoneNumber: "555-1234",
    email: "another@here.com",
    members: 34,
    workflows: 10,
  },
  {
    name: "Fire Department",
    color: "red-4",
    address: "888 Central Ave.",
    city: "New York",
    state: "NY",
    zipcode: "10001",
    phoneNumber: "555-1234",
    email: "someone@city.gov",
    members: 12,
    workflows: 5,
  },
];
</script>
