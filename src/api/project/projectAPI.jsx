import axios from "axios";
import { PROJECT_URI, PROJECTITEM_URI,  } from "../URI";

export const postProject = async (data)=>{
    try{
        const response = await axios.post(`${PROJECT_URI}`,data);
        console.log(response.data);
        return response.data;
    }catch(err){
        console.log(err);
    }
};


export const postProjectItem = async (data)=>{
    try{
        const response = await axios.post(`${PROJECTITEM_URI}`,data);
        console.log(response.data);
        return response.data;
    }catch(err){
        console.log(err);
    }
};


export const postTask = async (data)=>{
    try{
        const response = await axios.post(`${TASK_URI}`,data);
        console.log(response.data);
        return response.data;
    }catch(err){
        console.log(err);
    }
};