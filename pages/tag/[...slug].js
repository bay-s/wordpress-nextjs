
import { client } from "../../lib/apollo";
import PostCard from "../../components/PostCard";
import { useRouter } from "next/router";
import { GET_POSTS_BY_TAG_SLUG } from "../../source/get-post-by-tags";

export default function CategoryPage( {posts}) {
  const route = useRouter()
  const tagName = route.asPath.split("/")
 console.log(posts);
  return (

 <article className="is-flex flex-column gap-2">
<div className="is-flex align-start gap-3">
<h3 className="is-title txt-white is-size-4">Result for tags : {
  tagName[tagName.length - 1]}</h3>
<h3 className="is-title txt-white is-size-4">{posts.length} RESULT</h3>
</div>
  {
  posts.map((post) => {
      return (
        <PostCard key={post.uri} post={post}></PostCard>
      )
    })
}
 </article>

  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const slugs = slug.join("")
  const response = await client.query({
    query: GET_POSTS_BY_TAG_SLUG,
    variables: {
      tagSlug: slugs,
    },
  });

  const posts = response?.data?.tag?.posts?.nodes
  console.log(posts);
  console.log('post tags');
  // const posts = category?.posts?.nodes;
 
  return {
    props: {
      posts
    },
  };
}