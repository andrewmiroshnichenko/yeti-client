<template>
  <div class="vertical-navbar-menu">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
    >
      <b-collapse
        id="nav_collapse"
        is-nav
      >
        <b-nav vertical>
          <b-nav-item
            v-if="isAuthenticated"
            :active="this.$route.path === '/rates'"
            router-link
            to="/rates"
          >
            Rates
          </b-nav-item>
          <b-nav-item
            v-if="isAuthenticated"
            :active="this.$route.path === '/cdrs'"
            router-link
            to="/cdrs"
          >
            Cdrs
          </b-nav-item>
          <b-nav-item
            v-if="isAuthenticated"
            :active="this.$route.path === '/accounts'"
            router-link
            to="/accounts"
          >
            Accounts
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>
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
  flex: 0.1 0 auto;
}
// .vertical-navbar-menu nav {
//   height: 100%;
// }
// .vertical-navbar-menu .navbar-collapse {
//   align-self: flex-start;
// }

.vertical-navbar-menu {
  nav {
    height: 100%;
  }

  .navbar-collapse {
    align-self: flex-start;
  }
}
</style>
