export default function errorMessages(props) {
    return (
    <>
    return (
        <div className='errorMessages'>
            {
                Object.entries(statistics).map(([key, val]) => 
                    <h2 key={key}>{key}: {val}</h2>
                )
            }
        </div>
    );
</>);
}