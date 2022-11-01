import React from "react"



export default function CategoryButton(props){
    const {id, name, className, image, clicked, clickedSet} = props

    return(

        <button
            id = {id}
            className={className}
            name = {name}
            type="button"
            onClick={() => {clickedSet(!clicked)}}
        >
            <img className= "category-image" src={image} alt={name}
            /></button>

    )
}





