import ReactECharts from "echarts-for-react";

export default function QuizCompletionChart({
                                                data = [],
                                            }) {

    const technologies = data.map(
        (d) => d.technology
    );

    const completionRates = data.map(
        (d) => d.completionRate
    );

    const option = {
        backgroundColor: "#121212",

        title: {
            text: "Quiz Completion Rate",
            textStyle: {
                color: "#fff",
            },
        },

        tooltip: {},

        xAxis: {
            type: "category",

            data: technologies,

            axisLabel: {
                color: "#ccc",
            },
        },

        yAxis: {
            type: "value",

            max: 100,

            axisLabel: {
                formatter: "{value}%",

                color: "#ccc",
            },
        },

        series: [
            {
                type: "bar",

                data: completionRates,
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{
                height: 450,
            }}
        />
    );
}