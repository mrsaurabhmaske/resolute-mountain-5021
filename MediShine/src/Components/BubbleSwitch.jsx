import style from "./BubbleSwitch.module.css"
import { useContext } from "react";
import { AuthContext} from "../AuthContext/AuthContextProvider";


function BubbleSwitch() {
    
    const { isDoctor,setIsDoctor } = useContext(AuthContext);

    return (<div className={style.checkboxwrapper}>
        <input type="checkbox" onChange={() => { setIsDoctor(!isDoctor) }} checked={ isDoctor} />
</div>)
}

export default BubbleSwitch;