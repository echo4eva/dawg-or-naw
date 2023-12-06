"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { headers } from "../../next.config";

export default function Main() {

    const [userImage, setUserImage] = useState(null);
    const [display, setDisplay] = useState();
    const [description, setDescription] = useState("testing 123");
    const [label, setLabel] = useState("<insert here result lol>");

    function handleImageChange(e) {
        console.log(e.target.files)
        setDisplay(URL.createObjectURL(e.target.files[0]))
        setUserImage(e.target.files[0])
    }

    function handleGetTest(e) {
        axios
            .get(process.env.NEXT_PUBLIC_URL + "/api/testget", {
                headers: {
                    "Access-Control-Allow-Origin" : "*"
                }
            })
            .then((response) => {
                console.log(response.data)
            })
    }

    function handlePostTest(e) {
        e.preventDefault()
        axios
            .post(process.env.NEXT_PUBLIC_URL + "/api/testpost", {
                input: {description}
            })
            .then((response) => {
                console.log(response)
            })
    }

    function handleGradioTest(e) {
        e.preventDefault()
        axios
            .post(process.env.NEXT_PUBLIC_URL + "/api/gradiotest", {
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
            .post(process.env.NEXT_PUBLIC_URL + "/api/gradio", formData, {
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
            <p className="text-2xl">welcome to dawg or naw</p>
            <p>its a</p>
            <p>{label}</p>
            <img className="my-5 w-[300px] h-[300px] object-contain"src={display}  />
            <form className="flex flex-col">
                <input
                    className="ml-[100px] p-2"
                    type="file" 
                    name="image" 
                    onChange={handleImageChange} 
                />
                <button className="border mx-[168px] bg-white drop-shadow-lg active:bg-slate-100" type="submit" onClick={handleForm}>submit</button>
            </form>
            <div className="flex flex-col space-y-1 pt-1">
                <button className="border bg-white p-0.5 mx-[89px] drop-shadow-lg active:bg-slate-100" onClick={handleGetTest}>testGet</button>
                <button className="border bg-white p-0.5 mx-[89px] drop-shadow-lg active:bg-slate-100" onClick={handlePostTest}>testPost</button>
                <button className="border bg-white p-0.5 mx-[89px] drop-shadow-lg active:bg-slate-100" onClick={handleGradioTest}>testGradio</button>
            </div>
        </main>
    )
}