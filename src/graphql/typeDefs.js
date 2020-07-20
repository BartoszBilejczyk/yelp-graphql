import gql from 'graphql-tag';

export const typeDefs = gql`
  type MapCenter {
    lat: String!
    lng: String!
  }
  type Category {
    title: String!
    alias: String!
  }
  type Categories {
    total: Int!
    category: Category!
  }
  type BusinessLocation {
    address1: String!
    city: String!
  }
  type Business {
    name: String!
    distance: String!
    url: String!
    rating: String
    review_count: String
    price: String
    photos: [String]
    location: BusinessLocation
  }
  type Search {
    total: Int!
    business: Business!
  }
`;
