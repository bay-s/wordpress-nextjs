import { gql } from "@apollo/client";
import Head from "next/head";
import Footer from "../../components/Footer";
import { client } from "../../lib/apollo";


const SinglePage = ({pages}) => {
 
    return(
        <div>
        <Head>
          <title>Headless WP Next Starter</title>
          <link rel="icon" href="favicon.ico"></link>
        </Head>
  
 
        <main>
            <div className="siteHeader">
             <img src={pages.featuredImage.node.mediaItemUrl} />
              <p>✍️  &nbsp;&nbsp;{`${pages.author.node.name}`} || 🗓️ &nbsp;&nbsp;{ new Date(pages.date).toLocaleDateString() }</p>
            </div>
              <article dangerouslySetInnerHTML={{__html: pages.content}}>   
              </article>
        </main>
  
        <Footer></Footer>
      </div>
    )
}

export default SinglePage

export async function getStaticProps({ params }){
    const path = params.path.join("/")
    console.log(path);
    const GET_PAGES_BY_URI = gql`
    query GetPageByPath($path: String!) {
        pageBy(uri: $path) {
            id
            title
            content
            uri
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            date
            author {
              node {
                name
              }
            }
          }
        }
    `
    const response = await client.query({
      query:GET_PAGES_BY_URI,
      variables: { path }
    })
    
    const pages = response?.data?.pageBy
    console.log(pages);
    return {
      props: {
        pages
      }
    }
  }
  
  export async function getStaticPaths(){
      const paths = []
      return {
          paths,
          fallback: 'blocking'
      }
  }