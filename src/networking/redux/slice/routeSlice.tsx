import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {decode} from "@mapbox/polyline";
import { getRoute, getDistance } from '../../API/googleAPI';
import { LatLng } from 'react-native-maps';
import { TextValue } from '../../../types';

interface Route {
    routeInfo: object,
    loading: boolean,
    error: string,
    distanceInfo: object,
    polylineCordinates: LatLng[],
    duration: TextValue | '',
    distance: TextValue | ''
}

const initialState: Route = {
    routeInfo: [],
    loading:false,
    error:'',
    distanceInfo: [],
    polylineCordinates:[],
    duration: '',
    distance: ''
};

export const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(getRoute.pending, (state) => {
            console.log("Pending....");
            state.loading = true;
          })
          .addCase(getRoute.fulfilled, (state, action) => {
            console.log("Fulfilled....");
            const config = action.payload;
            state.loading = false;
            state.routeInfo = action.payload;
            let points = decode(config.routes[0].overview_polyline.points);
            
            state.polylineCordinates = points.map((point:any, index:number) => {
              return {
                latitude: point[0],
                longitude: point[1]
              };
            });

            /* state.polylineCordinates = points.map((point:any, index:number) => {
              return {
                latitude: point[0],
                longitude: point[1]
              };
            }); */
          })
          .addCase(getRoute.rejected, (state, action: PayloadAction<any>) => {
            console.log("Rejected....");
            state.loading = false;
            state.error = action.payload?.message || "Something went wrong";
          });

          builder
          .addCase(getDistance.pending, (state) => {
            console.log("Pending....");
            state.loading = true;
          })
          .addCase(getDistance.fulfilled, (state, action) => {
            console.log("Fulfilled....");
            const config = action.payload;
            state.loading = false;
            state.distanceInfo = config;
            state.distance = config.rows[0].elements[0].distance;
            state.duration = config.rows[0].elements[0].duration;
          })
          .addCase(getDistance.rejected, (state, action: PayloadAction<any>) => {
            console.log("Rejected....");
            state.loading = false;
            state.error = action.payload?.message || "Something went wrong";
          });
      },
});

// export const {addTowishList,removeFromwishList,incrementQuantity,decrementQuantity} = routeSlice.actions;

export default routeSlice.reducer;