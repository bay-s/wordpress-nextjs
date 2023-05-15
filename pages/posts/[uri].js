import Head from 'next/head'
import { client } from '../../lib/apollo';
import { GET_POST_BY_URI } from '../../source/get-post-by-uri';
import { CommentAuthor } from '../../components/comment-author';
import Link from 'next/link';
import { useState } from 'react';
import { GET_NEXT_AND_PREVIOUS_POSTS } from '../../source/get-post-preview';
import { useRouter } from 'next/router';
 
export default function SlugPage({ post,postPreview}) {
  const { query } = useRouter()
 
  let previousPost = null;
  let nextPost = null;

  for (let i = 0; i < postPreview.length; i++) {
    const postUri = postPreview[i].node.uri.split("/")
    if (postUri[1] === query.uri) {
      nextPost  = i > 0 ? postPreview[i - 1].node : null;
      previousPost = i < postPreview.length - 1 ? postPreview[i + 1].node : null;
      break;
    }
  }

  console.log( previousPost );
  console.log(nextPost);
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    message:''
  })

  const handlerChange = (e) => {
    const {name,value} = e.target
 
    setFormData({
      ...formData,
      [name]:value
      });
    console.log(formData);
  }
  const submitComment = async (e) => {
    e.preventDefault()
 
    const endpoint = 'https://simple-blogz.000webhostapp.com/wp-json/wp/v2/comments';
    console.log(endpoint);
    const data = {
      author_name:formData.name,
      author_email:formData.email,
      content:formData.message,
      post: 1,
    };
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Comment submitted successfully.');
    } else {
      const errorData = await response.json();
      console.log('Error:', errorData.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  }

  const user = {
    name: "Maria",
    email: "maria@example.com",
    jwt: "jwt-string-value",
  }
  return (
    <>
<Head>
 <title>Posts || {post.title}</title>
</Head>


<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="/" className='txt-white is-title'>Home</a></li>
    <li><Link href='/blog'><a className='txt-white is-title'>Blog</a></Link></li>
    <li class="is-active"><a href="#" className='has-text-grey-light is-title' aria-current="page">{post.title}</a></li>
  </ul>
</nav>

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

<ul className='is-flex justify-between align-center mt-6'>
<li className='is-flex gap-1 align-center'>
<i class="fa fa-caret-left txt-white is-size-6" aria-hidden="true"></i>
  <Link href={`/posts/${previousPost?.uri}`} >
    <span className='has-text-primary is-clickable is-title txt-small'>{previousPost?.title}</span>
  </Link>
 </li>
 <li className='is-flex gap-1 align-center'>
  <Link href={`/posts/${nextPost?.uri}`} >
    <span className='has-text-primary is-clickable is-title txt-small'>{nextPost?.title}  
    </span>
  </Link>
  <i class="fa fa-caret-right txt-white is-size-6" aria-hidden="true"></i>
 </li>
</ul>

 <div className=''>
  <hr className='divider' />
  <div className='is-flex flex-column gap-2'>
    <h3 className={post.comments?.nodes?.length < 1 ? "hide" : 'is-title txt-white'}>{post.comments?.nodes?.length} COMMENT</h3>

<CommentAuthor />
{
  post.comments?.nodes?.map(com => {
    return(
      <div className=''>
       <h3 className='txt-white'>{com.author?.node?.name}</h3>
       <img src={com.author?.node?.avatar.url} />
      </div>
    )
  })
}
<form className='is-flex flex-column gap-1' data-post_id={post.postId} onSubmit={ submitComment} >
<h3 class="label txt-white is-title">Leave a Reply</h3>

<div class="field">
  <label class="label txt-white is-title">Name</label>
  <div class="control">
    <input className='input' name='name' type='text' onChange={handlerChange}/>
  </div>
</div>

<div class="field">
  <label class="label txt-white is-title">Message</label>
  <div class="control">
  <input className='input' name='email' type='email' onChange={handlerChange}/>
  </div>
</div>
 
<div class="field">
  <label class="label txt-white is-title">Message</label>
  <div class="control">
    <textarea class="textarea no-bg is-primary txt-white" name='message' placeholder="Comments" onChange={handlerChange}></textarea>
  </div>
</div>

<button className='button is-medium is-link navbar-end'>LEAVE COMMENT</button>
    </form>
 
  </div> 
 </div>
 
    </>
  )
}


export async function getServerSideProps({ params }){
 
  const response = await client.query({
    query:GET_POST_BY_URI,
    variables:{
      id:params.uri
    }
  })
   
  const responsePostPreview = await client.query({
    query: GET_NEXT_AND_PREVIOUS_POSTS,
    variables: {
      after: params.uri,
      before: params.uri,
    },
  });

  const post = response?.data?.post
  const postPreview = responsePostPreview?.data?.posts?.edges
 
  return {
    props: {
      post,
      postPreview
    }
  }
}

 