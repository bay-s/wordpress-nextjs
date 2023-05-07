import { gql } from "@apollo/client"

export const GET_CATEGORIES = gql`
query getAllCategory {
    categories {
      nodes {
        count
        uri
        name
        slug
      }
    }
  }
`