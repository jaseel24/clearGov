import React, { useState } from "react";
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
const ProjectProgressChart = ({ ProjectProgress }) => {
    const [chartType, setChartType] = useState("pie");
    console.log(ProjectProgress);
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
        <div className="min-h-screen mb-32 bg-white p-10">
            <div>
                <select
                    onChange={(e) => setChartType(e.target.value)}
                    className=" shadow cursor-pointer bg border rounded outline-none px-3 py-1"
                    name="chartType"
                    id="chartType"
                    value={chartType}
                >
                    <option value="pie">Pie</option>
                    <option value="bar">Bar</option>
                    <option value="area">Area</option>
                </select>
            </div>
            <div className="h-[300px]">
                {chartType === "pie" && (
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                className="outline-none"
                                dataKey="progress"
                                data={ProjectProgress}
                                fill="#8884d8"
                                label
                            >
                                {ProjectProgress.map((t, i) => (
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
                            data={ProjectProgress}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="projectScope" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="progress" stroke="#8884d8" fill="green" />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
                {chartType === "bar" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={ProjectProgress}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            barSize={20}
                        >
                            <XAxis dataKey="projectScope" scale="point" padding={{ left: 10, right: 10 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="progress" fill="orange" background={{ fill: "#eee" }} />
                        </BarChart>
                    </ResponsiveContainer>
                )}

                {chartType === "pie" && (
                    <div className="mb-2 pb-2    flex flex-col justify-center w-full text-[100%] ">
                        <div>
                            {ProjectProgress.map((c, index) => (
                                <div key={index} className="flex h-fit  items-center">
                                    <span
                                        style={{ backgroundColor: COLORS[index] }}
                                        className={`inline-block  w-3 h-3 rounded-sm   mr-2`}
                                    ></span>
                                    <span className="text-lg">{c.projectScope}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectProgressChart;
