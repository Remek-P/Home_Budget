import React from "react";
import image from "../../assets/visuals/Move-along-nothing-to-see-here.jpg"

//404
export function MissingLink() {
    return (
        <img className="missing-link"
             src={image}
             alt="Still from The Naked Gun movie - Nothing to see here"
        />
    )
}