import {usePageTracking} from './analytics/usePageTracking';
import React from "react";

const RouteLogger: React.FC<{ children: React.ReactNode }> = ({children}) => {
    usePageTracking();

    return children;
};

export default RouteLogger;