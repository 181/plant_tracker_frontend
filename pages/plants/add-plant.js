import axios from 'axios'
import {useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'

const backgroundImageUrl = '/images/side_panel.jpg'; 
const postUrl = `${process.env.API_URL}`;

export default function AddPlant() {
    const [succeed, setSucceed] = useState(false);
    const [error, setError] = useState(false);
    const [errorContent, setErrorContent] = useState('');
    const [plant, setPlant] = useState({
        plantName: "",
        species: "",
        wateringInstruction: "",
        plantImage: ""
    });
    const handleFileChange = () => (e) => {
        setPlant((prevState) => ({
            ...prevState,
            plantImage: e.target.files[0]
        }));
    };
    const handleChange = () => (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setPlant((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(plant).forEach(([key, value]) => {
            formData.append(key, value);
        });
        axios.post(
            postUrl,
            formData,
            {headers: {Accept: "application/json"}}
        ).then(function (res) {
            setSucceed(true);
            setError(false);
            setPlant({
                plantName: "",
                species: "",
                wateringInstruction: "",
                plantImage: ""
            });
        }).catch(function (error) {
            const errors = error.response.data.errors;
            let messages = '<ul class="mx-12">';
            Object.entries(errors).forEach(([key, value]) => {
                messages = messages + `<li class="text-red-500 text-xs italic list-disc">${key}: ${value[0]}</li>`
            });
            messages = messages + '</ul>';
            setErrorContent(messages);
            setSucceed(false);
            setError(true);
        });
    };

    return (
        <>
        <Head>
            <title>Add plant</title>
        </Head>
        <div className="container mx-auto font-mono">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div
                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                        > </div>
                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-green-600 text-center">Add A Plant</h3>
                            <div className={!succeed ? 'invisible':'visible'}><p className="text-green-500 text-sm italic px-8">Plant added successfully</p></div>
                            <div className={!error ? 'invisible':'visible'} dangerouslySetInnerHTML={{ __html: errorContent }}></div>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" method="POST" encType="multipart/form-data" acceptCharset="UTF-8" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="plantName">
                                            Plant Name
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="plantName"
                                            name="plantName"
                                            type="text"
                                            placeholder="Plant Name"
                                            required
                                            value={plant.plantName}
                                            onChange={handleChange()}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="species">
                                        Species
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="species"
                                        name="species"
                                        type="text"
                                        placeholder="Species"
                                        required
                                        value={plant.species}
                                        onChange={handleChange()}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="wateringInstruction">
                                        Watering instructions
                                    </label>
                                    <textarea
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="wateringInstruction"
                                        name="wateringInstruction"
                                        type="textarea"
                                        placeholder="Watering instruction"
                                        required
                                        value={plant.wateringInstruction}
                                        onChange={handleChange()}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="image">
                                        Image Upload
                                    </label>
                                    <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="plantImage"
                                        name="plantImage"
                                        type="file" 
                                        required
                                        onChange={handleFileChange()}
                                    />
                                </div>
                                
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>

                            <hr className="mb-6 border-t" />
                                <div className="text-right">
                                    <Link href="/">
                                        <a className="inline-block text-sm text-green-500 align-baseline hover:text-green-800">
                                            Back to Home
                                        </a>
                                    </Link>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}