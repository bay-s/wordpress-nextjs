import { gql } from "@apollo/client";

export const GET_PAGINATION_PREV = gql`
query GetPostsBefore($before: String ) {
    posts(last: 5, before: $before ) {
      edges {
        node {
          title
          uri
          date
          content
          excerpt
          author {
            node {
              firstName
              lastName
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              slug
              uri
            }
          }
          tags {
            nodes {
              name
              uri
              slug
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        startCursor
        hasPreviousPage
      }
        }
  }
  
`