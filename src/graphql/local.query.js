import gql from 'graphql-tag';

export const GET_ZOOM = gql`
  {
    zoom @client
  }
`
export const GET_CENTER = gql`
  {
    center @client {
      lat
      lng
    }
  }
`

