import Link from "next/link"
import Image from 'next/image';
import formatDate from "../lib/timestamp";


export default function PostCard ({ post ,type}){
 const theExcerpt = post.excerpt.split("<div>")
    return (
<Link href={`/posts${post.uri}`}>

<div className="box post-card p-0">
  <figure className={!post.featuredImage ? "hide" : "post-thumbnail"}>
 {post.featuredImage?.node?.sourceUrl && (
  <Image
    loader={() => post.featuredImage?.node?.sourceUrl}
    src={post.featuredImage?.node?.sourceUrl}
    width={400}
    height={250}
    alt="Image description"  objectFit="cover"
  />
)}
</figure>

   <div className="card-content is-flex flex-column gap-1">
    <p className="is-title">{post.author?.node?.name} - {formatDate(post.date)}</p>
      <a className="txt-white is-title is-size-3 is-hover-link">
                <h3>{post.title} </h3>
      </a>
  <div className="is-flex align-center gap-1">
  {/* CATEGORIRES */}
   <div className="is-flex align-center gap-1">
    {
      post?.categories?.nodes.map(cat => {
       return (
        <Link href={`${cat.uri}`}  >
          <a className="tag is-link">{cat.name}</a>
        </Link>
       )
      })
    }
    </div>
    {/* END CATEGORIES */}
    {/* TAGS */}
    <div className="is-flex align-center gap-1">
    {
      post?.tags?.nodes.map(tag => {
       return (
        <Link href={`${tag.uri}`}>
        <a className="tag is-primary">{tag.name}</a>
      </Link>
       )
      })
    }
    </div>
    {/* END TAGS */}
  </div>
 
  <article className='lh-base post-content' dangerouslySetInnerHTML={{__html:theExcerpt[0]}}>   
  </article>
   
 
    </div>
    </div>
</Link>
    )
}