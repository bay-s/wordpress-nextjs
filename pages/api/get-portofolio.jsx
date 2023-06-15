import { client } from "../../lib/apollo";
import { GET_PORTOFOLIO } from "../../source/get-portofolio";
 
//  /api/get-portofolio
// GET /api/get-portofolio

async function getPortofolio(req, res) {
    if (req.method === 'GET') {
      try {
 
        const responsePortofolio = await client.query({
            query:  GET_PORTOFOLIO,
          });
        
        const portofolio = responsePortofolio?.data?.portofolios?.nodes

        res.status(200).json(portofolio);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  }
  
  export default getPortofolio;
 