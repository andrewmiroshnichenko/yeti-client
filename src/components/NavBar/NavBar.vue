<template>
  <div
    v-if="isAuthenticated"
    class="vertical-navbar-menu"
  >
    <b-collapse
      id="nav-bar-collapse"
      visible
    >
      <b-nav vertical>
        <div class="placeholder-for-future-use">
          Search element can be placed here
        </div>
        <b-button
          v-b-toggle.statistics-pages-collapse
          class="menu-collapse"
        >
          Statistics pages
        </b-button>
        <b-collapse id="statistics-pages-collapse">
          <b-nav-item
            :active="this.$route.path === '/rates'"
            router-link
            to="/rates"
          >
            Rates
          </b-nav-item>
          <b-nav-item
            :active="this.$route.path === '/cdrs'"
            router-link
            to="/cdrs"
          >
            Cdrs
          </b-nav-item>
          <b-nav-item
            :active="this.$route.path === '/accounts'"
            router-link
            to="/accounts"
          >
            Accounts
          </b-nav-item>
        </b-collapse>
      </b-nav>
    </b-collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return ({
      breadcrumbsNames: {
        '/cdrs': 'CDRs',
        '/rates': 'Rates',
        '/accounts': 'Accounts',
      },
    });
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>

<style lang="scss">
.vertical-navbar-menu {
  height: 100%;
  flex: 1 0 230px;
  background-color: #222d32;

  & * {
    text-align: left;
  }

  .placeholder-for-future-use {
    text-align: center;
    height: 200px;
    padding: 70px 20px 0;
    color: gray;
  }

  .menu-collapse {
    box-shadow: initial;
    border-radius: initial;
    background-color: #1e282c;
    border: initial;
    border-left: 1px solid #3c8dbc;
  }

  .nav-link {
    background-color: #2c3b41;
    color: #8aa4af;
    outline: none;

    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>
