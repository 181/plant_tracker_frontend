import ReactMarkdown from 'react-markdown'

export default function Plant(props) {
    // const imageUrl = 'http://127.0.0.1:8000/images/' + props.image
    const imageUrl = `${process.env.PUBLIC_IMAGES}` + props.image
    return (
    <>
    <div className="container mx-auto font-mono">
        <div className="flex justify-center px-6 my-12">
            <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
                
                <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <h3>
                                    Plant Name:
                                </h3>
                                <span className="font-sans">{props.plant_name}</span>
                            </div>
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <h3 className="mb-2 text-sm font-bold text-gray-700">
                                    Species:
                                </h3>
                                <p className="font-sans">{props.species_name}</p>
                            </div>
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <h3 className="mb-2 text-sm font-bold text-gray-700">
                                    Watering instructions:
                                </h3>
                                <ReactMarkdown>{props.watering_instruction}</ReactMarkdown>
                            </div>
                </div>
                
        </div>
        
    </div>
</>);
}