import { client } from "../../lib/apollo";
import { GET_TITLE } from "../../source/get-title";

//  /api/get-site-title
// GET /api/get-site-title

async function getTitle(req, res) {
    if (req.method === 'GET') {
      try {
 
        const responseTitle = await client.query({
            query: GET_TITLE,
          });
         
         const siteInfo = responseTitle.data?.getHeader        
 console.log('site title');
        res.status(200).json( siteInfo);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  }
  
  export default getTitle;
 
 