interface StatsCardProps {
  title: string;
  value: number;
}

function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div
      style={{
        flex: 1,
        background: "#f4f4f4",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default StatsCard;
