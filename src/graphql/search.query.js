import gql from 'graphql-tag';

export const GET_RESULTS = gql`
  query GetResults($term: String, $category: String) {
    search (
      term: $term,
      categories: $category,
      limit: 50
      latitude: 52.237022,
      longitude: 21.050440,
      radius: 15000
    ) @connection(key: "search") {
      total
      business {
        name
        distance
        location {
          address1
          city
        }
        url
        rating
        review_count
        price
        photos
        coordinates {
          latitude
          longitude
        }
      }
    }
  }
`

