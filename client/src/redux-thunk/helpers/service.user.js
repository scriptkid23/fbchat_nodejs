import Axios from "axios";
export const services = {submit};
function submit({email,password,pin}){

    const requestOptions = {
        method: "POST",
        url   : "/api/botchat",
        headers: { 'Content-Type': 'application/json'},
        data: JSON.stringify({ email, password,pin})
    };
    return Axios(requestOptions)
    .then((res)=>{
        
        return res
    })
    .catch((err)=>{
        
        return err
    })

}