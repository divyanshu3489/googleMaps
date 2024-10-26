import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../config/configuration";
import { distanceCalulation, routeCalulation } from "./NWConfig";
import { RequestType, DirectionsResponse, DistanceMatrixResponse } from "../../types";

export const getRoute = createAsyncThunk <DirectionsResponse, RequestType>(
    "get/getRoute",

    async(request: RequestType)=>{
        try {
            const origin = encodeURIComponent(request.origin); 
            const destination = encodeURIComponent(request.destination);
    
            let url = `${routeCalulation}origin=${origin}&destination=${destination}&key=${API_KEY}`;
            const response = (await axios.get(url)).data
            if(response){
                return Promise.resolve(response)
            }
            return Promise.reject(response)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Error fetching distance matrix:', error.response?.data || error.message);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    }
)

export const getDistance = createAsyncThunk <DistanceMatrixResponse, RequestType>(
    "get/getDistance",
    
    async(request: RequestType)=>{
        try {
            const origin = encodeURIComponent(request.origin);
            const destination = encodeURIComponent(request.destination);
            const travelMode = encodeURIComponent(request.travelMode || 'driving');
            
            let url = `${distanceCalulation}origins=${origin}&destinations=${destination}&mode=${travelMode}&key=${API_KEY}`;
    
            const response = (await axios.get(url)).data
            if(response){
                return Promise.resolve(response)
            }
            return Promise.reject(response)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Error fetching distance matrix:', error.response?.data || error.message);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    }
)