<template>
  <div id="dataTable">
    <slot name="filter" />
    <div class="dataTable">
      <b-spinner
        v-if="loading"
        variant="primary"
        label="Spinning"
      />
      <b-table
        v-if="!loading"
        :small="small"
        :items="items"
        :per-page="perPage"
        :striped="striped"
        :fixed="fixed"
        :fields="fields"
        hover
      >
        <template
          :slot="badgedItem"
          slot-scope="row"
        >
          <b-badge
            v-bind:variant="row.item[badgedItem] ? 'success' : 'danger'"
            pill
          >
            {{ row.item[badgedItem] }}
          </b-badge>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        v-on:change="getData"
        :disabled="loading"
        size="sm"
        aria-controls="dataTable"
      />
      <p class="mt-3">
        Total: {{ rows }}
      </p>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Cdrs',
  props: ['fields', 'items', 'rows', 'badgedItem', 'getData'],
  data () {
    return {
      small: true,
      striped: true,
      fixed: false,
      perPage: 50,
      currentPage: 1
    }
  },
  computed: {
    loading: function () {
      return this.$store.getters.isRequestPending
    },
  }
}
</script>


<style>
</style>

