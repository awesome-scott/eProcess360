<template>
  <q-page padding>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6 column">
        <div>
          <p>Please search for the parcel that you are working with.</p>
        </div>
        <q-input
          rounded
          outlined
          v-model="text"
          label="Lookup An Address"
          class="q-my-sm"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="search" />
          </template>
        </q-input>
        <q-skeleton type="rect" width="100%" height="400px" class="q-my-sm" />
        <div class="results text-center" v-if="text">
          <h6 class="text-center">Sample Address For Project</h6>
          <q-btn
            to="/projects/all"
            label="New Project"
            icon="add"
            color="secondary"
          />
          <div class="row">
            <div class="col-12">
              <q-expansion-item
                switch-toggle-side
                expand-separator
                label="View Property Details"
                class="full-width text-left q-py-sm"
                header-style="secondary"
              >
                <q-list class="property-list" background="#eeeeeee">
                  <q-item
                    v-for="item in gisData"
                    :key="item.key"
                    clickable
                    class="property-item"
                  >
                    <q-item-section>
                      <strong class="field">{{ item.key }}</strong>
                    </q-item-section>
                    <q-item-section class="value">
                      {{ item.value }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 column q-col-gutter-md">
        <div class="row flex-center q-mt-md">
          <q-btn label="Log In" icon="login" color="secondary" size="lg" />
        </div>
        <div class="row q-gutter-md grid-container">
          <q-card
            v-ripple
            class="card cursor-pointer"
            v-for="link of links"
            :key="link.title"
            @click="$router.push(link.to)"
          >
            <q-card-section align="center" class="q-pb-none">
              <q-icon :name="link.icon" size="4em" color="secondary" />
            </q-card-section>
            <q-card-section class="card-details q-mt-none">
              <h6>{{ link.title }}</h6>
              <p>{{ link.description }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
defineOptions({
  name: "HomePage",
});
const text = ref("");
const links = ref([
  {
    title: "Connect With Us",
    description: "I'm not sure what this section is for. Please clarify.",
    icon: "groups",
    to: "/contact",
  },
  {
    title: "File For A Permit",
    description: "Click here to begin your new permit application.",
    icon: "assignment",
    to: "/projects/permit",
  },
  {
    title: "Licensing",
    description:
      "Things to do with licenses. This is intentionally a longer description to show how flex-grow keeps the cards the same height. If it's working...",
    icon: "badge",
    to: "/projects/license",
  },
  {
    title: "Complaints",
    description: "Please don't complain about me.",
    icon: "report",
    to: "/projects/complaint",
  },
  {
    title: "Contact Us",
    description: "We're here to help.",
    icon: "contact_support",
    to: "/contact",
  },
]);

const gisData = ref([
  { key: "Object ID", value: "60144" },
  { key: "FIPS Code", value: "06013" },
  { key: "Parcel ID", value: "209521051" },
  { key: "Parcel ID without Formatting", value: "209521051" },
  { key: "Parcel Use Code", value: "19" },
  {
    key: "Parcel Use Description",
    value:
      "Single Family detached with major common area such as pool, tennis, clubhouse, or other amenities, Cluster Homes",
  },
  { key: "Zoning Code", value: "RS-D" },
  { key: "Zoning Description", value: "Single Family Residential" },
  { key: "Parcel Value Type", value: "ACTUAL VALUE" },
  { key: "Improvement Value", value: "148000" },
  { key: "Land Value", value: "1000000" },
  { key: "Total Parcel Value", value: "1148000" },
  { key: "Owner Name", value: "WEBER WILLIAM J III & CATHLEEN" },
  { key: "Second Owner Name", value: "ORCONE CRISTOPHER & TAYLOR" },
  { key: "Mailing Address", value: "2405 TALAVERA DR" },
  { key: "Mailing Address Street Number", value: "2405" },
  { key: "Mailing Address Street Name", value: "TALAVERA" },
  { key: "Mailing Address Street Type", value: "DR" },
  { key: "Mailing Address City", value: "SAN RAMON" },
  { key: "Mailing Address State", value: "CA" },
  { key: "Mailing Address ZIP Code", value: "94583-2225" },
  { key: "Parcel Address", value: "2405 TALAVERA DR" },
  { key: "Parcel Address Number", value: "2405" },
  { key: "Parcel Address Street Name", value: "TALAVERA" },
  { key: "Parcel Address Street Type", value: "DR" },
  { key: "Parcel Address City", value: "SAN RAMON" },
  {
    key: "Original Parcel Address",
    value: {
      address: "2405 TALAVERA DR",
      saddno: "2405",
      saddstr: "TALAVERA",
      saddsttyp: "DR",
      scity: "SNRMN",
      szip: "94583-2225",
    },
  },
  { key: "US Census County Subdivision", value: "central-contra-costa" },
  { key: "Parcel Address County", value: "contra-costa" },
  { key: "Parcel Address State", value: "CA" },
  { key: "Parcel Address Zip Code", value: "94583-2225" },
  { key: "5 Digit Parcel Zip Code", value: "94583" },
  { key: "Primary Address Source", value: "county;cass" },
  { key: "Latitude", value: "37.762999" },
  { key: "Longitude", value: "-121.971123" },
  { key: "Federal Qualified Opportunity Zone", value: "No" },
  { key: "Census 2020 Tract", value: "06013345116" },
  { key: "Census 2020 Block", value: "060133451161008" },
  { key: "Census 2020 Blockgroup", value: "060133451161" },
  { key: "Census Zip Code Tabulation Area", value: 94583 },
  { key: "Last County Refresh Date", value: "2023-08-01" },
  {
    key: "Source URL",
    value: "gis.cccounty.us/HTML5/assessorPDF/209p52x0.pdf",
  },
  { key: "Calculated Acres", value: "0.11545" },
  { key: "Calculated Parcel Sq Ft", value: "5029" },
  {
    key: "Parcel Path",
    value: "/us/ca/contra-costa/central-contra-costa/60144",
  },
  { key: "Stable ID Status", value: "preserved" },
  { key: "LL_UUID", value: "37842779-343e-4150-8815-cd4f9f9e6e73" },
  { key: "Last Modified", value: "2024-07-02 17:11:30 -0400" },
  { key: "Property Description", value: "T05217 L0334 B" },
]);
</script>

<style scoped>
.property-item {
  border-bottom: 1px dashed #ccc;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

.card {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  justify-content: start;
  &:hover {
    background: hsla(0, 0%, 95%, 1) !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    .permit-type-icon-bg {
      opacity: 1;
    }
  }
}

@media (min-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .order-md-1 {
    order: 1;
  }

  .order-md-2 {
    order: 2;
  }
}
</style>
