import { client } from "../../lib/apollo";
import { GET_PAGINATION_NEXT } from "../../source/get-pagination-next";

//  /api/get-post-pagination-next
// GET /api/get-post-pagination-next

async function getPostPaginationNext(req, res) {
 
    const slug = req.query.slug
    if (req.method === 'GET') {
      try {
        console.log(slug);
        console.log('slug');
        const response = await client.query({
            query:  GET_PAGINATION_NEXT ,
            variables: {
              after:slug
            }
          });

        const postNext = response?.data;
 console.log(response?.data?.posts?.edges);
 console.log('POST test');
        res.status(200).json(postNext);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  }
  
  export default  getPostPaginationNext;
 
 