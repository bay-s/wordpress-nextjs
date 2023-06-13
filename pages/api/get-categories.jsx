import { client } from "../../lib/apollo";
import { GET_CATEGORIES } from "../../source/get-categories";
 
//  /api/get-categories
// GET /api/get-categories

async function getCategories(req, res) {
    if (req.method === 'GET') {
      try {
 
        const responseCat = await client.query({
            query:GET_CATEGORIES,
          })

          const categories = responseCat?.data?.categories?.nodes
 console.log('CATEGORIES');
        res.status(200).json(categories);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  }
  
  export default  getCategories;
 
 