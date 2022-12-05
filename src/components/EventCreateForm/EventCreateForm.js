import React, {useContext, useEffect, useState} from "react"
import Select from "react-select"
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import PlaceSearchBox from "../PlaceSearchBox/PlaceSearchBox";
import {MapFormContext} from "../Context/MapFormContextProvider";
import Button from "../Button/Button";

function EventCreateForm(props) {
    const {
        createFormClicked,
        setCreateFormClicked,
        setCreateSubmitResponse
       } = props

    const [image, setImage] = useState([])
    const [previewURL, setPreviewURL] = useState('')

    const {center, setCenter} = useContext(MapFormContext)
    const {location, setLocation} = useContext(MapFormContext)

    const {register, handleSubmit, control} = useForm();

    const [createFormMounted, setCreateFormMounted] = useState(false)

    const [entryPrice, setEntryPrice] = useState("")
    const [address, setAddress] = useState("")
    const [eventName, setEventName] = useState("")
    const [textDescription, setTextDescription] = useState("")

    useEffect(() => {setCreateFormMounted(true)},[createFormClicked])

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
                name: eventName,
                location: location,
                address: address,
                latCoordinate: center.lat,
                longCoordinate: center.lng,
                entryPrice: entryPrice,
                textDescription: textDescription,
                startDate: data.startDate,
                endDate: data.endDate

            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                },
            })
            setCreateSubmitResponse({message: responseEvent.data, status: responseEvent.status})


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
        <div className={`ec-form-container ${createFormClicked ? "ec-out" : "ec-in"}`}>
            <Button
                className="mid-drop-close-button"
                click={() => {
                    setCreateFormClicked(false)
                }}

            >&times;</Button>

            { createFormMounted &&
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className={`ec-form ${createFormClicked ? "ecf-out" : "ecf-in"}`}
                >


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

                        <div className="ec-label-max-char-container">
                            <label htmlFor="entry-price">Entry price: </label>
                            <p className={entryPrice.length >= 15 ? "field-count-max" : undefined}>{entryPrice.length}/15</p>
                        </div>
                        <input
                            maxLength={15}
                            id="entry-price"
                            type="text"
                            value={entryPrice}
                            onChange={(e) => {
                                setEntryPrice(e.target.value)
                            }}
                        />

                        <label htmlFor="image-upload">Select image to upload:
                            <input
                                type="file"
                                id="image-upload"
                                className="ec-upload"
                                accept="image/*"
                                onChange={onImageChange}
                            /></label>
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

                        <div className="ec-label-max-char-container">
                            <label htmlFor="eventName">Event name: </label>
                            <p className={eventName.length >= 30 ? "field-count-max" : undefined}>{eventName.length}/30</p>
                        </div>
                        <input
                            id="eventName"
                            type="text"
                            maxLength={30}
                            value={eventName}
                            onChange={(e) => {
                                setEventName(e.target.value)
                            }}
                        />

                        <div className="ec-label-max-char-container">
                            <label htmlFor="address">Address: </label>
                            <p className={address.length >= 30 ? "field-count-max" : undefined}>{address.length}/30</p>
                        </div>
                        <input
                            id="address"
                            type="text"
                            maxLength={30}
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                        />
                    </div>
                </div>

                <div className="ec-label-max-char-container">
                    <label htmlFor="text-description">Event Description: </label>
                    <p className={textDescription.length >= 300 ? "field-count-max" : undefined}>{textDescription.length}/300</p>
                </div>
                <textarea
                    className="ec-text-description"
                    placeholder="Enter a description here.."
                    maxLength={300}
                    id="textDescription"
                    value={textDescription}
                    onChange={(e) => {
                        setTextDescription(e.target.value)
                    }}
                    rows="8"
                    cols="30"
                />

                <button
                    className="standard-button"
                    id="post-button"
                    type="submit"
                >Post Event
                </button>
            </form>}
        </div>
    )
}

export default EventCreateForm