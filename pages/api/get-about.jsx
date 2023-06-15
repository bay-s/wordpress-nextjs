import { client } from "../../lib/apollo";
import { GET_ABOUT } from "../../source/get-about";
 
 
//  /api/get-about
// GET /api/get-about

async function getAbout(req, res) {
    if (req.method === 'GET') {
      try {
 
        const responseAbout = await client.query({
            query: GET_ABOUT,
          });
        
          const  about = responseAbout?.data?.pageBy 
  
        res.status(200).json(about );
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  }
  
  export default getAbout;
 