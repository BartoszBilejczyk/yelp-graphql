<template>
  <div class="app-nav__wrapper">
    <div class="app-nav">
      <div
        v-for="category in categories"
        :key="category.name"
        class="app-nav__item"
        :class="{ 'app-nav__item--active': category.name === activeCategory }"
        @click="setActiveCategory(category.name)"
      >
        <img :src="require(`../assets/${category.icon}.svg`)" alt="checklist">
        <span>
        {{ category.label }}
      </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppNav',
    data() {
      return {
        activeCategory: null,
        categories: [
          {
            name: 'restaurants',
            label: 'Restaurants',
            icon: 'food'
          },
          {
            name: 'hair',
            label: 'Hair Salons',
            icon: 'hair'
          },
          {
            name: 'escapegames',
            label: 'Escape Rooms',
            icon: 'escape_room'
          },
          {
            name: 'fitness',
            label: 'All Fitness related',
            icon: 'fitness'
          },
          {
            name: 'swimmingpools',
            label: 'Swimming Pools',
            icon: 'swim'
          },
          {
            name: 'cinema',
            label: 'Cinema',
            icon: 'cinema'
          },
          {
            name: 'banks',
            label: 'Banks',
            icon: 'bank'
          }
        ]
      }
    },
    methods: {
      setActiveCategory(categoryName) {
        this.activeCategory = categoryName;
        this.$emit('search', { category: categoryName });
      }
    }
  }
</script>

<style scoped lang="scss">
  .app-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 24px;

    &__wrapper {
      width: 100px;
      position: fixed;
      height: 100vh;
      background: linear-gradient(180deg, #4a54aa, #952f84);
      padding: 24px 8px;
      overflow-y: auto;
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      background: transparent;
      text-align: center;
      transition: 0.2s ease;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.02);
      font-size: 12px;
      font-weight: 600;
      width: 84px;
      height: 84px;
      cursor: pointer;
      border-radius: 50%;
      color: white;
      margin-bottom: 8px;
      padding: 8px;

      span {
        display: inline-block;
        white-space: pre-wrap;
      }

      img {
        margin-bottom: 8px;
        width: 32px;
        height: 32px;
      }

      &--active,
      &:hover {
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
      }

      &:hover {
        background: lighten(#2a2051, 10%);
      }

      &--active,
      &--active:hover {
        background: #2a2051;
      }
    }
  }
</style>
