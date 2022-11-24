import React, {useContext, useState} from "react"
import Select from "react-select"
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import PlaceSearchBox from "../PlaceSearchBox/PlaceSearchBox";
import {MapFormContext} from "../Context/MapFormContextProvider";
import Button from "../Button/Button";

function EventCreateForm(props) {
    const {setCreateFormClicked} = props

    const [image, setImage] = useState([])
    const [previewURL, setPreviewURL] = useState('')

    const {center, setCenter} = useContext(MapFormContext)
    const {location, setLocation} = useContext(MapFormContext)

    const {register, handleSubmit, control} = useForm();

    const options = [
        {value: "CONFERENCE", label: "Conference"},
        {value: "ART", label: "Art"},
        {value: "MARKET", label: "Market"},
        {value: "FESTIVAL", label: "Festival"},
        {value: "THEATER", label: "Theater"},
        {value: "CONCERT", label: "Concert"},
        {value: "KIDS", label: "Kids"},
        {value: "FAIR", label: "Fair"},
        {value: "CIRCUS", label: "Circus"},
        {value: "NATURE", label: "Nature"},
        {value: "SPORTS", label: "Sports"},
        {value: "OTHER", label: "Other"}
    ]

    function onImageChange(e) {

        const uploadedImage = e.target.files[0];
        console.log(image, previewURL)
        setImage(uploadedImage)
        setPreviewURL(URL.createObjectURL(uploadedImage))
    }

    async function onFormSubmit(data, e) {
        e.preventDefault()
        const token = localStorage.getItem("token")

        try {
            const responseEvent = await axios.post('http://localhost:8080/event', {

                category: data.category.value,
                name: data.eventName,
                location: location,
                address: data.address,
                latCoordinate: center.lat,
                longCoordinate: center.lng,
                entryPrice: data.entryPrice,
                textDescription: data.textDescription,
                startDate: data.startDate,
                endDate: data.endDate

            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                },
            })
            console.log(responseEvent)


            const formData = new FormData();
            formData.append('image', image, 'image')


            const responseImage = await axios.post(`http://localhost:8080/image/${responseEvent.data}`,

                formData

                , {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `${token}`
                    },
                })
            console.log(responseImage)

        } catch (e) {
            console.error(e);
        }

        setLocation('')
        setCreateFormClicked(false)
    }

    return (
        <div className="ec-form-container">
            <Button
                className= "mid-drop-close-button"
                click={() => {setCreateFormClicked(false)}}

            >&times;</Button>

        <form onSubmit={handleSubmit(onFormSubmit)} className="ec-form">

            <PlaceSearchBox
                setCenter={setCenter}
                setLocation={setLocation}
                location={location}
            />

            <label htmlFor="category">Category:</label>
            <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({field}) => (
                    <Select options={options} {...field} label="category"/>)}/>

            <div className="ec-text-fields-container">
                <div className="ec-date-price-container">
                    <label htmlFor="start-date">Start date:</label>
                    <input
                        className="date"
                        placeholder="start:"
                        id="start-date"
                        type="date"
                        onChange="this.className=(this.value!=''?'has-value':'')"
                        {...register("startDate")}
                    />
                    <label htmlFor="organization-name">Organization: </label>
                    <input
                        id="organizationName"
                        type="text"
                        {...register("organizationName")}
                    />

                    <label htmlFor="entry-price">Entry price: </label>
                    <input
                        id="entry-price"
                        type="text"
                        {...register("entryPrice")}
                    />
                </div>

                <div className="ec-name-address-container">
                    <label htmlFor="end-date">End date:</label>
                    <input
                        className="date"
                        placeholder="end:"
                        id="end-date"
                        type="date"
                        onChange="this.className=(this.value!=''?'has-value':'')"
                        {...register("endDate")}
                    />

                    <label htmlFor="eventName">Event name: </label>
                    <input
                        id="eventName"
                        type="text"
                        {...register("eventName")}
                    />

                    <label htmlFor="address">Address: </label>
                    <input
                        id="address"
                        type="text"
                        {...register("address")}
                    />
                </div>
            </div>

            <label  htmlFor="text-description">Event Description: </label>
            <textarea
                className="ec-text-description"
                placeholder="Enter a description here.."
                id="textDescription"
                rows="8"
                cols="30"
                {...register("textDescription")}
            />

            <label className="ec-upload" htmlFor="image-upload">Select image to upload:
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={onImageChange}
                /></label>

            <button
                className="standard-button"
                id="post-button"
                type="submit"
            >Post Event
            </button>
        </form>
            </div>
    )
}

export default EventCreateForm