import { client } from "../../lib/apollo";
import { GET_FOOTER} from '../../source/get-footer-info';
 
//  /api/get-footer
// GET /api/get-footer

async function getFooters(req, res) {
    if (req.method === 'GET') {
      try {
 
        const responseFooter = await client.query({
          query: GET_FOOTER,
        });
      
        const footerInfo = responseFooter?.data?.getFooter
 console.log('footer');      
        res.status(200).json(footerInfo);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  }
  
  export default  getFooters;
 
 