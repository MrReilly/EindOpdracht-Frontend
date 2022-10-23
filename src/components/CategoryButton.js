import React from "react"



export default function CategoryButton(props){


    return(

        <button
            id = {props.id}
            className={props.className}
            name = {props.name}
            type="button"
            onClick={() => {props.clickedSet(!props.clicked)}}
        >
            <img className= "category-image" src={props.image} alt={props.name}
            /></button>

    )
}





