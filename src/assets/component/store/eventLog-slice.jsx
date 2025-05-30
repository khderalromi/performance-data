import { createSlice } from "@reduxjs/toolkit";



const initialState={
    eventLog:[],
    
    
};

const eventLogSlice=createSlice({
    name:'eventLog',
    initialState,
    reducers:{
        //add time
        addEventLog(state,actions){
            console.log(actions.payload)
                state.eventLog.push(actions.payload)
        },

        //delete old time from state
        deleteOldTime(state,actions){
            state.eventLog=[]
        }
    }

    })


export default eventLogSlice;
export const eventLogActions= eventLogSlice.actions;