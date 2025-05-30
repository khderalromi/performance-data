import { configureStore } from "@reduxjs/toolkit";
import apiResponseTimeSlice from "./apiResponseTime-slice";
import eventLogSlice from "./eventLog-slice";
import performanceAnalysisSlice from "./performanceAnalysis-slice";

const store=configureStore({
    reducer:{
        apiResponseTime: apiResponseTimeSlice.reducer,
        eventLog:eventLogSlice.reducer,
        performanceAnalysis:performanceAnalysisSlice.reducer
        
    }
});


export default store;