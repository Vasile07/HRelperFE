import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {logEvent} from './logger';

export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        const sessionId = crypto.randomUUID();
        const entryTime = Date.now();

        logEvent({
            type: 'page_enter',
            timestamp: new Date().toISOString(),
            payload: {
                sessionId,
                path: location.pathname,
            },
        });

        return () => {
            logEvent({
                type: 'page_exit',
                timestamp: new Date().toISOString(),
                payload: {
                    sessionId,
                    path: location.pathname,
                    durationMs: Date.now() - entryTime,
                },
            });
        };
    }, [location.pathname]);
};