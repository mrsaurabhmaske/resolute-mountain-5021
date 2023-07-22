import loaderStyle from "./Loader.module.css"

function Loader() { 
    return (
        <div className={loaderStyle.loader}>
            <div></div> 
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loader