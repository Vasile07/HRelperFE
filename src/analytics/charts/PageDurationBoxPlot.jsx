import ReactECharts from "echarts-for-react";

export default function PageDurationBoxPlot({
                                                data,
                                            }) {
    const pages = data.map(
        (d) => d.page
    );

    const boxData = data.map((d) => [
        d.min / 1000,
        d.q1 / 1000,
        d.median / 1000,
        d.q3 / 1000,
        d.max / 1000,
    ]);

    const expected = data.map(
        (d) => d.expectedMs / 1000
    );

    const option = {
        backgroundColor: "#121212",

        title: {
            text: "Time Per Page",
            textStyle: {
                color: "#fff",
            },
        },

        tooltip: {
            trigger: "item",
        },

        xAxis: {
            type: "category",
            data: pages,
            axisLabel: {
                color: "#ccc",
            },
        },

        yAxis: {
            type: "value",
            name: "Seconds",
            axisLabel: {
                color: "#ccc",
            },
        },

        series: [
            {
                name: "Durations",
                type: "boxplot",
                data: boxData,
            },

            {
                name: "Expected",
                type: "line",
                data: expected,
                smooth: true,
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{
                height: 500,
            }}
        />
    );
}