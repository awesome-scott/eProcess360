<template>
  <q-stepper
    animated
    flat
    v-model:model-value="current"
    header-nav
    alternative-labels
    :vertical="$q.screen.lt.sm"
  >
    <q-step
      v-for="(step, index) of filteredSteps"
      :key="index"
      :name="step.name"
      :title="step.isStage ? step.name : ''"
      :done="step.done"
      done-color="positive"
      v-bind="{ disabled: !step.done && !step.current ? true : undefined }"
      active-color="primary"
    />
  </q-stepper>
</template>

<script setup>
// TODO: this still isn't great, but the component won't allow custom classes or multiple active steps.
import { computed, ref, watch } from "vue";

const stages = [
  {
    name: "Application",
    done: true,
    steps: [
      { name: "Information", done: true },
      { name: "Submittals", done: true },
      { name: "More Details", done: true },
    ],
  },
  {
    name: "Application Fee",
    done: true,
  },
  { name: "Intake Checklist", done: true },
  { name: "Review", done: true },
  {
    name: "Issuance",
    steps: [
      { name: "BPC Checklist", done: true },
      { name: "Permit Issuance", current: true },
    ],
  },
  { name: "Inspection" },
  { name: "Final" },
];
const current = ref(null);
const previouslySelectedStage = ref(null);

const filteredSteps = computed(() => {
  let flatSteps = [];
  stages.forEach((stage) => {
    flatSteps.push({
      name: stage.name,
      title: stage.name,
      isStage: true,
      done: stage.done,
      current: stage.current,
    });

    if (
      stage.steps &&
      current.value &&
      current.value.startsWith(stage.name + "-")
    ) {
      stage.steps.forEach((step) => {
        flatSteps.push({
          name: stage.name + "-" + step.name,
          title: "",
          isStage: false,
          done: step.done,
          current: step.current,
        });
      });
    }
  });
  return flatSteps;
});

// Watch for changes in the current step
watch(current, (newVal, oldVal) => {
  // Check if the current step is a stage with steps
  const selectedStage = stages.find((stage) => stage.name === newVal);
  if (selectedStage && selectedStage.steps && selectedStage.steps.length > 0) {
    // If the stage has steps and it wasn't previously selected, select the first step
    if (newVal !== previouslySelectedStage.value) {
      current.value = `${selectedStage.name}-${selectedStage.steps[0].name}`;
      previouslySelectedStage.value = selectedStage.name;
    }
  } else {
    // Update previouslySelectedStage if a non-stage step is selected
    previouslySelectedStage.value = null;
  }
});
</script>

<style>
.q-stepper--horizontal .q-stepper__tab {
  min-height: auto;
  padding: 0;
}
.is-stage {
  transform: scale(1.3);
}
.is-step {
  transform: scale(0.3);
}
</style>
