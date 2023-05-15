import Head from "next/head";
import { client } from "../../lib/apollo";
import Image from 'next/image';
import {  GET_PORTFOLIO_BY_URI } from "../../source/get-portofolio-by-uri";
import Link from "next/link";
 
 
const SinglePage = ({pages}) => {
 console.log(pages);
    return(
<>
<Head>
 <title>Pages || {pages?.title}</title>
</Head>

<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="/" className='txt-white is-title'>Home</a></li>
    <li><Link href='/portofolio'><a className='txt-white is-title'>Portofolio</a></Link></li>
    <li class="is-active"><a href="#" className='has-text-grey-light is-title' aria-current="page">{pages?.title}</a></li>
  </ul>
</nav>

<section className="is-flex flex-column gap-2" id="single-post">

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