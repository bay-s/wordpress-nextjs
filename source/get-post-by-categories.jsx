import gql from 'graphql-tag';

export const GET_POSTS_BY_CATEGORY_SLUG = gql`
query GetPostsByCategory($categorySlug: ID!, $idType: CategoryIdType = SLUG) {
  category(id: $categorySlug, idType: $idType) {
    id
    name
    slug
    posts {
      nodes {
        content
        uri
        title
        date
        excerpt
        author {
          node {
            avatar {
              url
            }
            name
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
}
`;
