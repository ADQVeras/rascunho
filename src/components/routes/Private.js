import { useContext } from "react";
import { AuthContext } from "../contexts";


export default function Private({children}){
    const {signed} = useContext(AuthContext)

    console.log(signed);
    return children
}