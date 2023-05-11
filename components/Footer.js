import Link from "next/link"

export default function Footer ({footerInfo}){
    return (
        <footer className="footers  p-5 mt-5  footer-dark">
          <div className="is-flex justify-arround ">
          <a
            href="https://developers.wpengine.com"
            target="_blank"
            rel="noopener noreferrer"
            className="has-text-primary"
            >
           {footerInfo.copyrightText}
            </a>
            <ul className="is-flex align-center gap-2">
              {
                footerInfo?.socialLinks.map(social => {
                return(
                <li>
                  <Link href={social?.iconUrl}>
                 <i class={`fa fa-${social?.iconName} txt-white is-clickable is-size-5`} aria-hidden="true"></i>
                 </Link>
                </li>
                )
              })
              }
            </ul>
          </div>
        </footer>
    )
}