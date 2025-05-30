/*import { eventLog } from "./store/eventLog-action.jsx";
import { useDispatch } from "react-redux";

export const trackClickEvent = (element,callBack,dispatch) => {
    element.addEventListener('click', (event) => {
        console.log(event)
        const start = performance.now();
        // تنفيذ العملية المطلوبة
        callBack(event)
        const end = performance.now();
        const duration=end-start
        console.log(`Click Response Time: ${end - start}ms`);
        dispatch(eventLog(event,element,duration))
        
    });
};
*/

import { useEffect } from 'react';
import { eventLog } from "./store/eventLog-action.jsx";
import { useDispatch } from "react-redux";

export const useTrackClickEvent = (element,buttonName, callBack,dataBaseUrl) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClick = (event) => {
            const start = performance.now();
            callBack(event);
            const end = performance.now();
            const duration = end - start;
            console.log(`Click Response Time: ${duration}ms`);
            dispatch(eventLog( element,buttonName, duration,dataBaseUrl));
        };

        if (element) {
            element.addEventListener('click', handleClick);
        }

        // Cleanup function to remove the event listener
        return () => {
            if (element) {
                element.removeEventListener('click', handleClick);
            }
        };
    }, [element, callBack, dispatch]); // Add dependencies
};
