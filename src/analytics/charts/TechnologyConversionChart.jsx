import ReactECharts from "echarts-for-react";

export default function TechnologyConversionChart({
                                                      data,
                                                  }) {
    const technologies = data.map(
        (d) => d.technology
    );

    const conversionRates = data.map(
        (d) => d.conversionRate
    );

    const option = {
        backgroundColor: "#121212",

        title: {
            text: "Technology → Quiz Conversion",
            textStyle: {
                color: "#fff",
            },
        },

        tooltip: {},

        xAxis: {
            type: "value",
            max: 100,
            axisLabel: {
                formatter: "{value}%",
                color: "#ccc",
            },
        },

        yAxis: {
            type: "category",
            data: technologies,
            axisLabel: {
                color: "#ccc",
            },
        },

        series: [
            {
                type: "bar",
                data: conversionRates,
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