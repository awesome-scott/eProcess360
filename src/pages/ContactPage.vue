<template>
  <q-page padding>
    <h3 class="text-center">Contact Form</h3>
    <div class="text-center">
      <p>
        For any inquiries, please feel free to contact us using the form below:
      </p>
    </div>
    <div class="row justify-center">
      <q-card class="q-pa-lg col-12 col-md-6">
        <q-form @submit="submitForm">
          <q-card-section>
            <div class="text-h6">Contact Us</div>
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <q-input filled v-model="formData.name" label="Name" />
            <q-input filled v-model="formData.email" label="Email" />
            <q-input filled v-model="formData.message" label="Message" />
          </q-card-section>
          <q-card-actions align="center">
            <q-btn type="submit" label="Submit" color="primary" icon="email" />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({
  name: "",
  email: "",
  message: "",
});
</script>
