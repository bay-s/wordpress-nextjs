import { client } from "../../lib/apollo";
import { GET_PAGINATION_PREV } from "../../source/get-pagination-prev";
//  /api/get-post-pagination-prev
// GET /api/get-post-pagination-prev
 
async function getPostPaginationPrev(req, res) {
 
    const slug = req.query.slug
    if (req.method === 'GET') {
      try {
        console.log(slug);
        console.log('slug');
        const response = await client.query({
            query: GET_PAGINATION_PREV ,
            variables: {
              before:slug
            }
          });

        const postNext = response?.data;
 console.log(response?.data?.posts?.edges);
 console.log('POST');
        res.status(200).json(postNext);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  }
  
  export default getPostPaginationPrev;
 
//   export default function(req, res) {
//     // Refresh the code here
//     delete require.cache[require.resolve('./getPostPaginationPrev')];
//     const refreshedCode = require('./getPostPaginationPrev');
//     refreshedCode(req, res);
//   }