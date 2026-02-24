import { useAppStore } from "../../../app/store";

function ProjectsOverview() {
  const projects = useAppStore((state) => state.projects);
  
  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f9fafb",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* <h2
        style={{
          marginBottom: "16px",
          fontSize: "18px",
          fontWeight: 600,
          color: "#111827",
        }}
      >
        Projects
      </h2> */}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f3f4f6",
              textAlign: "left",
            }}
          >
            <th style={thStyle}>Project Name</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Visibility</th>
            <th style={thStyle}>Members</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              style={{
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <td style={tdStyle}>{project.name}</td>
              <td style={tdStyle}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 500,
                    backgroundColor:
                      project.status === "ACTIVE" ? "#dcfce7" : "#fee2e2",
                    color: project.status === "ACTIVE" ? "#166534" : "#991b1b",
                  }}
                >
                  {project.status}
                </span>
              </td>
              <td style={tdStyle}>{project.visibility}</td>
              <td style={tdStyle}>{project.members?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsOverview;

const thStyle: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: "13px",
  fontWeight: 600,
  color: "#374151",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const tdStyle: React.CSSProperties = {
  padding: "14px 16px",
  fontSize: "14px",
  color: "#1f2937",
};
