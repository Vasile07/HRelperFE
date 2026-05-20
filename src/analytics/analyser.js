import {createClient} from '@supabase/supabase-js';
import {data} from "react-router-dom";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

const EXPECTED_TIMES = {
    "/LoginPage": 8000,
    "/RegisterPage": 25000,
    "/DiscoverJobs": 10000,
    "/JobViewer": 20000,
    "/Profile": 15000,
    "/ManageJobPost": 60000,
    "/Quiz": 120000,
};

function normalizePath(path) {
    if (path.startsWith("/JobViewer/")) {
        return "/JobViewer";
    }

    if (path.startsWith("/ManageJobPost/")) {
        return "/ManageJobPost";
    }

    return path;
}

function calculateStats(values) {
    if (!values.length) return null;

    const sorted = [...values].sort(
        (a, b) => a - b
    );

    const avg =
        values.reduce((a, b) => a + b, 0) /
        values.length;

    const percentile = (p) => {
        const idx = Math.floor(
            p * sorted.length
        );

        return sorted[idx];
    };

    return {
        min: sorted[0],
        q1: percentile(0.25),
        median: percentile(0.5),
        q3: percentile(0.75),
        max: sorted[sorted.length - 1],
        average: avg,
    };
}

async function downloadLogs() {

    const {data: files, error} =
        await supabase.storage
            .from("analytics-logs")
            .list("logs");

    console.log("FILES:");
    console.log(files);

    if (error) {
        console.error(error);
        throw error;
    }

    const logs = [];

    for (const file of files) {

        const fullPath =
            `logs/${file.name}`;

        console.log(
            "Downloading:",
            fullPath
        );

        const {data, error} =
            await supabase.storage
                .from("analytics-logs")
                .download(fullPath);

        if (error) {
            console.error(
                "DOWNLOAD ERROR:"
            );

            console.error(error);

            continue;
        }

        const text =
            await data.text();

        console.log(text);

        const lines = text
            .split("\n")
            .filter(Boolean);

        for (const line of lines) {

            try {

                logs.push(
                    JSON.parse(line)
                );

            } catch (err) {

                console.error(
                    "PARSE ERROR:"
                );

                console.error(err);

            }
        }
    }

    console.log(
        "TOTAL LOGS:",
        logs.length
    );

    return logs;
}

function analyzePageDurations(logs) {
    const durations = {};

    for (const log of logs) {
        if (
            log.type === "page_exit"
        ) {
            const page = normalizePath(
                log.payload.path
            );

            if (!durations[page]) {
                durations[page] = [];
            }

            durations[page].push(
                log.payload.durationMs
            );
        }
    }

    return Object.entries(
        durations
    ).map(([page, values]) => ({
        page,
        expectedMs:
            EXPECTED_TIMES[page],
        ...calculateStats(values),
    }));
}

function analyzeTechnologyConversion(
    logs
) {
    const modalViews = {};
    const quizStarts = {};

    for (const log of logs) {
        if (
            log.type ===
            "technology_modal_enter"
        ) {
            const tech =
                log.payload.technology;

            modalViews[tech] =
                (modalViews[tech] || 0) + 1;
        }

        if (
            log.type === "quiz_start"
        ) {
            const tech =
                log.payload.technology;

            quizStarts[tech] =
                (quizStarts[tech] || 0) + 1;
        }
    }

    return Object.keys(
        modalViews
    ).map((tech) => ({
        technology: tech,
        conversionRate:
            (
                ((quizStarts[tech] || 0) /
                    modalViews[tech]) *
                100
            ).toFixed(2),
    }));
}

function analyzeBounceRate(logs) {

    const sessions = {};

    for (const log of logs) {

        const sessionId =
            log.payload?.sessionId;

        if (!sessionId) continue;

        if (!sessions[sessionId]) {
            sessions[sessionId] = [];
        }

        sessions[sessionId].push(log);
    }

    let bounced = 0;

    const total =
        Object.keys(sessions).length;

    for (const sessionId in sessions) {

        const pageViews =
            sessions[sessionId].filter(
                (l) =>
                    l.type === "page_enter"
            );

        if (pageViews.length <= 1) {
            bounced++;
        }
    }

    return {
        totalSessions: total,

        bouncedSessions: bounced,

        bounceRate:
            total === 0
                ? 0
                : Number(
                    (
                        (bounced / total) *
                        100
                    ).toFixed(2)
                ),
    };
}

function analyzeQuizCompletion(logs) {

    const starts = {};
    const completions = {};

    for (const log of logs) {

        if (log.type === "quiz_start") {

            const tech =
                log.payload?.technology;

            if (!tech) continue;

            starts[tech] =
                (starts[tech] || 0) + 1;
        }

        if (
            log.type ===
            "quiz_complete"
        ) {

            const tech =
                log.payload?.technology;

            if (!tech) continue;

            completions[tech] =
                (completions[tech] || 0) + 1;
        }
    }

    return Object.keys(starts).map(
        (tech) => ({

            technology: tech,

            completionRate:
                Number(
                    (
                        (
                            (completions[tech] || 0) /
                            starts[tech]
                        ) * 100
                    ).toFixed(2)
                ),
        })
    );
}

export async function generateAnalytics() {
    const logs = await downloadLogs();

    return {
        overview: {
            totalLogs: logs.length,
            totalSessions: new Set(
                logs
                    .filter(
                        (l) => l.payload?.sessionId
                    )
                    .map(
                        (l) => l.payload.sessionId
                    )
            ).size,
        },

        pageAnalytics:
            analyzePageDurations(logs),

        technologyQuizConversion:
            analyzeTechnologyConversion(
                logs
            ),

        bounce:
            analyzeBounceRate(logs),

        quizCompletion:
            analyzeQuizCompletion(logs),
    };
}