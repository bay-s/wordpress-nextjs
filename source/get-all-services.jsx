import { gql } from "@apollo/client";

export const GET_ALL_SERVICES = gql`
query GetServices {
    services {
      nodes {
        title
        date
        content
      }
    }
  }
`