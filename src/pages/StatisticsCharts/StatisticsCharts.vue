<template>
  <div>
    <data-chart
      v-if="!requestIsPending"
      :chart-data="activeCallsData"
      :options="chartOptions"
      :height="chartHeight"
      :width="null"
    />
    <data-chart
      v-if="!requestIsPending"
      :chart-data="originatedCpsData"
      :options="chartOptions"
      :height="chartHeight"
      :width="null"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import DataChart from '@/components/DataChart/DataChart';
import { STATISTICS } from '@/constants';

import { CHART_OPTIONS, INITIAL_DATASETS_SETTINGS } from './constants';

export default {
  name: 'StatisticsCharts',
  components: {
    dataChart: DataChart,
  },
  data() {
    return {
      chartOptions: CHART_OPTIONS,
      chart: undefined,
      chartHeight: 0,
    };
  },
  computed: {
    ...mapGetters(['requestIsPending', 'activeAccount', 'activeCalls', 'originatedCps']),
    derivedActiveCallsChartData() {
      const chartData = {
        datasets: [],
      };

      if (this.activeCalls) {
        // For some reason, pushing dataset configs in scope of below Object.keys
        // cause continous dataset refresh, which results in page crash
        // chartData.datasets.push({
        //   label: 'Originated calls',
        //   data: [],
        //   backgroundColor: 'transparent',
        //   borderColor: 'lightgreen',
        // });
        // chartData.datasets.push({
        //   label: 'Terminated calls',
        //   data: [],
        //   backgroundColor: 'transparent',
        //   borderColor: 'lightblue',
        // });

        Object.keys(INITIAL_DATASETS_SETTINGS).forEach((key) => {
          const dataset = { ...INITIAL_DATASETS_SETTINGS[key] };
          dataset.data = this.activeCalls[key].map(({ x, y }) =>
            ({ y: x, x: Date.parse(y) }));
          chartData.datasets.push(dataset);
          // this.activeCalls[key].forEach((dataEntry) => {
          //   const { x, y } = dataEntry;

          //   chartData.datasets[index].data.push({
          //     y, x: Date.parse(x),
          //   });
          // });
        });
      }

      return chartData;
    },
    derivedOriginatedCpsChartData() {
      const chartData = {
        datasets: [],
      };

      if (this.originatedCps) {
        // For some reason, pushing dataset configs in scope of below Object.keys
        // cause continous dataset refresh, which results in page crash
        chartData.datasets.push({
          label: 'Originated CPS',
          data: this.originatedCps.cps.map(({ x, y }) =>
            ({ y: x, x: Date.parse(y) })),
          backgroundColor: 'transparent',
          borderColor: 'orange',
        });
      }

      return chartData;
    },
    derivedCharData() {
      const chartsData = { ...this.activeCalls, ...this.originatedCps };

      return Object.entries(INITIAL_DATASETS_SETTINGS).reduce((acc, [key, value]) => {
        acc[key] = {
          ...value,
          data: chartsData[key].map(({ x, y }) => ({ y: x, x: Date.parse(y) })),
        };

        return acc;
      }, {});
    },
    originatedCpsData() {
      return { datasets: [this.derivedCharData.cps] };
    },
    activeCallsData() {
      return { datasets: Object.entries(this.derivedCharData).filter(([key]) => key !== 'cps').map(([, value]) => value) };
    },
  },
  watch: {
    activeAccount() {
      this[STATISTICS.ACTIONS.GET_STATISTICS]();
    },
  },
  mounted() {
    // 100 is magic number which will gave us nice chart height
    this.chartHeight = (document.querySelector('.working-area-wrapper').clientHeight - 100) / 2;
  },
  created() {
    if (this.activeAccount) {
      this[STATISTICS.ACTIONS.GET_STATISTICS]();
    }
  },
  methods: {
    ...mapActions([STATISTICS.ACTIONS.GET_STATISTICS]),
  },
};
</script>
