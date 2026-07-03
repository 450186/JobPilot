import { useEffect, useState } from "react"
import { getApplications } from "../api/applications"
import type { Application } from "../types/Application"
import '../styles/dashboard.css'
import StatusBadge from "../components/statusBadge";
import formatDate from "../utils/formatDate";
import getDeadlineText from "../utils/deadlineText";
import getDeadlineClass from "../utils/deadlineClass";
import formatRelativeDate from "../utils/formatRelativeDates";
import ApplicationTimeline from "../components/ApplicationTimeline";
import {Clock3, Calendar1, Building2} from 'lucide-react'

function Dashboard() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [activityView, setActivityView] = useState< "week" | "month" | "year" >("year")

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

    const user = JSON.parse(localStorage.getItem("user") || "{}")

    const total = applications.length
    const applied = applications.filter(application => application.status === "Applied").length
    const interviewing = applications.filter(application => application.status === "Interview").length
    const offer = applications.filter(application => application.status === "Offer").length
    const rejected = applications.filter(application => application.status === "Rejected").length
    const saved = applications.filter(application => application.status === "Saved").length

const upcomingDeadlines = applications
    .filter(application =>
        application.deadline &&
        (application.status === "Saved" ||
         application.status === "Applied")
    )
    .sort(
        (a, b) =>
            new Date(a.deadline!).getTime() -
            new Date(b.deadline!).getTime()
    )
    .slice(0, 3);

    const recentApplications = applications
    .filter(application => application.created_at)
    .sort(
        (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
    )
    .slice(0, 3);

    const GetApplicationsInRange = () => {
        const now = new Date();
        return applications.filter(application => {
            const createdAt = new Date(application.created_at);

            if(activityView === "week") {
                const weekAgo = new Date();
                weekAgo.setDate(now.getDate() - 7);
                return createdAt >= weekAgo;
            }
            if(activityView === "month") {
                return (
                    createdAt.getMonth() === now.getMonth() &&
                    createdAt.getFullYear() === now.getFullYear()
                )
            }
            return createdAt.getFullYear() === now.getFullYear();
        })
    }
    const activityApplications = GetApplicationsInRange()

    return (
        <main>
            <h1>Dashboard</h1>
            <h2 style={{textAlign: "center"}}>Welcome back, {user.first_name}!</h2>
            <div className="stat-grid">
                <div className="left-side">
                    <h2 className="grid-header">Applications</h2>
                    <div className="grid-item">
                        <p className="stat-num">{total}</p>
                        <h2>Total Applications</h2>
                    </div>
                    <div className="grid-item">
                        <p className="stat-num">{applied}</p>
                        <StatusBadge status="Applied" />
                    </div>
                    <div className="grid-item">
                        <p className="stat-num">{interviewing}</p>
                        <StatusBadge status="Interview" />
                    </div>
                    <div className="grid-item">
                        <p className="stat-num">{offer}</p>
                        <StatusBadge status="Offer" />
                    </div>
                    <div className="grid-item">
                        <p className="stat-num">{rejected}</p>
                        <StatusBadge status="Rejected" />
                    </div>
                    <div className="grid-item">
                        <p className="stat-num">{saved}</p>
                        <StatusBadge status="Saved" />
                    </div>
                </div>
                <div className="right-side">
                    <div className="app-activity-sec">
                        <h2 className="grid-header">Application Timeline</h2>
                        <ApplicationTimeline applications={activityApplications}/>
                    </div>
                </div>
            </div>
            <section className="dashboard-section">
                <h2>Upcoming Deadlines</h2>
                {upcomingDeadlines.length === 0 ? (
                    <p>No Upcoming Deadlines</p>
                ) : (
                    upcomingDeadlines.map((application) => (
                        <div className="dashboard-card" key={application.id}>
                            <h3>{application.role} at {application.company}</h3>
                            <div className="dashboard-byline">
                                <div className="dashboard-group">
                                    <p>Deadline: {formatDate(application.deadline!)}</p>
                                    <Calendar1 size={16} className="deadline-icon" /><span className={getDeadlineClass(application.deadline!)}>({getDeadlineText(application.deadline!)})</span>
                                </div>                                
                                <StatusBadge status={application.status} />
                            </div>
                        </div>
                    ))
                )}
            </section>
            <section className="dashboard-section">
                <h2>Recently Added</h2>
                {recentApplications.length === 0 ? (
                    <p>No Recent Applications</p>
                ) : (
                    recentApplications.map((application) => (
                        <div className="dashboard-card" key={application.id}>
                            <h3>{application.role}</h3>
                            <div className="dashboard-byline">
                                <div className="recent-metadata">
                                    <Building2 size={16} />
                                    <p>{application.company}</p>
                                    <Clock3 size={16} />
                                    <p>{formatRelativeDate(application.created_at)}</p>
                                </div>                                
                                <StatusBadge status={application.status} />
                            </div>
                        </div>
                    ))
                )}
            </section>
        </main>
    )
}

export default Dashboard