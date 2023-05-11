import Link from "next/link"
import Image from 'next/image';
import formatDate from "../lib/timestamp";
import { useRouter } from "next/router";

export default function PortoCard ({ portofolio }){
  const router = useRouter();
 
  const handleClick = (e) => {
    e.preventDefault();
 
    router.push(e.target.dataset.uri);
  };

    return (
<article className="columns is-multiline">
 
 {
    portofolio.map(porto => {
        return (
<div className="column is-3">

<div className="box  p-0 post-card">

  <div class="card-image">
<figure className={!porto.featuredImage ? "hide" : "post-thumbnail"}>
 {porto.featuredImage?.node?.sourceUrl && (
  <Image
    loader={() => porto.featuredImage?.node?.sourceUrl}
    src={porto.featuredImage?.node?.sourceUrl}
    width={400}
    height={250}
    alt="Image description"  objectFit="cover"
  />
)}
</figure>
  </div>

   <div className="card-content is-flex flex-column gap-1">
     <a href={`${porto?.uri}`} data-uri={`/${porto?.uri}`} onClick={handleClick}>
       <h3 className="is-title is-size-5 is-hover-link has-text-grey-lighter is-clickable" data-uri={`${porto?.uri}`}>{porto.title} </h3>
     </a>
      <p className="is-title has-text-grey-lighter">{porto?.author?.node?.name} - {formatDate(porto?.date)}</p>
    </div>
    </div>
 
            </div>
        )
    })
 }
</article>
    )
}