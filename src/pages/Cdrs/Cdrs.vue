<template>
  <DataTableAnt
    :fields="fields"
    :items="formattedCdrs"
    :rows="rows"
    :get-data="getCdrs"
    :items-to-badge="itemsToBadge"
  />
</template>

<script>
import { flow, get } from 'lodash';
import { mapGetters, mapActions } from 'vuex';

import utils from '@/utils';
import { CDRS } from '@/constants';
import DataTableAnt from '@/components/DataTableAnt/DataTableAnt';

import { TABLE_HEADERS_ANT } from './constants';

export default {
  name: 'Cdrs',
  components: {
    DataTableAnt,
  },
  data() {
    return {
      // Table fields
      fields: TABLE_HEADERS_ANT,
      itemsToBadge: [{
        id: 'success',
        errorValue: 'No',
      }],
    };
  },
  computed: {
    ...mapGetters(['activeAccount', 'cdrs']),
    formattedCdrs() {
      return flow(utils.formatCdrs)(this.cdrs.items);
    },
    rows() {
      return get(this.cdrs, ['meta', 'total-count'], 0);
    },
  },
  watch: {
    activeAccount() {
      this[CDRS.ACTIONS.GET_CDRS]();
    },
  },
  created() {
    if (this.activeAccount) {
      this[CDRS.ACTIONS.GET_CDRS]();
    }
  },
  methods: {
    ...mapActions([CDRS.ACTIONS.GET_CDRS]),
  },
};
</script>
