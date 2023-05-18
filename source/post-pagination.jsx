import { gql } from "@apollo/client";

export const GET_PAGINATION_NEXT = gql`
query GetPosts($after: String ) {
    posts(first: 3, after: $after ) {
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