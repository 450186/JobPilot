const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5001"
).replace(/\/+$/, "");

export async function checkApiHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/health`);

        return response.ok;
    } catch {
        return false;
    }
}