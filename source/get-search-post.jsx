import { gql } from "@apollo/client";


export  const SEARCH_POSTS = gql`
query SearchPosts($search: String!) {
  posts(where: { search: $search }) {
    edges {
      node {
        id
        title
        content
        excerpt
        uri
        date
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
      }
    }
  }
}
`;


