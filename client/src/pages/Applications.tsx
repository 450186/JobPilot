import { useEffect, useState } from "react";
import { getApplications, deleteApplication } from "../api/applications";
import type { Application } from "../types/Application";
import ApplicationTable from "../components/ApplicationTable";
import ApplicationForm from "../components/ApplicationForm";
import EmptyState from "../components/EmptyState";
import toast from "react-hot-toast";
import { CircleX, Search, X } from "lucide-react";
import ApplicationFormModal from "../components/ApplicationFormModal";

function Applications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicationToEdit, setApplicationToEdit] = useState<Application | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

        const fetchApplications = async () => {
            try{
                console.log("Fetching applications...")
                const applications = await getApplications();
                console.log(applications)
                setApplications(applications);
            } catch (error) {
                console.log("Error fetching applications: ", error);
            }
        }

        const handleDelete = async(application: Application) => {
            const confirmed = window.confirm(`Are you sure you want to delete ${application.role} at ${application.company}?`);
            if(!confirmed) return
                try {
                    await deleteApplication(application.id);
                    toast.success("Application deleted successfully")
                    fetchApplications();
                } catch (error) {
                    console.log("Error deleting application: ", error);
                    toast.error("Error deleting application")
                }
        }

    useEffect(() => {
        fetchApplications()
    }, [])

    const filteredApplications = applications.filter(application => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            application.company.toLowerCase().includes(search) ||
            application.role.toLowerCase().includes(search) ||
            application.location?.toLowerCase().includes(search) ||
            application.notes?.toLowerCase().includes(search);
        
        const matchesStatus = statusFilter === "All" || application.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    })

    return (
        <main>
            <div className="header">
                <h1>Applications</h1>
                <div className="search-wrapper">
                    <label htmlFor="search" className="search-label">
                        Search
                    </label>
                    <div className="searchbar-wrapper">
                        <input type="search" className="search-input" placeholder="Search company, role, notes, or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        {searchTerm ? (
                            <X className="search-icon del-search" size={20} strokeWidth={3} onClick={() => setSearchTerm("")} />
                        ) : (
                            <Search className="search-icon" size={20} strokeWidth={3} />
                        )}
                    </div>
                </div>
                <div className="status-filter-wrapper">
                    <label htmlFor="status-filter" className="status-filter-label">
                        Status
                    </label>
                    <select 
                    className="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Saved">Saved</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <button className="add-button" onClick={() => {
                    setIsModalOpen(true)
                    setApplicationToEdit(null)
                }}>Add Application</button>
            </div>
q           <ApplicationFormModal 
                applicationToEdit={applicationToEdit} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSaved={() => {
                    fetchApplications()
                    setIsModalOpen(false)
                    setApplicationToEdit(null)
                }}
            />
            {applications.length === 0 ? (
                <EmptyState
                title="No applications found"
                message="Click the 'Add Application' button to get started."
                actionLabel="Add Application"
                onAction={() => {
                    setApplicationToEdit(null)
                    setIsModalOpen(true)
                }}
                />
                ) : filteredApplications.length === 0 ? (
                <EmptyState
                title="No applications found"
                message="Try adjusting your search or status filter."
                actionLabel="Clear Filters"
                onAction={() => {
                    setSearchTerm("")
                    setStatusFilter("All")
                }}
                />
                ) : (
                <ApplicationTable applications={filteredApplications} onEdit={(application) => {
                    setIsModalOpen(true)
                    setApplicationToEdit(application)
                }} onDelete={handleDelete} />
            )}
        </main>
    )
}

export default Applications