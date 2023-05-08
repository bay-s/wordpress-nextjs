import Image from "next/image"

export const CommentAuthor = ({authors}) => {

    return(
        <div className="is-flex flex-column gap-1">
          <div className="is-flex align-center gap-1">
            <figure class="image is-32x32">
  <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
</figure>
            <h3 className="is-title txt-white">Eren</h3>
          </div>
        </div>
    )
}