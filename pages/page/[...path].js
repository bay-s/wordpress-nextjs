import Head from "next/head";
import { client } from "../../lib/apollo";
import Image from 'next/image';
import { GET_PAGES_BY_URI } from "../../source/get-pages-by-uri";
import { useRouter } from "next/router";
import { AboutPage } from "../../components/about-page";
 

const SinglePage = ({pages}) => {
  const route = useRouter()
  const blogName = route.asPath.split("/")
  const currentPages = blogName[blogName.length - 1]
    return(
<>
<Head>
 <title>Pages || {pages?.title}</title>
</Head>

<section className="is-flex flex-column gap-5" id="single-post">

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
 
<div className="is-flex flex-column gap-5">
<ul className={currentPages === 'about' ? "is-flex align-center gap-2" : "hide"}>
    <li>
        <span className="txt-white title is-2">01</span>
    </li>
    <li>
        <span className="has-text-primary is-title title is-2">WHO I AM</span>
    </li>
</ul>
<article dangerouslySetInnerHTML={{__html: pages.content}} className="">   
</article>
</div>

 {
  currentPages === 'about' ? <AboutPage /> : ""
 }

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