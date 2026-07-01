import { useEffect, useState } from "react";
import { getApplications } from "../api/applications";
import type { Application } from "../types/Application";
import ApplicationTable from "../components/ApplicationTable";

function Applications() {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try{
                const applications = await getApplications();
                setApplications(applications);
            } catch (error) {
                console.log("Error fetching applications: ", error);
            }
        }

        fetchApplications()
    }, [])

    return (
        <main>
            <h1>Applications</h1>

            {applications.length > 0 ? (
                <ApplicationTable applications={applications} />
            ): ( applications.length === 0 && (
                <p>No applications found</p>
            ))}
        </main>
    )
}

export default Applications