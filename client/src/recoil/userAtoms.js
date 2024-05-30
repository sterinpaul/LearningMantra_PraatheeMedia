import { atom } from "recoil";

const getToken = ()=>{
    const token = localStorage.getItem('user-token')
    if(token) return token
    else
    return ""
}

export const userTokenAtom = atom({
    key:"userTokenAtom",
    default:getToken()
})

