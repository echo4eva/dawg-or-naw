"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function Main() {

    const [userImage, setUserImage] = useState(null);
    const [display, setDisplay] = useState();
    const [description, setDescription] = useState("testing 123");
    const [label, setLabel] = useState("");

    function handleImageChange(e) {
        console.log(e.target.files)
        setDisplay(URL.createObjectURL(e.target.files[0]))
        setUserImage(e.target.files[0])
    }

    function handleGetTest(e) {
        axios
            .get("http://localhost:8080/api/testget")
            .then((response) => {
                console.log(response.data)
            })
    }

    function handlePostTest(e) {
        e.preventDefault()
        axios
            .post("http://localhost:8080/api/testpost", {
                input: {description}
            })
            .then((response) => {
                console.log(response)
            })
    }

    function handleGradioTest(e) {
        e.preventDefault()
        axios
            .post("http://localhost:8080/api/gradiotest", {
                input: {description}
            })
            .then((response) => {
                console.log(response)
            })
    }

    function handleForm(e) {
        e.preventDefault()

        const formData = new FormData();
        formData.append("file", userImage)

        axios
            .post("http://localhost:8080/api/gradio", formData, {
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((response) => {
                console.log(response)
                setLabel(response.data.label)
            })
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <p>helloge everyone!</p>
            <p>its a</p>
            <p>{label}</p>
            <img src={display} />
            <form>
                <input 
                    type="file" 
                    name="image" 
                    onChange={handleImageChange} 
                />
                <button type="submit" onClick={handleForm}>sendge</button>
            </form>
            <button onClick={handleGetTest}>testGet</button>
            <button onClick={handlePostTest}>testPost</button>
            <button onClick={handleGradioTest}>testGradio</button>
        </main>
    )
}