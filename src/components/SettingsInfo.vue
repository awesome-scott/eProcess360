<template>
  <div class="row justify-end q-mb-md">
    <q-btn
      v-if="edit"
      color="positive"
      label="Save"
      icon="save"
      @click="edit = false"
    />
    <q-btn
      v-else
      color="secondary"
      label="Edit"
      icon="edit"
      @click="edit = true"
    />
  </div>
  <div v-if="edit">
    <q-form class="column q-gutter-md">
      <q-input filled v-model="address.street" label="Street" />
      <q-input filled v-model="address.city" label="City" />
      <q-input filled v-model="address.state" label="State" />
      <q-input filled v-model="address.zipcode" label="Zipcode" />
      <q-separator />
      <q-input filled v-model="phoneNumber" label="Phone Number" type="tel" />
      <q-separator />
      <q-input filled v-model="email" label="Email Address" type="email" />
    </q-form>
  </div>
  <div v-else>
    <h6 class="text-left">Contact Info:</h6>
    <div class="row q-my-md items-center">
      <q-icon name="location_on" class="q-mr-md" />
      <div class="column">
        <div>{{ address.street }}</div>
        <div>{{ address.city }}, {{ address.state }} {{ address.zipcode }}</div>
      </div>
    </div>
    <div class="row q-my-md items-center">
      <q-icon name="phone" class="q-mr-md" />
      <div>{{ phoneNumber }}</div>
    </div>
    <div class="row q-my-md items-center">
      <q-icon name="email" class="q-mr-md" />
      <div>{{ email }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const edit = ref(false);
const address = ref({
  street: "123 Main St",
  city: "New York",
  state: "NY",
  zipcode: "10001",
});
const phoneNumber = ref("555-1234");
const email = ref("email@here.com");
</script>
