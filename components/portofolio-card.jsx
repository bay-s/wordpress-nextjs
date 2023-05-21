import Link from "next/link"
import Image from 'next/image';
import formatDate from "../lib/timestamp";
import { useRouter } from "next/router";
 
export default function PortoCard ({ portofolio }){
  const router = useRouter();
  const titles = "Project".split("")
 
  const handleClick = (e) => {
    e.preventDefault();
 
    router.push(e.target.dataset.uri);
  };

    return (
 
<div className='is-flex flex-column gap-4  my-6' >
 <ul className='is-flex flex-column gap-1 align-center border-butt pb-4'>
  <li>
  <h3 className='title is-2 is-title has-text-primary'>
  {
        titles.map(title => {
            return(
                <span className='hvr-wobble-vertical'>{title}</span>
            )
        })
    }
  </h3>
  </li>
  <li>
  <h4 className='subtitle is-3 is-title txt-white'>  A small gallery of my recent projects.</h4>
  </li>
 </ul>
  {/* START CARD */}
  <article className="columns is-multiline">
 
 {
 portofolio.slice(0, 4).map(porto => {
        return (
<div className="column is-3">

<div className="box  p-0 post-card" data-aos="fade-up"
     data-aos-duration="1500">

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
<div className={portofolio.length > 4 ? "is-flex justify-center" : "hide"}  >
<Link href='/portofolio'>
<button className="button is-primary">Read More</button>
</Link>
</div>
  {/* END CARD */}
</div>
    )
}