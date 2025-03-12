import { BarLoader } from "react-spinners";
const Loading = ()=>{

    return(
    <div className="content" >
        <div className="loading">
            <h3>CARGANDO</h3>
            <BarLoader color="#F16124"/>
        </div>
    </div>
    )
}

export default Loading