import React from "react";

export default function DateConverter(date){

    const [dateString, dateTime] = date.split("T")

    const [day, month, year] = dateString.split("-")

    return  new Date (+day, month-1, +year)

}