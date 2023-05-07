import Head from 'next/head'
import { gql } from '@apollo/client';
import { client } from '../../lib/apollo';
import Footer from '../../components/Footer';


export default function SlugPage({ post }) {
console.log(post);
  return (
    <div>
      <Head>
        <title>Headless WP Next Starter</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

 
       <div className='is-flex flex-column gap-2'>
 
 {
  !post.featuredImage ?  <div className="is-flex flex-column  ">
    <h1 className='is-title title txt-white'>{post.title}</h1>
    <div className='is-flex align-center gap-1'>
    <p className='txt-white is-bold '> {`${post.author.node.name}`}   </p>
    <span className='is-bold'>-</span>
      <p className='txt-white is-bold'>
      { new Date(post.date).toLocaleDateString() }
      </p>
    </div>
  </div>
  :     <div className="banner-single-post" style={{ backgroundImage: `url(${post.featuredImage?.node?.sourceUrl})` }}>
       <div className="overlay"></div>
 
 <div className="banner-content py-3 ">
    <h1 className='is-title title txt-white'>{post.title}</h1>
    <div className='is-flex align-center gap-1'>
    <p className='txt-white is-bold '> {`${post.author.node.name}`}   </p>
    <span className='is-bold'>-</span>
      <p className='txt-white is-bold'>
      { new Date(post.date).toLocaleDateString() }
      </p>
    </div>
  </div>
  
       </div>
       /* END BANNER */
 }
          <article className='lh-base' dangerouslySetInnerHTML={{__html: post.content}}>   
          </article>
 </div>
      <Footer></Footer>

    </div>
  )
}


export async function getStaticProps({ params }){
  const GET_POST_BY_URI = gql`
  query getPostByURI($id:ID!) {
    post(id: $id, idType: URI) {
      title
      uri
      date
      content
      author {
        node {
          firstName
          lastName
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
  `
  const response = await client.query({
    query:GET_POST_BY_URI,
    variables:{
      id:params.uri
    }
  })
  
  const post = response?.data?.post
  return {
    props: {
      post
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