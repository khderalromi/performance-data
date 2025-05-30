import { createSlice } from "@reduxjs/toolkit";

const initialState={
    times:[],
    

};

const performanceAnalysisSlice=createSlice({
    name:'performanceAnalysis',
    initialState,
    reducers:{
        add(state,actions){
            console.log(actions.payload)
                state.times.push(actions.payload)
                
         
        },
        
        deleteOld(state,actions){
                state.times=[]
                
        },
    }

    })


export default performanceAnalysisSlice;
export const performanceAnalysisActions= performanceAnalysisSlice.actions;