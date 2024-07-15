<template>
  <q-page padding>
    <q-breadcrumbs align="center" class="q-py-md">
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Permit: ###-###-##" to="/permits" />
      <q-breadcrumbs-el label="Application" />
      <q-breadcrumbs-el label="Applicant Details" />
    </q-breadcrumbs>
    <div class="q-px-md">
      <StepperNavigation
        :stages="stages"
        :activeStage="activeStage"
        :activeStep="activeStep"
      />
    </div>
    <div class="q-pa-sm">
      <h3 class="text-center">Applicant Details</h3>
      <div class="actions-top row flex-center q-gutter-md q-mb-md">
        <q-btn label="Back" color="grey" class="q-mt-md" icon="arrow_back" />
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
          <h6>Applicant</h6>
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
            aria-disabled="true"
            disabled
            class="q-mt-md"
            icon="arrow_back"
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

defineOptions({
  name: "StepView",
});

const data = {
  floors: "",
};

const stages = [
  {
    name: "Stage 1",
    done: true,
    steps: [
      { name: "Step 1.1", done: true },
      { name: "Step 1.2", done: true },
    ],
  },
  {
    name: "Stage 2",
    current: true,
    steps: [{ name: "Step 2.1", current: true }, { name: "Step 2.2" }],
  },
  { name: "Stage 3", steps: [{ name: "Step 3.1" }, { name: "Step 3.2" }] },
];
const activeStage = "Stage 2";
const activeStep = "Step 2.1";
</script>
<style lang="scss"></style>
