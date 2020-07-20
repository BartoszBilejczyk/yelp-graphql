<template>
  <div class="results__wrapper" v-if="!loading">
    <h1 class="results__heading">
      {{ results.length }} places around you
    </h1>
    <div class="results">
      <div
        v-for="result in results"
        :key="result.id"
        class="results__item"
      >
        <a :href="result.url" target="_blank" rel="noopener noreferrer">
          <div class="results__item-content">
            <span class="results__item-name">{{ result.name }}</span>
            <span class="results__item-distance">{{ (result.distance / 1000).toFixed(2) }} km away</span>
            <span class="results__item-location">{{ result.location.address1 }}, {{ result.location.city }}</span>
            <div
              v-if="result.rating"
              class="results__item-review"
            >
              <img
                v-for="star in Number(result.rating.toFixed(0))"
                :key="`${star}_full`"
                :src="require('../assets/star.svg')"
                alt="star"
              >
              <img
                v-for="star in 5 - Number(result.rating.toFixed(0))"
                :key="`${star}_empty`"
                :src="require('../assets/star-empty.svg')"
                alt="star"
              >
              <span class="results__item-rating">{{ result.review_count }} reviews</span>
            </div>
            <span class="results__item-price">{{ result.price }}</span>
          </div>
          <img :src="result.photos && result.photos[0]" alt="">
        </a>
      </div>
    </div>
  </div>
  <div
    class="results__wrapper"
    v-else-if="loading"
  >
    <h2 class="results__wrapper-loading">
      Loading...
    </h2>
  </div>
  <div
    class="results__wrapper"
    v-else-if="!loading && !results.length"
  >
    <h2 class="results__wrapper-loading">
      No results...
    </h2>
  </div>
</template>

<script>
  export default {
    name: 'Results',
    props: {
      results: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  .results {
    padding-bottom: 16px;
    height: calc(100vh - 194px);
    overflow-y: auto;

    &__wrapper {
      margin-top: 20px;
      width: 468px;
      margin-left: auto;
      position: absolute;
      top: 0;
      right: 0;
      height: calc(100vh - 150px);

      &-loading {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        font-size: 20px;
        font-weight: 600;
      }
    }

    &__heading {
      font-size: 24px;
    }

    &__item {
      border: 1px solid #f1f1f1;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      font-size: 13px;
      font-weight: 600;
      width: 435px;
      min-width: 435px;
      max-width: 435px;
      border-radius: 16px;
      cursor: pointer;
      background: white;
      padding: 8px;
      margin-bottom: 16px;
      margin-right: 16px;

      &--active {
        border: 2px solid #6F3BA3;
      }

      a {
        text-decoration: none;
        color: #2c3e50;
        display: flex;
        align-items: stretch;
        justify-content: space-between;

        > img {
          height: 180px;
          width: 140px;
          object-fit: cover;
          border-radius: 8px;
        }
      }

      &-content {
        padding: 16px;
        display: flex;
        flex-direction: column;
      }

      span {
        display: inline-block;
        margin-bottom: 12px;
      }

      &-review {
        display: flex;
        align-items: center;

        img {
          height: 16px;
          width: 16px;
          margin-right: 1px;
        }

        span {
          margin-left: 4px;
          margin-bottom: 0;
        }
      }

      &-name {
        font-size: 16px;
        font-weight: 500;
      }

      &-distance {
        font-size: 12px;
        font-weight: 500;
        color: gray;
      }


      &-location {
        font-size: 14px;
        font-weight: 500;
      }

      &-rating {
        font-size: 12px;
        font-weight: 500;
        color: #6F3BA3;
        position: relative;
        top: 1px;
      }

      &-price {
        font-size: 20px;
        font-weight: 500;
        margin-top: 10px;
        letter-spacing: 2px;
        color: #6F3BA3;
      }
    }
  }
</style>
