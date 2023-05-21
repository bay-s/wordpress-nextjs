import Head from "next/head";
import { client } from "../../lib/apollo";
import Image from 'next/image';
import { GET_PAGES_BY_URI } from "../../source/get-pages-by-uri";
import { useRouter } from "next/router";
import { AboutPage } from "../../components/about-page";
import ContactForm from "../../components/contact-form";
import { GET_SKILLS } from "../../source/get-skills";
 
 
const SinglePage = ({pages,skills}) => {
 console.log(skills);
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
        <span className="txt-white title is-2">01 -</span>
    </li>
    <li>
        <span className="has-text-primary is-title title is-2">WHO I AM</span>
    </li>
</ul>
{
  currentPages === 'contact' ?  <h3 className="title is-2 is-title has-text-primary">Contact</h3> : <article dangerouslySetInnerHTML={{__html: pages.content}} className="">   
</article>
}
</div>

{
  currentPages === 'about' ? <AboutPage skills={skills} /> : ""
 }

 {
  currentPages === 'contact' ? <ContactForm /> : ""
 }
</section>
  
 
</>
    )
}

export default SinglePage

export async function getStaticProps({ params }){
    const path = params.path.join("/")
 
    const response = await client.query({
      query:GET_PAGES_BY_URI,
      variables: { path }
    })
    
    const responseSkills = await client.query({
      query: GET_SKILLS,
    });
  
    const  skills = responseSkills?.data?.skills?.nodes
    const pages = response?.data?.pageBy
 
    
    return {
      props: {
        pages,
        skills
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