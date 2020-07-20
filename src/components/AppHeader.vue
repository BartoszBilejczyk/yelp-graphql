<template>
  <div class="app-header">
    <div class="app-header__search">
      <input
        v-model="term"
        class=""
        placeholder="Search..."
        @keydown.enter="$emit('search', { term, category })"
      />
      <select
        v-model="category"
      >
        <option :value="null">
          Select from {{ categories.total }} categories...
        </option>
        <option
          v-for="category in categories.category"
          :key="category.alias"
        >
          {{ category.title }}
        </option>
      </select>
      <img
        class="app-header__search-icon"
        :src="require('../assets/arrow-right.svg')"
        alt="star"
        @click="$emit('search', { term, category })"
      >
    </div>
    <div class="app-header__location">
      Current location (fixed for demo):
      <span class="app-header__location-change">
        Finlandzka 10, Warsaw
      </span>
    </div>
  </div>
</template>

<script>
  import { GET_CATEGORIES } from '../graphql/categories.query';

  export default {
    name: 'AppHeader',
    data() {
       return {
         term: '',
         category: null,
         categories: [],
         skipQuery: true
       }
    },
    apollo: {
      categories: {
        query: GET_CATEGORIES
      }
    },
    methods: {
      async search() {
        this.skipQuery = false;
        await this.$apollo.queries.search.refetch({
          term: this.term,
          category: this.category
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .app-header {
    background: transparent;
    height: 60px;
    padding: 32px 0 0;
    display: flex;
    align-items: center;

    > * {
      margin-right: 50px;
    }

    &__location {
      font-weight: 500;
    }

    input {
      border: 1px solid #2a2051;
      padding: 12px 50px 12px 24px;
      transition: 0.2s ease;
      border-radius: 20px;
      background: darken(#CFCDE2, 3%);
      color: #2c3e50;
      min-width: 250px;
      font-weight: 600;

      &:focus,
      &:active {
        background: darken(#CFCDE2, 4%);
        border: 1px solid #2a2051;
        outline: none;
      }
    }

    ::placeholder {
      color: #2c3e50;
    }

    &__search {
      display: flex;
      align-items: center;

      &-icon {
        width: 24px;
        cursor: pointer;
        background: #6F3BA3;
        border-radius: 24px;
        padding: 12px 24px;

      }

      > * {
        margin-right: 8px;
      }
    }

    select {
      border: 1px solid #2a2051;;
      padding: 12px 50px 12px 24px;
      transition: 0.2s ease;
      border-radius: 20px;
      background: darken(#CFCDE2, 3%);
      min-width: 200px;
      color: #2c3e50;
      font-weight: 600;

      &:focus,
      &:active {
        background: darken(#CFCDE2, 4%);
        border: 1px solid #2a2051;
        outline: none;
      }
    }
  }
</style>
