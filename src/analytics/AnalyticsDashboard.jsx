import StatCard from "./components/StatCard";

import PageDurationBoxPlot from "./charts/PageDurationBoxPlot";
import TechnologyConversionChart from "./charts/TechnologyConversionChart";
import QuizCompletionChart from "./charts/QuizCompletionChart";
import {generateAnalytics} from "./analyser.js";
import {useEffect, useState} from "react";

export default function AnalyticsDashboard() {

    const [analytics, setAnalytics] =
        useState(null);

    useEffect(() => {
        async function load() {
            const data =
                await generateAnalytics();

            console.log("data")
            setAnalytics(data);
            console.log(data)
        }

        load();
    }, []);

    return (
        analytics != null &&
        <div
            style={{
                background: "#0f0f0f",
                minHeight: "100vh",
                padding: 30,
                color: "white",
            }}
        >
            <h1
                style={{
                    marginBottom: 30,
                }}
            >
                Usability Analytics Dashboard
            </h1>

            {/* KPI CARDS */}

            <div
                style={{
                    display: "flex",
                    gap: 20,
                    flexWrap: "wrap",
                    marginBottom: 40,
                }}
            >
                <StatCard
                    title="Total Logs"
                    value={
                        analytics.overview.totalLogs
                    }
                />

                <StatCard
                    title="Sessions"
                    value={
                        analytics.overview
                            .totalSessions
                    }
                />

                <StatCard
                    title="Bounce Rate"
                    value={`${analytics.bounce.bounceRate}%`}
                />
            </div>

            {/* BOX PLOT */}

            <div
                style={{
                    marginBottom: 50,
                }}
            >
                <PageDurationBoxPlot
                    data={
                        analytics.pageAnalytics
                    }
                />
            </div>

            {/* CONVERSION */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "1fr 1fr",
                    gap: 30,
                }}
            >
                <TechnologyConversionChart
                    data={
                        analytics.technologyQuizConversion
                    }
                />

                <QuizCompletionChart
                    data={
                        analytics.quizCompletion
                    }
                />
            </div>
        </div>
    );
}