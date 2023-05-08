import Head from "next/head";
import Footer from "../../components/Footer";
import { client } from "../../lib/apollo";
import Image from 'next/image';
import { GET_PAGES_BY_URI } from "../../source/get-pages-by-uri";
 

const SinglePage = ({pages}) => {
 
    return(
        <div>
        <Head>
          <title>Headless WP Next Starter</title>
          <link rel="icon" href="favicon.ico"></link>
        </Head>
  
 
<section id="single-post">
            <div className="siteHeader">
 
<figure className={!pages.featuredImage  ? "hide" : "single-post-image"}>
 {pages.featuredImage?.node?.mediaItemUrl && (
  <Image
    loader={() => pages.featuredImage?.node?.mediaItemUrl}
    src={pages.featuredImage?.node?.mediaItemUrl}
    width={400}
    height={250}
    alt="Image description"  objectFit="cover"
  />
)}
</figure>
              <p>✍️  &nbsp;&nbsp;{`${pages.author.node.name}`} || 🗓️ &nbsp;&nbsp;{ new Date(pages.date).toLocaleDateString() }</p>
            </div>
              <article dangerouslySetInnerHTML={{__html: pages.content}}>   
              </article>
        </section>
  
        <Footer></Footer>
      </div>
    )
}

export default SinglePage

export async function getStaticProps({ params }){
    const path = params.path.join("/")
    console.log(path);
 
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