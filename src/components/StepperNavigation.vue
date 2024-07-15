<template>
  {{ localActiveStep }}
  {{ activeStep }}
  <q-stepper
    flat
    v-model:model-value="localActiveStep"
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
      :class="step.isStage ? 'is-stage' : 'is-step'"
    />
  </q-stepper>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const emit = defineEmits(["update:activeStage", "update:activeStep"]);

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

const localActiveStage = ref(props.activeStage);
const localActiveStep = ref(props.activeStep);

watch(
  () => props.activeStage,
  (newVal) => {
    localActiveStage.value = newVal;
  }
);

watch(
  () => props.activeStep,
  (newVal) => {
    localActiveStep.value = newVal;
  }
);

const onStepChange = (newValue) => {
  const oldValue = localActiveStep.value;

  // Check if newValue corresponds to a stage
  const clickedStage = props.stages.find((stage) => stage.name === newValue);

  if (clickedStage) {
    // Check if stage is not disabled
    if (clickedStage.done || clickedStage.current) {
      // Update activeStage to the new stage name
      localActiveStage.value = newValue;
      emit("update:activeStage", newValue);

      // Set activeStep to the first step of the new stage
      const firstStep = clickedStage.steps[0];
      if (firstStep) {
        localActiveStep.value = firstStep.name;
        emit("update:activeStep", firstStep.name);
      }
    } else {
      // Reset activeStep if stage is disabled
      localActiveStep.value = oldValue;
      emit("update:activeStep", oldValue);
    }
  } else {
    // Find the step in props.stages and check if it's disabled
    const isStepDisabled = props.stages
      .flatMap((stage) => stage.steps)
      .some((step) => step.name === newValue && !(step.done || step.current));

    if (!isStepDisabled) {
      // Update activeStep to the new step name
      localActiveStep.value = newValue;
      emit("update:activeStep", newValue);
    } else {
      // Reset activeStep if step is disabled
      localActiveStep.value = oldValue;
      emit("update:activeStep", oldValue);
    }
  }
};

watch(localActiveStep, (newValue) => {
  onStepChange(newValue);
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
      isActive: stage.name === localActiveStage.value,
    });

    if (stage.name === localActiveStage.value) {
      stage.steps.forEach((step) => {
        flatSteps.push({
          name: step.name,
          done: step.done,
          current: step.current,
          isActive: step.name === localActiveStep.value,
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
