import Head from 'next/head';
import PostCard from '../components/PostCard';
import { client } from '../lib/apollo';
import { GET_PORTOFOLIO } from '../source/get-portofolio';
import PortoCard from '../components/portofolio-card';
import { GET_ABOUT  } from '../source/get-about';
import { AboutCard } from '../components/about-card';
 
export default function Home({siteInfo,portofolio, about}) {
 
  return (
    <>
 <Head>
 <title>{siteInfo?.siteTagLine}</title>
 </Head>
 {/* <BannerPage hero={hero}/> */}
<AboutCard about={about} />
<PortoCard portofolio={portofolio} />

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
