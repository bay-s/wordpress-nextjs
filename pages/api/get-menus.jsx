import { GET_MENUS } from "../../source/get-menu";
import { client } from "../../lib/apollo";
 
//  /api/get-menus
// GET /api/get-menus

async function getMenus(req, res) {
    if (req.method === 'GET') {
      try {
 
        const response = await client.query({
            query: GET_MENUS,
          });
         
          const menus = response?.data?.menuItems?.edges;
 console.log('enus');
        res.status(200).json(menus);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  }
  
  export default getMenus;
 