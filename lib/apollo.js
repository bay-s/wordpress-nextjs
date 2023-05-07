// Add Apollo Client to this file
// import {ApolloClient,inMemoryChache} from '@apollo/client'

// export const client = new ApolloClient({
//     uri:`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
//     cache: new inMemoryChache(),
// })
// import { ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client';

// const cache = new InMemoryCache({
//   resultCaching:false
// })

// const link = createHttpLink({
//     uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
// })

// export const client = new ApolloClient({
//  link,
//  cache
// });

import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Define how to cache specific fields
          // Example: cache the "posts" field with a key of "allPosts"
          posts: {
            keyArgs: [],
            merge(existing = {}, incoming) {
              return {
                ...existing,
                ...incoming,
              };
            },
          },
        },
      },
    },
  });
  
console.log(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`)
export const client = new ApolloClient({
 uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
 cache
});
