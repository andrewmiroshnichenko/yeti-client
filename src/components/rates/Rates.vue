<template>
  <DataTable
    :fields="fields"
    :items="rates"
    :rows="rows"
    :badgedItem="badgedItem"
    :getData="getRates"
  >
    <template v-slot:filter>
      <RatesFilter v-on:applyFilter="getRates" />
    </template>
  </DataTable>
</template>

<script>
import formatDate from '../../utils/date'
import RatesFilter from './RatesFilter'
import DataTable from '../DataTable/DataTable'

export default {
  name: 'Rates',
  components: {
    RatesFilter,
    DataTable
  },
  data () {
    return {
      badgedItem: 'rejectCalls',
      fields: {
        'connect-fee': {
          label: 'Connect fee'
        },
        'initial-interval': {
          label: 'Initial interval'
        },
        'initial-rate': {
          label: 'Initial rate'
        },
        'network-prefix': {
          label: 'Network prefix'
        },
        'next-interval': {
          label: 'Next interval'
        },
        'next-rate': {
          label: 'Next rate'
        },
        'prefix': {
          label: 'Prefix'
        },
        'reject-calls': {
          label: 'Reject calls'
        },
        'valid-from': {
          label: 'Valid from'
        },
        'valid-till': {
          label: 'Valid till'
        }
      }
    }
  },
  computed: {
    rates: function () {
      const rates = this.$store.state.rates.rates.data
      if (rates) {
        const items = rates.map(item => {
          item['valid-from'] = formatDate(item['valid-from'])
          item['valid-till'] = formatDate(item['valid-till'])
          return item
        })
        return items || []
      }
      return []
    },
    rows: function () {
      return this.rates ? this.rates.length : 0 // TODO: move somewhere
    }
  },
  created: function () {
    this.getRates()
  },
  methods: {
    getRates: function (pageNumber) {
      this.$store.dispatch('getRates', pageNumber)
        .catch(err => {
          console.log(err)
          this.$notify({
            type: 'error',
            title: err[0].title,
            text: err[0].detail
          })
        })
    }
  }
}
</script>

<style>
</style>
