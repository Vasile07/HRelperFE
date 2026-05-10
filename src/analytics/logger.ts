import {createClient} from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface AnalyticsLog {
    type: string;
    timestamp: string;
    payload?: Record<string, any>;
}

const logBuffer: AnalyticsLog[] = [];

let flushInProgress = false;

export const logEvent = (event: AnalyticsLog) => {
    console.debug(event)
    logBuffer.push(event);

    if (logBuffer.length >= 20) {
        flushLogs();
    }
};

export const flushLogs = async () => {
    if (flushInProgress) return;
    if (logBuffer.length === 0) return;

    flushInProgress = true;

    try {
        const logsToSend = [...logBuffer];

        const timestamp = new Date()
            .toISOString()
            .replace(/[:.]/g, '-');

        const fileName = `logs/${timestamp}-${crypto.randomUUID()}.jsonl`;

        const content =
            logsToSend.map(log => JSON.stringify(log)).join('\n') + '\n';

        const {error} = await supabase.storage
            .from('analytics-logs')
            .upload(fileName, new Blob([content]), {
                contentType: 'application/x-ndjson',
            });

        if (error) {
            console.error(error);
            return;
        }

        logBuffer.splice(0, logsToSend.length);
    } catch (err) {
        console.error(err);
    } finally {
        flushInProgress = false;
    }
};