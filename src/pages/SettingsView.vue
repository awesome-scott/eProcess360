<template>
  <q-page>
    <q-breadcrumbs align="center" class="q-py-md">
      <q-breadcrumbs-el
        v-for="breadcrumb of breadcrumbs"
        :key="breadcrumb.label"
        :label="breadcrumb.label"
        :to="breadcrumb.to"
      />
    </q-breadcrumbs>
    <q-separator />
    <div class="row q-mt-md">
      <div class="col-4">
        <component
          :is="$q.screen.gt.sm ? 'div' : 'q-btn'"
          flat
          dense
          icon="menu"
        >
          <component :is="$q.screen.gt.sm ? 'div' : 'q-menu'">
            <q-list dense>
              <template v-for="item in menu" :key="item.label">
                <q-expansion-item
                  v-if="item.children"
                  :label="item.label"
                  :icon="item.icon"
                  :expand-separator-visible="true"
                  group="level_1"
                  v-model="item.expanded"
                  :class="item.expanded ? 'expanded' : ''"
                  @click="expandItem(item)"
                >
                  <q-list dense class="q-pl-md">
                    <template v-for="child in item.children" :key="child.label">
                      <q-expansion-item
                        v-if="child.children"
                        :label="child.label"
                        :icon="child.icon"
                        :expand-separator-visible="true"
                        group="level_2"
                        v-model="child.expanded"
                        class="child"
                        :class="child.expanded ? 'expanded' : ''"
                        @click="expandItem(child)"
                      >
                        <q-list dense class="q-pl-md">
                          <q-item
                            v-for="nestedChild in child.children"
                            :key="nestedChild.label"
                            :class="{ selected: isSelected(nestedChild) }"
                            clickable
                            v-ripple
                            @click="selectItem(nestedChild)"
                          >
                            <q-item-section avatar>
                              <q-icon :name="nestedChild.icon" />
                            </q-item-section>
                            <q-item-section>{{
                              nestedChild.label
                            }}</q-item-section>
                          </q-item>
                        </q-list>
                      </q-expansion-item>
                      <q-item
                        v-else
                        :class="{ selected: isSelected(child) }"
                        clickable
                        v-ripple
                        @click="selectItem(child)"
                      >
                        <q-item-section avatar>
                          <q-icon :name="child.icon" />
                        </q-item-section>
                        <q-item-section>{{ child.label }}</q-item-section>
                      </q-item>
                    </template>
                  </q-list>
                </q-expansion-item>
                <q-item
                  v-else
                  :class="{ selected: isSelected(item) }"
                  clickable
                  v-ripple
                  @click="selectItem(item)"
                >
                  <q-item-section avatar>
                    <q-icon :name="item.icon" />
                  </q-item-section>
                  <q-item-section>{{ item.label }}</q-item-section>
                </q-item>
              </template>
            </q-list>
          </component>
        </component>
      </div>
      <div class="col-12 col-md-8">
        <h4 class="text-center">{{ selectedItem.label }}</h4>
        <div class="q-pa-lg">
          <SettingsInfo v-if="selectedItem.label === 'Info'" />
          <SettingsAllDepartments
            v-else-if="selectedItem.label === 'All Departments'"
          />
          <SettingsWorkflows v-else-if="selectedItem.label === 'Workflows'" />
          <q-skeleton v-else type="rect" width="100%" height="400px" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import SettingsInfo from "components/SettingsInfo.vue";
import SettingsAllDepartments from "components/SettingsAllDepartments.vue";
import SettingsWorkflows from "components/SettingsWorkflows.vue";
import { ref } from "vue";

import { useAppStore } from "stores/app";

const appStore = useAppStore();
appStore.pageNotes = `<p>The Settings menu should be easy to navigate clearly indicating where in the structure the user is.</p>
<p>Only endpoints should have information and fields, so selecting a parent should take you to the first child of that element. For that reason 'All Departments' should be a separate page.</p>
<p>I would also refrain from putting navigation buttons on pages, as the menu should be straightforward enough.</p>`;

const menu = ref([
  {
    label: "General",
    icon: "apartment",
    expanded: true,
    children: [
      { label: "Info", icon: "edit" },
      { label: "Logos", icon: "center_focus_strong" },
      { label: "Templates", icon: "description" },
      { label: "Authentication", icon: "lock" },
    ],
  },
  {
    label: "Departments",
    icon: "home_work",
    expanded: false,
    children: [
      { label: "All Departments", icon: "assured_workload" },
      {
        label: "Building Department",
        icon: "account_balance",
        expanded: false,
        children: [
          { label: "Info", icon: "edit" },
          { label: "Logos", icon: "center_focus_strong" },
          { label: "Members", icon: "groups" },
          { label: "Templates", icon: "description" },
          { label: "Reviews", icon: "thumb_up" },
          { label: "Inspections", icon: "person_search" },
          { label: "Fees", icon: "attach_money" },
          { label: "Workflows", icon: "route" },
        ],
      },
      {
        label: "Planning Department",
        icon: "account_balance",
        expanded: false,
        children: [
          { label: "Info", icon: "edit" },
          { label: "Logos", icon: "center_focus_strong" },
          { label: "Members", icon: "groups" },
          { label: "Templates", icon: "description" },
          { label: "Reviews", icon: "thumb_up" },
          { label: "Inspections", icon: "person_search" },
          { label: "Fees", icon: "attach_money" },
          { label: "Workflows", icon: "route" },
        ],
      },
      {
        label: "Fire Department",
        icon: "account_balance",
        expanded: false,
        children: [
          { label: "Info", icon: "edit" },
          { label: "Logos", icon: "center_focus_strong" },
          { label: "Members", icon: "groups" },
          { label: "Templates", icon: "description" },
          { label: "Reviews", icon: "thumb_up" },
          { label: "Inspections", icon: "person_search" },
          { label: "Fees", icon: "attach_money" },
          { label: "Workflows", icon: "route" },
        ],
      },
    ],
  },
  { label: "Users", icon: "groups", expanded: false },
  { label: "Communications", icon: "drafts", expanded: false },
  { label: "Contracts", icon: "document_scanner", expanded: false },
  {
    label: "Datasource",
    icon: "dns",
    expanded: false,
    children: [
      { label: "General", icon: "dns" },
      { label: "Secrets", icon: "lock" },
    ],
  },
  { label: "File Manager", icon: "folder", expanded: false },
  { label: "GIS", icon: "travel_explore", expanded: false },
  {
    label: "Time Management",
    icon: "timer",
    expanded: false,
    children: [
      { label: "Time Entry", icon: "more_time" },
      { label: "Locks", icon: "lock" },
      { label: "Reporting Structure", icon: "account_tree" },
      { label: "Cost Centers", icon: "paid" },
    ],
  },
]);

const selectedItem = ref(menu.value[0].children[0]);

const expandItem = (item) => {
  if (item.children[0].children) {
    selectedItem.value = null;
  } else {
    selectedItem.value = item.children[0];
  }

  selectItem(item.children[0]);
};

const selectItem = (item) => {
  selectedItem.value = item;
  const selectedAncestors = findAncestors(item, menu.value);
  const breadcrumbLabels = selectedAncestors.map((ancestor) => ancestor.label);
  breadcrumbLabels.push(item.label);
  breadcrumbs.value = [
    { label: "Home", to: "/" },
    { label: "Settings" },
    ...breadcrumbLabels.map((label) => ({ label })),
  ];
  closeNonParentItems(item);
};
const closeNonParentItems = (item, items = menu.value) => {
  const ancestors = findAncestors(item, items);

  items.forEach((parentItem) => {
    if (parentItem.children) {
      if (ancestors.includes(parentItem) || isParentOf(item, parentItem)) {
        parentItem.expanded = true;
        closeNonParentItems(item, parentItem.children);
      } else {
        parentItem.expanded = false;
      }
    }
  });
};

const findAncestors = (item, items, ancestors = []) => {
  items.forEach((parentItem) => {
    if (parentItem.children) {
      if (parentItem.children.includes(item)) {
        ancestors.push(parentItem);
        findAncestors(parentItem, items, ancestors);
      } else {
        findAncestors(item, parentItem.children, ancestors);
      }
    }
  });
  return ancestors;
};

const isParentOf = (child, parent) => {
  if (parent.children && parent.children.includes(child)) {
    return true;
  }
  for (let subItem of parent.children || []) {
    if (isParentOf(child, subItem)) {
      return true;
    }
  }
  return false;
};

const isSelected = (item) => {
  return selectedItem.value === item;
};

const breadcrumbs = ref([{ label: "Home", to: "/" }, { label: "Settings" }]);
</script>

<style scoped>
.expanded {
  background-color: rgba(38, 166, 154, 0.1);
}
.child.expanded {
  background-color: rgba(38, 166, 154, 0.1);
}
.selected {
  background-color: rgb(25, 118, 210);
  color: white;
}
</style>
