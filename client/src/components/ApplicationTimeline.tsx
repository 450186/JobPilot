import type { Application } from "../types/Application"
import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

type Props = {
    applications: Application[]
}

function ApplicationTimeline({applications}: Props) {
    const [view, setView] = useState<"week" | "month" | "year">("year")
    const createEmptyBucket = (label: string) => {
        return {
            label,
            saved: 0,
            applied: 0,
            interview: 0,
            offer: 0,
            rejected: 0
        }
    }

    const addApplicationToBucket = (bucket: ReturnType<typeof createEmptyBucket>, status: string) => {
        switch(status) {
            case "Saved":
                bucket.saved++;
                break;
            case "Applied":
                bucket.applied++;
                break;
            case "Interview":
                bucket.interview++;
                break;
            case "Offer":
                bucket.offer++;
                break;
            case "Rejected":
                bucket.rejected++;
                break;
        }
    }

    const getChartData = () => {
        if (view === "week") {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const data = days.map(createEmptyBucket);

            const now = new Date();
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 6);

            weekAgo.setHours(0, 0, 0, 0);
            now.setHours(23, 59, 59, 999);

            applications.forEach(application => {
                const date = new Date(application.created_at);

                if (date < weekAgo || date > now) return;

                const day = date.getDay();
                addApplicationToBucket(data[day], application.status);
            });

            return data;
        }

    if (view === "month") {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const data = Array.from({ length: daysInMonth }, (_, index) =>
            createEmptyBucket(String(index + 1))
        );

        applications.forEach((application) => {
            const date = new Date(application.created_at);

            const isCurrentMonth =
            date.getMonth() === month &&
            date.getFullYear() === year;

            if (!isCurrentMonth) return;

            const dayIndex = date.getDate() - 1;

            addApplicationToBucket(data[dayIndex], application.status);
        });

        return data;
    }
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const data = months.map(createEmptyBucket);

            applications.forEach(application => {
                const date = new Date(application.created_at);
                const month = date.getMonth();
                addApplicationToBucket(data[month], application.status);
            })

            return data;
    }

    const chartData = getChartData();

    const getOrdinal = (day: number): string => {
    const suffix =
        day % 10 === 1 && day % 100 !== 11
        ? "st"
        : day % 10 === 2 && day % 100 !== 12
        ? "nd"
        : day % 10 === 3 && day % 100 !== 13
        ? "rd"
        : "th";

    return `${day}${suffix}`;
    };

    return (
        <div>
            <div className="stats-tabs">
                <button className={view === "year" ? "stat-tab active-tab" : "stat-tab"} onClick={() => setView("year")}>This year</button>
                <button className={view === "month" ? "stat-tab active-tab" : "stat-tab"} onClick={() => setView("month")}>This Month</button>
                <button className={view === "week" ? "stat-tab active-tab" : "stat-tab"} onClick={() => setView("week")}>This Week</button>
            </div>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart data={chartData} margin={{top: 20, bottom: 20, right: 20, left: 0}}>
                <XAxis
                dataKey="label"
                interval={view === "month" ? 1 : 0}
                angle={view === "year" ? -45 : 0}
                textAnchor={view === "year" ? "end" : "middle"}
                height={view === "year" ? 60 : 30}
                />
                <YAxis allowDecimals={false} />
                <Tooltip
                labelFormatter={(label) =>
                    view === "month" ? getOrdinal(Number(label)) : label
                }
                />
                <Bar dataKey="saved" stackId="status" fill="var(--saved)" />
                <Bar dataKey="applied" stackId="status" fill="var(--applied)" />
                <Bar dataKey="interview" stackId="status" fill="var(--interview)" />
                <Bar dataKey="offer" stackId="status" fill="var(--offer)" />
                <Bar dataKey="rejected" stackId="status" fill="var(--rejected)" />
                </BarChart>
            </ResponsiveContainer>  
        </div>
        
    );
}

export default ApplicationTimeline