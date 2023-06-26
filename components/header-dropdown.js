import Link from "next/link"
import { useState } from "react"

 
const HeaderDropdown = ({item}) => {
    const [open,setOpen] = useState(false)

    const openDropDown = (e) => {
      e.preventDefault()
      setOpen(!open)
    }
    return(
        <div class="navbar-item has-dropdown is-hoverable">
      <a class={`navbar-link ${open ? 'opens' : ''}`} onClick={openDropDown}>
          {item?.name}
        </a>


        <div class={`navbar-dropdown ${open ? 'open' : ''}`} >
        {item?.childItems.map((childItem) => (
         <a href="#" className="navbar-item">
                        <Link
                       href={`/page${childItem.node.path}`}
                       class="navbar-item"
                       key={childItem.node.id}
                     >
                       {childItem.node.label}
                     </Link>
         </a>
                   ))}
        </div>
      </div>
 
    )
}

export default HeaderDropdown