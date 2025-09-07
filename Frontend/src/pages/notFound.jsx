import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
                backgroundColor: "#082032",
                color: "#fff",
            }}
        >
            <h1 style={{ fontSize: "8rem", margin: 0, color: "#f97316" }}>404</h1>
            <h2 style={{ margin: "1rem 0", color: "#f97316" }}>Page Not Found</h2>
            <p style={{ color: "#ffffffaa", maxWidth: "400px" }}>
                Sorry, We Couldn't Find Page
            </p>
            <Link
                to="/dashboard"
                style={{
                    marginTop: "20px",
                    padding: "10px 25px",
                    backgroundColor: "#f97316",
                    color: "#082032",
                    borderRadius: "5px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    transition: "0.3s",
                }}
                onMouseOver={e => (e.target.style.opacity = 0.8)}
                onMouseOut={e => (e.target.style.opacity = 1)}
            >
                Back To Main
            </Link>
        </div>
    );
}

export default NotFound;
