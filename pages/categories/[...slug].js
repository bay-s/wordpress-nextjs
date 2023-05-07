
import { client } from "../../lib/apollo";
import { GET_POSTS_BY_CATEGORY_SLUG } from "../../source/get-post-by-categories";
import PostCard from "../../components/PostCard";
import { useRouter } from "next/router";

export default function TagsPage( {posts}) {
  const route = useRouter()
  const categoryName = route.asPath.split("/")
 
  return (

 <article className="is-flex flex-column gap-2">
<h3 className="is-title txt-white is-size-4">Result for category : {categoryName[categoryName.length - 1]}</h3>
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
  const slugs = slug[2]
  const response = await client.query({
    query: GET_POSTS_BY_CATEGORY_SLUG,
    variables: {
      categorySlug: slugs,
    },
  });

  const posts = response?.data?.category?.posts?.nodes
  // const posts = category?.posts?.nodes;
 
  return {
    props: {
      posts
    },
  };
}