export default function StatCard({
                                     title,
                                     value,
                                 }) {
    return (
        <div
            style={{
                background: "#1e1e1e",
                padding: 20,
                borderRadius: 12,
                color: "white",
                minWidth: 200,
            }}
        >
            <h3
                style={{
                    marginBottom: 10,
                    fontSize: 14,
                    opacity: 0.7,
                }}
            >
                {title}
            </h3>

            <div
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                }}
            >
                {value}
            </div>
        </div>
    );
}