import { client } from "../../lib/apollo";
import { GET_HERO } from "../../source/get-hero";

//  /api/get-hero
// GET /api/get-hero

async function getHero(req, res) {
    if (req.method === 'GET') {
      try {
 
        const responseHero = await client.query({
            query: GET_HERO,
          });
         
          const hero = responseHero?.data?.heroSections?.nodes
        
        res.status(200).json(hero );
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  }
  
  export default getHero;
 