import './EventCreateFrom.css'
import React, {useContext, useEffect, useState} from "react"
import Select from "react-select"
import {useForm, Controller} from "react-hook-form";
import PlaceSearchBox from "../PlaceSearchBox/PlaceSearchBox";
import {GlobalContext} from "../Context/GlobalContextProvider";
import Button from "../Button/Button";
import postEvent from "../APIs/postEvent";


function EventCreateForm(props) {
    const {
        createFormClicked,
        setCreateFormClicked,
        setCreateSubmitResponse,
    } = props

    const [image, setImage] = useState([])

    const {center, setCenter} = useContext(GlobalContext)
    const {location, setLocation} = useContext(GlobalContext)

    const {register, handleSubmit, control} = useForm();

    const [createFormMounted, setCreateFormMounted] = useState(false)

    const [entryPrice, setEntryPrice] = useState("")
    const [address, setAddress] = useState("")
    const [eventName, setEventName] = useState("")
    const [textDescription, setTextDescription] = useState("")

    useEffect(() => {
        setCreateFormMounted(true)
    }, [createFormClicked])

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

        setImage(e.target.files[0])
    }

    function onFormSubmit(data, e) {
        e.preventDefault()

        postEvent(eventName, location, address, center, entryPrice, textDescription, data, setCreateSubmitResponse, image)

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

            {createFormMounted &&
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
                        rules={{required: true}}
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
                                required={true}
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
                                required={true}
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
                                required={true}
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
                                required={true}
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
                                required={true}
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
                        required={true}
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