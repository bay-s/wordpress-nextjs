import { gql } from "@apollo/client";

export const GET_PREV_NEXT_POSTS = gql`
query Post {
    posts(where: {status: PUBLISH}) {
      edges {
        node {
          id
        }
      }
    }
  }
`