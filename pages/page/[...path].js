import Head from "next/head";
import { client } from "../../lib/apollo";
import Image from 'next/image';
import { GET_PAGES_BY_URI } from "../../source/get-pages-by-uri";
 
 
const SinglePage = ({pages}) => {
 
  const submits = (e) => {
    e.preventDefault()
   
  }
    return(
<>
<Head>
 <title>Pages || {pages?.title}</title>
</Head>

<section className="is-flex flex-column gap-3" id="single-post">

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
</div>
              <article dangerouslySetInnerHTML={{__html: pages.content}}>   
              </article>

 <form className="form" onSubmit={submits}>
  <input className="input" />
  <button className="button">Button</button>
 </form>

</section>
  
 
</>
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