function Movie(props){
    return (
        <>
            <h1>{props.title}</h1>
            <p>Collection : {props.collection}</p>
        </>
    )
}

export default Movie;