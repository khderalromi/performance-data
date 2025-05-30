import { createSlice } from "@reduxjs/toolkit";

const initialState={
    times:[],
    

};

const apiResponseTimeSlice=createSlice({
    name:'apiResponse',
    initialState,
    reducers:{
        //store time in state
        addResponseTime(state,actions){
                state.times.push(actions.payload)
         
        },
        
        //delete old time from state
        deleteOldTime(state,actions){
                state.times=[]
        },
    }

    })


export default apiResponseTimeSlice;
export const apiResponseTimeActions= apiResponseTimeSlice.actions;