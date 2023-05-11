import Head from "next/head";
import { client } from "../../lib/apollo";
import Image from 'next/image';
import {  GET_PORTFOLIO_BY_URI } from "../../source/get-portofolio-by-uri";
 
 
const SinglePage = ({pages}) => {
 console.log(pages);
    return(
<>
<Head>
 <title>Pages || {pages?.title}</title>
</Head>

<section id="single-post">

<div className="card-image">
<figure className={!pages?.featuredImage  ? "hide" : "single-post-image"}>
 {pages.featuredImage?.node?.sourceUrl && (
  <Image
    loader={() => pages.featuredImage?.node?.sourceUrl}
    src={pages.featuredImage?.node?.sourceUrl}
    width={400}
    height={250}
    alt="Image description"  objectFit="cover"
  />
)}
</figure>

              <p>✍️  &nbsp;&nbsp;{`${pages?.author?.node?.name}`} || 🗓️ &nbsp;&nbsp;{ new Date(pages?.date).toLocaleDateString() }</p>
            </div>
              <article dangerouslySetInnerHTML={{__html: pages?.content}}>   
              </article>

 
</section>
  
</>
    )
}

export default SinglePage

export async function getStaticProps({ params }){
    const path = params.path.join("/")
    console.log(path);
 
    const response = await client.query({
      query:GET_PORTFOLIO_BY_URI,
      variables: { path }
    })
    
    const pages = response?.data?.portofolioBy
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