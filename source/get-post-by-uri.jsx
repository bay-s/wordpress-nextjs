import { gql } from "@apollo/client";

export const GET_POST_BY_URI = gql`
query getPostByURI($id:ID!) {
  post(id: $id, idType: URI) {
    id
    postId
    title
    uri
    date
    content
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
    comments {
      nodes {
        content
        author {
          node {
            avatar {
              url
            }
            name
          }
        }
        commentId
        date
      }
    }
  }
}
`