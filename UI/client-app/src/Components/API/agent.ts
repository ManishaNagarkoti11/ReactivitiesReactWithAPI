import axios, { AxiosResponse } from "axios";
import { resolve } from "path";
import { Activity } from "../Models/activity";

const sleep = (delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
}


axios.defaults.baseURL='https://localhost:44320/api';

const responseBody =<T> (response:AxiosResponse<T>)=>response.data;

axios.interceptors.response.use(async reponse => {
    try {
        await sleep(1000);
        return reponse;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const requests ={
    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:<T>(url:string, body:{})=>axios.post<T>(url, body).then(responseBody),
    put:<T>(url:string, body:{})=>axios.put<T>(url, body).then(responseBody),
    delete:<T>(url:string)=>axios.delete<T>(url).then(responseBody),
}

//object storing request 
const Activities ={
    list: () =>requests.get<Activity[]>('/activities'),
    details: (id:string)=>requests.get<Activity>(`/activities/${id}`),
    create :(activity:Activity)=>axios.post<void>('/activities',activity),
    update : (activity:Activity)=>axios.put<void>(`/activities/${activity.id}`,activity),
    delete :(id:string)=>axios.delete<void>(`/activities/${id}`)
}

const agent ={
   Activities 
}

export default agent;