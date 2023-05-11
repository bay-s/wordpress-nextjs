import Head from 'next/head';
import PostCard from '../components/PostCard';
import { client } from '../lib/apollo';
import { GET_PORTOFOLIO } from '../source/get-portofolio';
import PortoCard from '../components/portofolio-card';
import { GET_ABOUT  } from '../source/get-about';
import { useEffect } from 'react';
import Image from 'next/image';
 
export default function Home({siteInfo,portofolio, about}) {
console.log( about);
  useEffect(() => {

    const fetchAPI = async () => {
      const getUser = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await getUser.json()
      
      const coments = await   fetch('https://jsonplaceholder.typicode.com/comments')
      const resComment = await coments.json()
      
      const testimonials = resComment.map(comment => {
        const user = users.find(user => user.id === comment.userId);
       
        return {
          avatar: user?.avatar,
          name: user?.name,
          testimonial: comment?.body,
        };
      });

 
    console.log(users);
    }
    // fetchAPI()
  },[])
  return (
    <>
 <Head>
 <title>{siteInfo?.siteTagLine}</title>
 </Head>
 {/* <BannerPage hero={hero}/> */}

<div className='is-flex flex-column gap-2 my-6' id='about'>
  <h3 className='is-title title is-1 txt-white text-center'>About</h3>
  <div className='columns is-multiline align-center'>
   <article className='column is-6'>
   <figure className={!about?.featuredImage  ? "hide" : "single-post-image"}>
 {about.featuredImage?.node?.sourceUrl && (
  <Image
    loader={() => about.featuredImage?.node?.sourceUrl}
    src={about.featuredImage?.node?.sourceUrl}
    width={400}
    height={250}
    alt="Image description"  objectFit="cover"
  />
)}
</figure>
   </article>
   <div className='column is-6 is-flex flex-column gap-2'>
   <article dangerouslySetInnerHTML={{__html: about?.content}}   id='services'>    
   </article>
   <a href='http://localhost:3000/page/about' className='button is-link'>Read More</a>
   </div>
  </div>
</div>

<div className='is-flex flex-column gap-4  my-6'>
 <ul className='is-flex flex-column gap-1 align-center border-butt pb-4'>
  <li>
  <h3 className='title is-2 is-title txt-white'>Project</h3>
  </li>
  <li>
  <h4 className='subtitle is-3 is-title txt-white'>  A small gallery of my recent projects.</h4>
  </li>
 </ul>
 <PortoCard portofolio={portofolio} />
</div>

    </>
  )
}

 
export async function getServerSideProps(){
  // const response = await client.query({
  //   query: GET_ALL_POSTS,
  // });

  // const posts = response?.data?.posts?.nodes
 
  const responsePortofolio = await client.query({
    query:  GET_PORTOFOLIO,
  });

 
  const responseAbout = await client.query({
    query: GET_ABOUT,
  });

 
  const portofolio = responsePortofolio?.data?.portofolios?.nodes
  const  about = responseAbout?.data?.pageBy 

  return {
    props: {
      portofolio,
      about
    }
  }
}
