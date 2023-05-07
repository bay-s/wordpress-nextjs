import gql from 'graphql-tag';

export const GET_POSTS_BY_TAG_SLUG = gql`
query GetPostsByTag($tagSlug: ID!, $idType: TagIdType = SLUG) {
  tag(id: $tagSlug, idType: $idType) {
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
