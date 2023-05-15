import Image from 'next/image';

export const AboutCard = ({about}) => {
   const titles = about.title.split("")
    return(
<div className='is-flex flex-column gap-2 my-6' id='about'>
  <h3 className='is-title title is-1 has-text-primary text-center'>
    {
        titles.map(title => {
            return(
                <span className='hvr-wobble-vertical'>{title}</span>
            )
        })
    }
  </h3>
  <div className='columns is-multiline align-center gap-2'>
   <article className='column ' data-aos="fade-right"
     data-aos-duration="800"
     data-aos-easing="ease-in-sine">
   <figure className={!about?.featuredImage  ? "hide" : "single-post-image"}>
 {about.featuredImage?.node?.sourceUrl && (
  <Image
    loader={() => about.featuredImage?.node?.sourceUrl}
    src={about.featuredImage?.node?.sourceUrl}
    width={400}
    height={250}
    alt="Image description"  objectFit="cover"
  />
)}
</figure>
   </article>
   <div className='column is-6 is-flex flex-column gap-2' data-aos="fade-left"
     data-aos-duration="1000"
     data-aos-easing="ease-in-sine">
   <article dangerouslySetInnerHTML={{__html: about?.content}}   id='services'>    
   </article>
   <a href='http://localhost:3000/page/about' className='button is-link'>Read More</a>
   </div>
  </div>
</div>
    )
}