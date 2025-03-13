import React from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    BarChart,
    Bar,
    RadialBar,
    RadialBarChart,
} from "recharts";

const Chart = ({ chartType, tenders }) => {
    console.log(chartType, tenders);

    const COLORS = [
        "red",
        "blue",
        "green",
        "purple",
        "orange",
        "pink",
        "brown",
        "black",
        "cyan",
        "magenta",
        "lime",
        "teal",
        "indigo",
        "violet",
        "gray",
        "silver",
        "maroon",
        "navy",
        "olive",
        "turquoise",
        "gold",
        "beige",
    ];

    const style = {
        top: "50%",
        right: 0,
        transform: "translate(0, -50%)",
        lineHeight: "24px",
    };

    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 ">
            <div style={{ width: "100%", height: 300 }}>
                {chartType === "pie" && (
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                className=" outline-none"
                                dataKey="tenders"
                                data={tenders}
                                fill="#8884d8"
                                label={({ value }) => value.toLocaleString("en-IN")}
                            >
                                {tenders.map((t, i) => (
                                    <Cell key={i} style={{ color: "dark" }} fill={COLORS[i]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                )}
                {chartType === "area" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            width={500}
                            height={400}
                            data={tenders}
                            label={({ value }) => value.toLocaleString("en-IN")}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis tickFormatter={(value) => value.toLocaleString("en-IN")} />
                            <Tooltip formatter={(value) => value.toLocaleString("en-IN")} />
                            <Area type="monotone" dataKey="tenders" stroke="#8884d8" fill="orange" />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
                {chartType === "bar" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={tenders}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            barSize={20}
                        >
                            <XAxis dataKey="_id" scale="point" padding={{ left: 10, right: 10 }} />
                            <YAxis tickFormatter={(value) => value.toLocaleString("en-IN")} />
                            <Tooltip formatter={(value) => value.toLocaleString("en-IN")} />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="tenders" fill="orange" background={{ fill: "#eee" }} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
            {chartType === "pie" && (
                <div className="mb-2 pb-2 h-full flex flex-col justify-center w-full text-[100%] ">
                    <div>
                        {tenders.map((c, index) => (
                            <div key={index} className="flex h-fit  items-center">
                                <span
                                    style={{ backgroundColor: COLORS[index] }}
                                    className={`inline-block  w-3 h-3 rounded-sm   mr-2`}
                                ></span>
                                <span className="text-lg">{c._id}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chart;
