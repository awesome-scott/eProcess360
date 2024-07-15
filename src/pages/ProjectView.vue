<template>
  <q-page padding>
    <q-breadcrumbs align="center" class="q-py-md">
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Permit: ###-###-##" />
    </q-breadcrumbs>
    <header class="q-pa-sm text-center">
      <h3>Permit ###-###-#</h3>
      <h4>Permit Type</h4>
    </header>
    <section class="details row">
      <div class="q-pa-sm col-12 col-sm-6 order-last text-right">
        <div>Created: 04/01/2024</div>
        <div>Modified: 04/02/2024</div>
      </div>
      <section class="q-pa-sm col-12 col-sm-6 order-first">
        <div>John Watson</div>
        <div>221B Baker St.</div>
        <div>Ogden, UT 84403</div>
      </section>
    </section>
    <StepperNavigation
      :stages="stages"
      :activeStage="activeStage"
      :activeStep="activeStep"
    />
    <div class="row">
      <div class="col-12 col-sm-6 q-pa-sm text-center">
        <h5>Application Progress</h5>
        <h6>Stage / Step</h6>
        <q-btn
          to="permit/step"
          label="Continue Application"
          icon-right="arrow_right_alt"
          color="secondary"
        />
      </div>
      <div class="col-12 col-sm-6 q-pa-sm text-center">
        <h5>Hours</h5>
        <h6>Total: 171.5</h6>
        <q-btn
          to="/project/hours"
          label="View Hours"
          icon-right="timer"
          color="secondary"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import StepperNavigation from "components/StepperNavigation.vue";

defineOptions({
  name: "PermitsView",
});
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
<style lang="scss" scoped></style>
