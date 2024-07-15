<template>
  <q-stepper
    flat
    v-model:model-value="activeStep"
    header-nav
    alternative-labels
    :vertical="$q.screen.lt.sm"
    header-class="is-stage"
  >
    <q-step
      v-for="(step, index) in filteredSteps"
      :key="index"
      :name="step.name"
      :title="step.isStage ? step.name : ''"
      :caption="step.isStage ? '' : step.name"
      :done="step.done"
      v-bind="{ disabled: !step.done && !step.current ? true : undefined }"
      error
      error-color="secondary"
      :error-icon="getIcon(step)"
      :header-nav="step.done || step.current"
      active-color="primary"
      :class="{ 'is-stage': step.isStage }"
    />
  </q-stepper>
</template>

<script setup>
// Hackish setup using error-icon to get rid of bubble behind icon.
// Hackish setup using captions and titles to distinguish stage vs. step. since :class doesn't work for horizontal
// Clearly a bug in quasar's implementation of vertical
import { ref, computed, watch } from "vue";

const props = defineProps({
  stages: {
    type: Array,
    required: true,
  },
  activeStage: {
    type: String,
    required: true,
  },
  activeStep: {
    type: String,
    required: true,
  },
});

const activeStage = ref(props.activeStage);
const activeStep = ref(props.activeStep);

watch(
  () => props.activeStage,
  (newVal) => {
    activeStage.value = newVal;
  }
);

watch(
  () => props.activeStep,
  (newVal) => {
    activeStep.value = newVal;
  }
);

watch(activeStep, (newValue, oldValue) => {
  // Check if newValue corresponds to a stage
  const clickedStage = props.stages.find((stage) => stage.name === newValue);

  if (clickedStage) {
    // Check if stage is not disabled
    if (clickedStage.done || clickedStage.current) {
      // Update activeStage to the new stage name
      activeStage.value = newValue;

      // Set activeStep to the first step of the new stage
      const firstStep = clickedStage.steps[0];
      if (firstStep) {
        activeStep.value = firstStep.name;
      }
    } else {
      // Reset activeStep if stage is disabled
      activeStep.value = oldValue;
    }
  } else {
    // Find the step in props.stages and check if it's disabled
    const isStepDisabled = props.stages
      .flatMap((stage) => stage.steps)
      .some((step) => step.name === newValue && !(step.done || step.current));

    if (!isStepDisabled) {
      // Update activeStep to the new step name
      activeStep.value = newValue;
    } else {
      // Reset activeStep if step is disabled
      activeStep.value = oldValue;
    }
  }
});

const filteredSteps = computed(() => {
  let flatSteps = [];

  // Determine the active stage based on the activeStage
  props.stages.forEach((stage) => {
    flatSteps.push({
      name: stage.name,
      isStage: true,
      done: stage.done,
      current: stage.current,
      isActive: stage.name === activeStage.value,
    });

    if (stage.name === activeStage.value) {
      stage.steps.forEach((step) => {
        flatSteps.push({
          name: step.name,
          done: step.done,
          current: step.current,
          isActive: step.name === activeStep.value,
        });
      });
    }
  });
  return flatSteps;
});

const getIcon = (step) => {
  if (step.isStage && step.done) {
    return "check_box"; // Stage is complete
  } else if (step.isStage && step.current) {
    return "indeterminate_check_box"; // Stage is current
  } else if (step.isStage) {
    return "check_box_outline_blank"; // Stage is disabled
  } else if (step.done) {
    return "check_circle"; // Step is complete
  } else if (step.current) {
    return "radio_button_checked"; // Step is current
  } else {
    return "radio_button_unchecked"; // Step is disabled
  }
};
</script>
<style lang="scss">
.q-stepper__tab {
  padding-left: 0 !important;
  padding-right: 0 !important;
  flex-shrink: 2;
  align-self: flex-end;
  &.is-stage {
    flex-grow: 2;
    align-self: center;
  }
}
.is-stage {
  .q-stepper__title {
    font-size: 1.4em;
    font-weight: bold;
  }
}
.q-stepper--horizontal .q-stepper__content {
  display: none !important;
}
.q-stepper__step-content {
  display: none;
}
</style>
