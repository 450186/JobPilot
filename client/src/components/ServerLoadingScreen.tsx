import '../styles/loadingScreen.css'

export default function ServerLoadingScreen() {
    return (
        <main className="server-loading-screen">
            <div className="server-loading-content">
                <div
                    className="server-loading-spinner"
                    aria-hidden="true"
                />

                <h1>Starting JobPilot</h1>

                <p>
                    The server is waking up. This can take up to a minute
                    after a period of inactivity.
                </p>

                <span>Please keep this page open.</span>
            </div>
        </main>
    );
}