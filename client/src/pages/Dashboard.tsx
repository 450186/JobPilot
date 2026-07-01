import { useEffect, useState } from "react"
import { getApplications } from "../api/applications"
import type { Application } from "../types/Application"
import '../styles/dashboard.css'
import StatusBadge from "../components/statusBadge";

function Dashboard() {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const applications = await getApplications();
                setApplications(applications);
            } catch (error) {
                console.log("Error fetching applications: ", error);
            }

        }
        fetchApplications();
    }, [])

    const total = applications.length
    const applied = applications.filter(application => application.status === "Applied").length
    const interviewing = applications.filter(application => application.status === "Interview").length
    const offer = applications.filter(application => application.status === "Offer").length
    const rejected = applications.filter(application => application.status === "Rejected").length
    const saved = applications.filter(application => application.status === "Saved").length

    return (
        <main>
            <h1>Dashboard</h1>
            <p>Welcome to JobPilot</p>
            <div className="stat-grid">
                <div className="grid-item">
                    <h2>Total Applications</h2>
                    <p>{total}</p>
                </div>
                <div className="grid-item">
                    <StatusBadge status="Applied" />
                    <p>{applied}</p>
                </div>
                <div className="grid-item">
                    <StatusBadge status="Interview" />
                    <p>{interviewing}</p>
                </div>
                <div className="grid-item">
                    <StatusBadge status="Offer" />
                    <p>{offer}</p>
                </div>
                <div className="grid-item">
                    <StatusBadge status="Rejected" />
                    <p>{rejected}</p>
                </div>
                <div className="grid-item">
                    <StatusBadge status="Saved" />
                    <p>{saved}</p>
                </div>
            </div>
        </main>
    )
}

export default Dashboard