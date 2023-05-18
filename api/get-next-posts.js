
import { client } from "../lib/apollo";
import { GET_ALL_POSTS } from "../source/get-all-post";

//  /api/get-next-posts
// GET /api/get-next-posts

async function getPosts(req,res,body){
 
    if (req.method === 'GET') {
        try {
 
          const response = await client.query({
            query:  GET_PAGINATION_NEXT,
          });
        
          const posts = response?.data?.posts?.edges
          return posts
        } catch (error) {
          console.error(error);
          return error
        }
      }
    }


export default getPosts