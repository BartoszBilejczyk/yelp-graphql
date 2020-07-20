import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query AllCategoriesQuery {
    categories {
      total
      category {
        title
        alias
      }
    }
  }
`
