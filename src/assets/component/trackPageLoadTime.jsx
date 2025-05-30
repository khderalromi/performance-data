import React from "react";
import { useEffect } from "react";
// performanceTracker.js
export const trackPageLoadTime = () => {
    window.addEventListener('load', () => {
       
            const navigationEntries = performance.getEntriesByType('navigation');
            if (navigationEntries.length > 0) {
            const time = navigationEntries[0];
            
            console.log(time.loadEventEnd); // هذا سيظهر وقت انتهاء حدث التحميل
            }
            const loadTime = time.loadEventEnd - time.navigationStart;
            return console.log(`Page Load Time: ${loadTime}ms`);
   ;
        
    });
};


