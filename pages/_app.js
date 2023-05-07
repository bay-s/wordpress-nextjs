import '../styles/index.css'
import '../styles/bulma.min.css'
import '../styles/custom.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { ApolloProvider, gql } from '@apollo/client'
import Layout from '../components/layout'
import { client } from '../lib/apollo'
import { GET_MENUS } from '../source/get-menu'
import { GET_CATEGORIES } from '../source/get-categories';
import Header from '../components/header';
 
function MyApp({ Component, pageProps,menus,title,categories}) {
 
console.log(categories);
console.log(title);
console.log(menus);
  return (
 <Layout categories={categories}>
 <Header menus={menus} title={title}  />
  <ApolloProvider client={client}>
          <Component {...pageProps} />
   </ApolloProvider>
 </Layout>
 
    )
}

MyApp.getInitialProps = async (ctx) => {
 
  const responseCat = await client.query({
    query:GET_CATEGORIES,
  })
 
  const response = await client.query({
    query: GET_MENUS,
  });
 
  const GET_TITLE = gql`
  query GetSiteMetadata {
         generalSettings {
           title
         }
       }
  `
  const responseTitle = await client.query({
    query: GET_TITLE,
  });
 
  const menus = response?.data?.menuItems?.edges;
  const title = responseTitle.data?.generalSettings?.title
  const categories = responseCat?.data?.categories?.nodes
  
  return {
    menus,
    title,
    categories
  };
};

export default MyApp;