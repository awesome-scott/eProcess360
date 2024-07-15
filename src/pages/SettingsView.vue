<template>
  <q-page>
    <h3 class="text-center">Settings</h3>
    <div class="row">
      <div class="col-4">
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
                        <q-item-section>{{ nestedChild.label }}</q-item-section>
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
      </div>
      <div class="col-8">
        <h4 class="text-center">{{ selectedItem.label }}</h4>
        <div class="q-pa-lg">
          <q-skeleton type="rect" width="100%" height="400px" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";

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
