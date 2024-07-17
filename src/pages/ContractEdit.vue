<template>
  <q-page padding>
    <q-breadcrumbs align="center" class="q-py-md">
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Contracts" to="/contracts" />
      <q-breadcrumbs-el label="Client ? Contract # ?" />
    </q-breadcrumbs>
    <h3>Contract</h3>
    <div class="row justify-center q-gutter-sm q-mb-md">
      <q-btn
        label="Cancel"
        icon="cancel"
        color="negative"
        @click="$router.push('/contract')"
      />
      <q-btn
        label="Save"
        icon="save"
        color="green"
        @click="$router.push('/contract')"
      />
    </div>
    <q-card class="bg-orange text-center text-white q-pa-sm q-mb-sm">
      Days Left In Contract<br />
      <h4 class="text-white">22</h4>
    </q-card>
    <q-form>
      <div class="row q-col-gutter-md">
        <div class="q-mb-md col-12 col-sm-6 q-gutter-sm">
          <h5>Client Details</h5>
          <q-input filled v-model="formData.client" label="Client" />
          <q-select
            filled
            v-model="formData.department"
            label="Department"
            :options="[
              'Building Department',
              'Planning Department',
              'Fire Department',
            ]"
          />
          <q-input
            filled
            v-model="formData.primaryContact"
            label="Primary Contact"
          />
          <q-input filled type="tel" v-model="formData.phone" label="Phone" />
          <q-input filled type="email" v-model="formData.email" label="Email" />
        </div>
        <div class="q-mb-md col-12 col-sm-6 q-gutter-sm">
          <h5>Contract Details</h5>
          <q-select
            filled
            v-model="formData.status"
            label="Status"
            :options="['Active', 'Canceled', 'Expired', 'Other']"
          />
          <q-input filled v-model="formData.value" label="Value" />
          <q-input filled v-model="formData.start" label="Start" />
          <q-input filled v-model="formData.end" label="End" />
          <q-input filled v-model="formData.modified" label="Modified" />
        </div>
        <div class="q-mb-md col-12 col-sm-6 q-gutter-sm">
          <h5>Contractors</h5>
          <div
            v-for="(contractor, index) in contractors"
            :key="contractor.name"
            class="q-mb-sm row"
          >
            <div class="col">
              <div>
                <strong>{{ contractor.title }}:</strong> {{ contractor.name }}
              </div>
              <div>{{ contractor.email }}</div>
              <div>{{ contractor.phone }}</div>
            </div>
            <div class="col q-gutter-sm self-start text-right">
              <q-btn
                dense
                color="secondary"
                icon="edit"
                @click="
                  isAddContractorDialogOpen = true;
                  selectedContractorIndex = index;
                  selectedContractor = { ...contractor };
                "
              />
              <q-btn
                color="negative"
                dense
                icon="delete"
                @click="deleteContractor(contractor)"
              />
            </div>
          </div>
          <div class="text-center">
            <q-btn
              label="Add Contractor"
              color="primary"
              icon="add"
              @click="isAddContractorDialogOpen = true"
            />
          </div>
        </div>
        <div class="q-mb-md col-12 col-sm-6 q-gutter-sm">
          <h5>Reminders</h5>
          <div
            v-for="reminder in reminders"
            :key="reminder.subject"
            class="q-mb-sm row"
          >
            <div class="col">
              <div>
                <q-icon name="check" v-show="reminder.daysBefore > 10" />
                <strong>{{ reminder.subject }}</strong> -
                {{ reminder.daysBefore }} days before
              </div>
              <div>To: {{ reminder.to }}</div>
              <div>From: {{ reminder.from }}</div>
            </div>
            <div class="col q-gutter-sm self-start text-right">
              <q-btn
                dense
                color="secondary"
                icon="edit"
                @click="isAddReminderOpen"
              />
              <q-btn
                color="negative"
                dense
                icon="delete"
                @click="deleteReminder(reminder)"
              />
            </div>
          </div>
          <div class="text-center">
            <q-btn
              label="Add Reminder"
              color="primary"
              icon="add"
              @click="isAddReminderOpen = true"
            />
          </div>
        </div>
        <div class="q-mb-md col-12 col-sm-6">
          <div class="column">
            <div class="q-mb-md q-gutter-sm">
              <h5>Additional Details</h5>
              <q-input
                filled
                v-model="formData.extensionOptions"
                label="Extension Options"
              />
              <q-input
                filled
                v-model="formData.certificateOfInsurance"
                label="Certificate of Insurance"
              />
              <q-input
                filled
                v-model="formData.businessLicense"
                label="Business License"
              />
            </div>
            <div class="q-mb-md q-gutter-sm">
              <h5>Contract Documents</h5>
              <div class="row flex-wrap q-gutter-md">
                <div class="text-center">
                  <q-card clickable class="q-pa-sm text-center cursor-pointer">
                    <q-icon name="description" size="2em" />
                    <div>Contract Document 1</div>
                  </q-card>
                  <q-btn flat dense icon="delete" color="negative" />
                </div>
                <div class="col">
                  <q-btn
                    label="Add Documents"
                    color="primary"
                    icon="add"
                    @click="isAddDocumentDialogOpen"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="q-mb-md col-12 col-sm-6">
          <h5>Notes</h5>
          <q-card class="q-mb-sm">
            <q-card-section>
              <div>
                This is a note about the contract. It can be as long as needed.
                It should be able to wrap to multiple lines.
              </div>
              <div class="text-right">
                <small>&mdash; Awesome Scott (awesomescott@wc-3.com) </small>
              </div>
              <div class="text-right">
                <small>08-01-2024 14:01 EST</small>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat dense icon="edit" color="secondary" />
              <q-btn flat dense icon="delete" color="negative" />
            </q-card-actions>
          </q-card>
          <q-card class="q-mb-sm">
            <q-card-section>
              <div>
                Another short note. Not sure if this should be organized
                chronologically or reversed.
              </div>
              <div class="text-right">
                <small>&mdash; Someone Else (someone@wc-3.com) </small>
              </div>
              <div class="text-right">
                <small>08-02-2024 16:01 EST</small>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat dense icon="edit" color="secondary" />
              <q-btn flat dense icon="delete" color="negative" />
            </q-card-actions>
          </q-card>
          <div class="text-center">
            <q-btn
              label="Add Note"
              color="primary"
              icon="add"
              @click="isAddNoteDialogOpen"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h5>Billables</h5>
          <q-table
            dense
            :columns="columns"
            :rows="billables"
            row-key="number"
            class="q-mt-md"
          />
        </div>
      </div>
    </q-form>
  </q-page>
  <q-dialog v-model="isAddContractorDialogOpen">
    <q-card style="width: 60ch; max-width: 80vw">
      <q-card-section>
        <h6>Add Contractor</h6>
      </q-card-section>
      <q-form @submit="addContractor">
        <q-card-section class="q-gutter-sm">
          <q-input v-model="selectedContractor.title" filled label="Title" />
          <q-input v-model="selectedContractor.name" filled label="Name" />
          <q-input v-model="selectedContractor.email" filled label="Email" />
          <q-input v-model="selectedContractor.phone" filled label="Phone" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Cancel"
            color="negative"
            icon="cancel"
            @click="isAddContractorDialogOpen = false"
          />
          <q-btn type="submit" label="Save" color="green" icon="save" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog v-model="isAddReminderOpen">
    <q-card style="width: 60ch; max-width: 80vw">
      <q-card-section>
        <h6>Add Reminder</h6>
      </q-card-section>
      <q-form @submit="addReminder">
        <q-card-section class="q-gutter-sm">
          <q-input v-model="selectedReminder.subject" filled label="Subject" />
          <q-input
            type="number"
            v-model="selectedReminder.daysBefore"
            filled
            label="Days Before"
            min="0"
          />
          <q-input v-model="selectedReminder.to" filled label="To" />
          <q-input v-model="selectedReminder.from" filled label="From" />
          <q-input
            v-model="selectedReminder.content"
            filled
            label="Content"
            type="textarea"
          />
          <div>
            <p>Variables that can be used include:</p>
            <p>
              &#123;&#123; client &#125;&#125; &#123;&#123; value &#125;&#125;
              &#123;&#123; primary_contact &#125;&#125; etc. ???
            </p>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Cancel"
            color="negative"
            icon="cancel"
            @click="isAddReminderOpen = false"
          />
          <q-btn type="submit" label="Save" color="green" icon="save" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({
  client: "City of Londonville",
  department: "Building Department",
  primaryContact: "John Doe",
  phone: "(555) 555-5555",
  email: "jdoe@londonville.gov",
  status: "Active",
  value: "$1,000,000",
  start: "Jan 1, 2022",
  end: "August 15, 2024",
  modified: "January 1, 2023",
  permitTech: "James Jones",
  permitTechEmail: "",
  permitTechPhone: "",
  cbo: "Lucy Davis",
  cboEmail: "",
  cboPhone: "",
  planReviewer: "Ray Brown",
  planReviewerEmail: "",
  planReviewerPhone: "",
  extensionOptions: "Reapply in 2025",
  certificateOfInsurance: "UB-1122234",
  businessLicense: "11-A-33221-444Q",
  reminder1To: "",
  reminder1From: "",
  reminder2To: "",
  reminder2From: "",
});

const contractors = ref([
  {
    title: "Permit Tech",
    name: "James Jones",
    email: "jj@wc-3.com",
    phone: "801-111-2222",
  },
  {
    title: "CBO",
    name: "Lucy Davis",
    email: "lucydavis@wc-3.com",
    phone: "801-111-3333",
  },
  {
    title: "Plan Reviewer",
    name: "Ray Brown",
    email: "rbrown@wc-3.com",
    phone: "801-222-4444",
  },
]);

const reminders = ref([
  {
    subject: "Subject Line Here",
    daysBefore: 30,
    to: "Charles Mingus <cmingus@wc-3.com>",
    from: "<info@wc-3.com>",
    content:
      "This is the content of the reminder for {{ to }}. Maybe just use handlebars for variable data?",
  },
  {
    subject: "Another Followup",
    daysBefore: 5,
    to: "Herbie Hancock <hh@wc-3.com>",
    from: "<info@wc-3.com",
    content:
      "Hello {{ to}}, this is a reminder that {{ subject }} is due in {{ daysBefore }} days.",
  },
]);

const columns = ref([
  {
    name: "billable_item",
    label: "Billable Item",
    align: "left",
    field: "billable_item",
    sortable: true,
  },
  {
    name: "rate",
    label: "Rate",
    align: "left",
    field: "rate",
    sortable: true,
  },
  {
    name: "percent_increase",
    label: "% Increase",
    align: "left",
    field: "percent_increase",
    sortable: true,
  },
  {
    name: "year_1",
    label: "Year 1",
    align: "left",
    field: "year_1",
    sortable: true,
  },
  {
    name: "year_2",
    label: "Year 2",
    align: "left",
    field: "year_2",
    sortable: true,
  },
  {
    name: "year_3",
    label: "Year 3",
    align: "left",
    field: "year_3",
    sortable: true,
  },
  {
    name: "year_4",
    label: "Year 4",
    align: "left",
    field: "year_4",
    sortable: true,
  },
]);
const billables = ref([
  {
    billable_item: "Permit Tech Fee",
    rate: "$100",
    percent_increase: "5%",
    year_1: "$100",
    year_2: "$105",
    year_3: "$110",
    year_4: "$115",
  },
  {
    billable_item: "Plan Review Fee",
    rate: "$50",
    percent_increase: "5%",
    year_1: "$50",
    year_2: "$52.50",
    year_3: "$55",
    year_4: "$57.50",
  },
  {
    billable_item: "Inspection Fee",
    rate: "$75",
    percent_increase: "5%",
    year_1: "$75",
    year_2: "$78.75",
    year_3: "$82.50",
    year_4: "$86.25",
  },
]);

const isAddContractorDialogOpen = ref(false);

const selectedContractorIndex = ref(null);
const selectedContractor = ref({
  title: "",
  name: "",
  email: "",
  phone: "",
});
const addContractor = () => {
  if (selectedContractorIndex.value) {
    contractors.value[selectedContractorIndex.value] = {
      ...selectedContractor.value,
    };
    selectedContractorIndex.value = null;
  } else {
    contractors.value.push({ ...selectedContractor.value });
  }
  selectedContractor.value = {
    title: "",
    name: "",
    email: "",
    phone: "",
  };
  isAddContractorDialogOpen.value = false;
};

const isAddReminderOpen = ref(false);
const selectedReminderIndex = ref(null);
const selectedReminder = ref({
  subject: "",
  daysBefore: 0,
  to: "",
  from: "",
  content: "",
});
const addReminder = () => {
  if (selectedReminderIndex.value) {
    reminders.value[selectedReminderIndex.value] = {
      ...selectedReminder.value,
    };
    selectedReminderIndex.value = null;
  } else {
    reminders.value.push({ ...selectedReminder.value });
  }
  selectedReminder.value = {
    subject: "",
    daysBefore: 0,
    to: "",
    from: "",
    content: "",
  };
  isAddReminderOpen.value = false;
};

const isAddDocumentDialogOpen = ref(false);
const isAddNoteDialogOpen = ref(false);

const deleteContractor = (contractor) => {
  contractors.value = contractors.value.filter(
    (c) => c.name !== contractor.name
  );
};
const deleteReminder = (reminder) => {
  reminders.value = reminders.value.filter(
    (r) => r.subject !== reminder.subject
  );
};
</script>
