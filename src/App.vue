<template>
  <div id="app">
    <ApolloQuery
      :query="GET_RESULTS"
      :notifyOnNetworkStatusChange="true"
    >
      <template v-slot="{ result: { data, loading }, isLoading, query }">
        <AppNav @search="handleSearch($event, query)" />
        <div class="content">
          <div class="container">
            <AppHeader @search="handleSearch($event, query)" />
            <div class="main">
              <Map :results="data && data.search && data.search.business" />
              <Results
                :results="data && data.search && data.search.business"
                :loading="loading"
              />
            </div>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
  import AppNav from '@/components/AppNav.vue'
  import AppHeader from '@/components/AppHeader.vue'
  import Map from '@/components/Map.vue'
  import Results from '@/components/Results.vue'
  import { GET_RESULTS } from './graphql/search.query';

  export default {
    name: 'App',
    components: {
      AppNav,
      AppHeader,
      Map,
      Results
    },
    data() {
      return {
        GET_RESULTS
      }
    },
    methods: {
      handleSearch({ term, category }, query) {
        query.refetch({term, category});
      }
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
  }

  .container {
    width: calc(100% - 2 * 60px);
    margin: 0 auto;
    position: relative;
  }

  .content {
    width: calc(100vw - 100px);
    margin-left: 100px;
    height: 100vh;
    background: #CFCFE6;
  }

  .main {
    display: flex;
    position: relative;
  }
</style>
