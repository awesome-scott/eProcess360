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
    <StepperNavigation />
    <div class="row">
      <div class="col-12 col-sm-6 q-pa-sm text-center">
        <h5>Application Progress</h5>
        <h6>Stage / Step</h6>
        <q-btn
          to="project/step"
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

import { useAppStore } from "stores/app";

const appStore = useAppStore();
appStore.pageNotes = `<p>I'm still working out best UI for the Stepper. I've termed "Stages" and "Steps". Steps should only be shown if the current Stage is 'active' and should be smaller than the stages (The Stage should also show as active.). I'm uncertain if the step labels need to be shown, but they probably do, making the stepper too cumbersome if the workflow has many stages & steps</p>
<p>I'm also unsure of what other details besides applicant info, dates and progress should be shown on this overview page, but I think that it needs to be it's own page rather than throwing the user straight into the workflow.</p>`;

defineOptions({
  name: "PermitsView",
});
</script>
<style lang="scss" scoped></style>
