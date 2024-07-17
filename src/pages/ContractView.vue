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
        label="Back"
        icon="arrow_back"
        color="grey"
        @click="$router.push('/contracts')"
        />
      <q-btn
        label="Edit"
        icon="edit"
        color="secondary"
        @click="$router.push('/contract/edit')"
        />
    </div>
    <q-card class="bg-orange text-center text-white q-pa-sm q-mb-sm">Days Left In Contract<br/><h4 class="text-white">22</h4></q-card>
    <div class="row q-col-gutter-md">
      <div class="q-mb-md col-12 col-sm-6">
        <h5>Client Details</h5>
        <div><strong>Client: </strong>City of Londonville</div>
        <div><strong>Department: </strong>Building Department</div>
        <div><strong>Primary Contact: </strong>John Doe</div>
        <div><strong>Phone: </strong>(555) 555-5555</div>
        <div><strong>Email: </strong>jdoe@londonville.gov</div>
      </div>
      <div class="q-mb-md col-12 col-sm-6">
        <h5>Contract Details</h5>
        <div><strong>Status: Active</strong></div>
        <div><strong>Value: </strong>$1,000,000</div>
        <div><strong>Start: </strong>Jan 1, 2022</div>
        <div><strong>End: </strong>August 15, 2024</div>
        <div>
          <strong>Modified: </strong
          ><q-tooltip anchor="top middle">
            <div>08/15/2024 7:30pm</div>
            <div>Kevin Jones (kj@wc-3.com)</div> </q-tooltip
          >January 1, 2023
        </div>
      </div>
      <div class="q-mb-md col-12 col-sm-6">
        <h5>Contractors</h5>
        <div class="q-mb-sm">
          <div><strong>Permit Tech:</strong> James Jones</div>
          <div>jj@wc-3.com</div>
          <div>801-111-2222</div>
        </div>
        <div class="q-mb-sm">
          <div><strong>CBO:</strong> Lucy Davis</div>
          <div>lucydavis@wc-3.com</div>
          <div>801-111-3333</div>
        </div>
        <div class="q-mb-sm">
          <div><strong>Plan Reviewer:</strong> Ray Brown</div>
          <div>rbrown@wc-3.com</div>
          <div>801-222-4444</div>
        </div>
      </div>
      <div class="q-mb-md col-12 col-sm-6">
        <h5>Reminders</h5>
        <div class="q-mb-sm">
          <div><q-icon name="check" /> <strong>Subject Line Here</strong> - 30 days before</div>
          <div>To: Charles Mingus {{ `<cmingus@wc-3.com>` }}</div>
          <div>From: {{ `<info@wc-3.com>` }}</div>
        </div>
        <div class="q-mb-sm">
          <div><strong>Another Followup</strong> - 5 days before</div>
          <div>To: Herbie Hancock {{ `<hh@wc-3.com>` }}</div>
          <div>From: {{ `<info@wc-3.com>` }}</div>
        </div>
      </div>
      <div class="q-mb-md col-12 col-sm-6">
        <div class="column">
        <div class="q-mb-md"><h5>Additional Details</h5>
        <div><strong>Extension Options: </strong>Reapply in 2025</div>
        <div><strong>Certificate of Insurance: </strong>UB-1122234</div>
        <div><strong>Business License: </strong>11-A-33221-444Q</div>
      </div>
        <div><h5>Contract Documents</h5>
        <div class="row flex-wrap">
          <q-card clickable class="q-pa-sm text-center cursor-pointer">
            <q-icon name="description" size="2em" />
            <div>Contract Document 1</div>
          </q-card>
        </div>
      </div>
    </div>
    </div>
      <div class="q-mb-md col-12 col-sm-6">
        <h5>Notes</h5>
        <q-card class="q-mb-sm">
          <q-card-section>
            <div>
              This is a note about the contract. It can be as long as needed. It
              should be able to wrap to multiple lines.
            </div>
            <div class="text-right">
              <small>&mdash; Awesome Scott (awesomescott@wc-3.com) </small>
            </div>
            <div class="text-right"><small>08-01-2024 14:01 EST</small></div>
          </q-card-section>
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
            <div class="text-right"><small>08-02-2024 16:01 EST</small></div>
          </q-card-section>
        </q-card>
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
  </q-page>
</template>
<script setup>
import { ref } from "vue";

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
</script>
