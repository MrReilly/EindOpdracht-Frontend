export default function DateConverter(date) {

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const currentDate = `${year}-${month}-${day}`

    return (currentDate)

}