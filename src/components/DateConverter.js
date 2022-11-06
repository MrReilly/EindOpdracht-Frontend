import React from "react";

export default function DateConverter(date){

    const update = date.split("T")



    return  new Date (update[0])

}