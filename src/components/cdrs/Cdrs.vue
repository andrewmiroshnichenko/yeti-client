<template>
  <DataTable
    :fields="fields"
    :items="cdrs"
    :rows="rows"
    :badgedItem="badgedItem"
    :getData="getCdrs"
  >
    <template v-slot:filter>
      <CdrFilter v-on:applyFilter="getCdrs" />
    </template>
  </DataTable>
</template>

<script>
import formatDate from '../../utils/date'
import CdrFilter from './CdrFilter'
import DataTable from '../DataTable/DataTable'

export default {
  name: 'Cdrs',
  components: {
    CdrFilter,
    DataTable
  },
  data () {
    return {
      badgedItem: 'success',
      fields: {
        'time-start': {
          label: 'Start Time'
        },
        'time-connect': {
          label: 'Connect Time'
        },
        'time-end': {
          label: 'End Time'
        },
        'duration': {
          label: 'Duration'
        },
        'success': {
          label: 'Success'
        },
        'destination-initial-interval': {
          label: 'Destination Initial Interval'
        },
        'destination-initial-rate': {
          label: 'Destination Initial Rate'
        },
        'destination-next-interval': {
          label: 'Destination Next Initial'
        },
        'destination-next-rate': {
          label: 'Destination Next Rate'
        },
        'destination-fee': {
          label: 'Destination Fee'
        },
        'customer-price': {
          label: 'Customer Price'
        },
        'src-name-in': {
          label: 'Src Name In'
        },
        'src-prefix-in': {
          label: 'Src Prefix In'
        },
        'from-domain': {
          label: 'From Domain'
        },
        'dst-prefix-in': {
          label: 'Dst Prefix In'
        },
        'to-domain': {
          label: 'To Domain'
        },
        'ruri-domain': {
          label: 'R-URI Domain'
        },
        'diversion-in': {
          label: 'Diversion In'
        },
        'local-tag': {
          label: 'Local Tag'
        },
        'lega-disconnect-code': {
          label: 'Leg A Disconnect Code'
        },
        'lega-disconnect-reason': {
          label: 'Leg A Disconnect Reason'
        },
        'lega-rx-payloads': {
          label: 'Leg A Rx Payloads'
        },
        'lega-tx-payloads': {
          label: 'Leg A Tx Payloads'
        },
        'auth-orig-transport-protocol-id': {
          label: 'Auth Origin Transport Protocol Id'
        },
        'auth-orig-ip': {
          label: 'Auth Origin Ip'
        },
        'auth-orig-port': {
          label: 'Auth Origin Port'
        },
        'lega-rx-bytes': {
          label: 'Leg A Rx Bytes'
        },
        'lega-tx-bytes': {
          label: 'Leg A Tx Bytes'
        },
        'lega-rx-decode-errs': {
          label: 'Leg A Rx Decode Errors'
        },
        'lega-rx-no-buf-errs': {
          label: 'Leg A Rx No Buf Errors'
        },
        'lega-rx-parse-errs': {
          label: 'Leg A Rx Parse Errors'
        },
        'src-prefix-routing': {
          label: 'Src Prefix Routing'
        },
        'dst-prefix-routing': {
          label: 'Dst Prefix Routing'
        },
        'destination-prefix': {
          label: 'Destination Prefix'
        }
      }
    }
  },
  computed: {
    cdrs: function () {
      const cdrs = this.$store.getters.cdrs.data
      if (cdrs) {
        const items = cdrs.map(item => {
          item['time-start'] = formatDate(item['time-start'])
          item['time-connect'] = formatDate(item['time-connect'])
          item['time-end'] = formatDate(item['time-end'])
          return item
        })
        return items || []
      }
      return []
    },
    loading: function () {
      return this.$store.getters.isRequestPending
    },
    rows: function () {
      if (this.$store.getters.cdrs && this.$store.getters.cdrs.meta) {
        return this.$store.getters.cdrs.meta['total-count']
      }

      return 0
    }
  },
  created: function () {
    this.getCdrs()
  },
  methods: {
    getCdrs: function (pageNumber) {
      this.$store.dispatch('getCdrs', pageNumber)
        .catch(err => {
          this.$notify({
            type: 'error',
            title: err[0].title,
            text: err[0].detail
          })
        })
    }
  },
}
</script>

<style>
</style>
