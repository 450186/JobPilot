import { useEffect, useState } from "react";
import { getApplications, deleteApplication } from "../api/applications";
import type { Application } from "../types/Application";
import ApplicationTable from "../components/ApplicationTable";
import ApplicationForm from "../components/ApplicationForm";
import { CircleX } from "lucide-react";

function Applications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicationToEdit, setApplicationToEdit] = useState<Application | null>(null);

        const fetchApplications = async () => {
            try{
                const applications = await getApplications();
                setApplications(applications);
            } catch (error) {
                console.log("Error fetching applications: ", error);
            }
        }

        const handleDelete = async(application: Application) => {
            const confirmed = window.confirm(`Are you sure you want to delete ${application.role} at ${application.company}?`);
            if(!confirmed) return
            if(confirmed) {
                try {
                    await deleteApplication(application.id);
                    fetchApplications();
                } catch (error) {
                    console.log("Error deleting application: ", error);
                }
            }
        }

    useEffect(() => {
        fetchApplications()
    }, [])

    return (
        <main>
            <div className="header">
                <h1>Applications</h1>
                <button className="add-button" onClick={() => {
                    setIsModalOpen(true)
                    setApplicationToEdit(null)
                }}>Add Application</button>
            </div>
            {isModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <button className="close-button" onClick={() => {
                            setIsModalOpen(false)
                            setApplicationToEdit(null)
                        }}><CircleX className="x-icon" size={20} color="red" strokeWidth={3} /></button>
                        <ApplicationForm onApplicationSaved={() => {
                            fetchApplications();
                            setApplicationToEdit(null)
                            setIsModalOpen(false)
                        }}
                        applicationToEdit={applicationToEdit}
                        />
                    </div>
                </div>
            )}
            {applications.length > 0 ? (
                <ApplicationTable applications={applications} onEdit={(application) => {
                    setApplicationToEdit(application)
                    setIsModalOpen(true)
                }}
                onDelete={handleDelete}/>
            ): ( applications.length === 0 && (
                <p>No applications found</p>
            ))}
        </main>
    )
}

export default Applications