<template>
  <q-page padding>
    <q-breadcrumbs align="center" class="q-py-md">
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Permit: ###-###-##" to="/project" />
      <q-breadcrumbs-el label="Application" />
      <q-breadcrumbs-el label="Applicant Details" />
    </q-breadcrumbs>
    <div class="q-px-md">
      <StepperNavigation />
    </div>
    <div class="q-pa-sm">
      <h3 class="text-center">Applicant Details</h3>
      <div class="actions-top row flex-center q-gutter-md q-mb-md">
        <q-btn
          label="Back"
          color="grey"
          class="q-mt-md"
          icon="arrow_back"
          to="/project/"
        />
        <q-btn
          type="submit"
          label="Save"
          color="secondary"
          class="q-mt-md"
          icon-right="save"
        />
        <q-btn
          type="submit"
          label="Save & Continue"
          color="primary"
          class="q-mt-md"
          icon-right="arrow_forward"
        />
      </div>
      <q-form>
        <q-card class="q-pa-md q-mb-md">
          <h6>Contact Information</h6>
          <q-input label="Name" outlined clearable class="q-mb-md" />
          <q-input label="Email" outlined clearable class="q-mb-md" />
          <q-input label="Phone" outlined clearable class="q-mb-md" />
        </q-card>
        <q-card class="q-pa-md q-mb-md">
          <h6>Mailing Address</h6>

          <q-input label="Address" outlined clearable class="q-mb-md" />
          <q-input label="City" outlined clearable class="q-mb-md" />
          <q-input label="State" outlined clearable class="q-mb-md" />
          <q-input label="Zip" outlined clearable class="q-mb-md" />
        </q-card>
        <q-card class="q-pa-md q-mb-md">
          <h6>Project Details</h6>
          <q-input label="Project Name" outlined class="q-mb-md" />
          <q-input
            label="Project Description"
            outlined
            class="q-mb-md"
            multi-line
          />
          <q-select
            v-model="data.floors"
            label="Number of Floors"
            outlined
            :options="['1', '2', '3 or more']"
            class="q-mb-md"
          />
          <q-input label="Valuation" outlined class="q-mb-md" type="number">
            <template v-slot:prepend>
              <q-icon name="attach_money" />
            </template>
            <template v-slot:append> .00 </template>
          </q-input>
        </q-card>
        <div class="row flex-center q-gutter-md">
          <q-btn
            label="Back"
            color="grey"
            class="q-mt-md"
            icon="arrow_back"
            to="/project/"
          />
          <q-btn
            type="submit"
            label="Save"
            color="secondary"
            class="q-mt-md"
            icon-right="save"
          />
          <q-btn
            type="submit"
            label="Save & Continue"
            color="primary"
            class="q-mt-md"
            icon-right="arrow_forward"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script setup>
import StepperNavigation from "components/StepperNavigation.vue";

import { useAppStore } from "stores/app";

const appStore = useAppStore();
appStore.pageNotes = `<p>See the <code>/project</code> page for notes on the stepper ui.</p>
<p>Users should have a back, save, and save & continue (disabled until all required fields are filled) at the top and bottom of the form.</p>
<p>Obviously using a form builder presents layout/UI complications. Simpler layouts should be prioritized (probably avoiding tabs and accordians)</p>`;

defineOptions({
  name: "StepView",
});

const data = {
  floors: "",
};
</script>
<style lang="scss"></style>
