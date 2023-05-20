import { DiscussionEmbed } from 'disqus-react';

const DisqusComments = ({ post }) => {
    const disqusShortname = 'localhost-h7jlwof9z1'; // Replace with your Disqus shortname
    const disqusConfig = {
      url: post.slug,
      identifier: post.postId,
      title: post.title,
    };
  
    return <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />;
  };
  
  export default DisqusComments;
  