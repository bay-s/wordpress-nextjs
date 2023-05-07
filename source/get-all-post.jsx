import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
query gettAllPosts {
    posts {
      nodes {
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
  }
`