import Head from 'next/head'
import { client } from '../../lib/apollo';
import { GET_POST_BY_URI } from '../../source/get-post-by-uri';
import { CommentAuthor } from '../../components/comment-author';

export default function SlugPage({ post }) {
    
  return (
    <>
<Head>
 <title>Posts || {post.title}</title>
</Head>


<section className='is-flex flex-column gap-2' id='single-post'>
 
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
 </section>

 <div className=''>
  <hr className='divider' />
  <div className='is-flex flex-column gap-2'>
    <h3 className={post.comments?.nodes?.length < 1 ? "hide" : 'is-title txt-white'}>{post.comments?.nodes?.length} COMMENT</h3>

<CommentAuthor />
{/* {
  post.comments?.nodes?.map(com => {
    return(
      <div className=''>
       <h3 className='txt-white'>{com.author?.node?.name}</h3>
       <img src={com.author?.node?.avatar.url} />
      </div>
    )
  })
} */}
<form className='is-flex flex-column gap-1' data-post_id={post.id}  >
<h3 class="label txt-white is-title">Leave a Reply</h3>

 
<div class="field">
  <label class="label txt-white is-title">Message</label>
  <div class="control">
    <textarea class="textarea no-bg is-primary txt-white" placeholder="Comments"        ></textarea>
  </div>
</div>

<button className='button is-medium is-link navbar-end'>LEAVE COMMENT</button>
    </form>
  </div> 
 </div>
 
    </>
  )
}


export async function getStaticProps({ params }){
 
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