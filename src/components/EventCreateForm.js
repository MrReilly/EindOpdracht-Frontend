import React, {useContext, useEffect, useState} from "react"
import Search from "./Place-Search-Box";
import Select from "react-select"

import {MapFormContext} from "./Context/MapFormContextProvider";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import axiosFormData from "axios-form-data";

function EventCreateForm() {

    const [image, setImage] = useState([])
    const [previewURL, setPreviewURL] = useState('')


    const {register, handleSubmit, control} = useForm();

    const {coordinates} = useContext(MapFormContext)
    const {address} = useContext(MapFormContext)

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

    function onImageChange(e){

        const uploadedImage = e.target.files[0];
        console.log(image, previewURL)
        setImage(uploadedImage)
        setPreviewURL(URL.createObjectURL(uploadedImage))
    }

    async function onFormSubmit(data, e) {
        e.preventDefault()
        data.coordinates = {coordinates}
        data.location = {address}

        console.log(data)

        const token = localStorage.getItem("token")

        try {
            const responseEvent = await axios.post('http://localhost:8080/event', {

                category: data.category.value,
                name: data.eventName,
                location: data.location.address,
                address: data.address,
                latCoordinate: data.coordinates.coordinates.lat,
                longCoordinate: data.coordinates.coordinates.lng,
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

        document.getElementById("middle-plate").style.height = 0
    }

    return (

        <form onSubmit={handleSubmit(onFormSubmit)} className="event-create-form">

            <label className="event-create-form-label" htmlFor="search">Location of the Event:</label>
            <Search
                key="search"
                name="search"
                id="search"/>
            <label className="event-create-form-label" htmlFor="category">Category:</label>
            <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({field}) => (
                    <Select options={options} {...field} label="category"/>)}/>

            <div className="text-fields-container">
                <div className="date-price-container">
                    <label className="event-create-form-label" htmlFor="start-date">Start date:</label>
                    <input
                        className="date"
                        placeholder="start:"
                        id="start-date"
                        type="date"
                        onChange="this.className=(this.value!=''?'has-value':'')"
                        {...register("startDate")}
                    />
                    <label className="event-create-form-label" htmlFor="organization-name">Organization: </label>
                    <input

                        className="create-form-text-description"
                        id="organizationName"
                        type="text"
                        {...register("organizationName")}
                    />

                    <label className="event-create-form-label" htmlFor="entry-price">Entry price: </label>
                    <input
                        className="create-form-text-description"
                        id="entry-price"
                        type="text"
                        {...register("entryPrice")}
                    />
                </div>

                <div className="name-address-container">
                    <label className="event-create-form-label" htmlFor="end-date">End date:</label>
                    <input
                        className="date"
                        placeholder="end:"
                        id="end-date"
                        type="date"
                        onChange="this.className=(this.value!=''?'has-value':'')"
                        {...register("endDate")}
                    />

                    <label className="event-create-form-label" htmlFor="eventName">Event name: </label>
                    <input
                        className="create-form-text-description"
                        id="eventName"
                        type="text"
                        {...register("eventName")}
                    />

                    <label className="event-create-form-label" htmlFor="address">Address: </label>
                    <input
                        className="create-form-text-description"
                        id="address"
                        type="text"
                        {...register("address")}
                    />
                </div>
            </div>

            <label className="event-create-form-label" htmlFor="text-description">Event Description: </label>
            <textarea
                className="create-form-text-description"
                placeholder="Enter a description here.."
                id="textDescription"
                rows="8"
                cols="30"
                {...register("textDescription")}
            />

            <label className="event-create-upload" htmlFor="image-upload">Select image to upload:
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

    )
}

export default EventCreateForm