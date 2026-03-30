import Button from "react-bootstrap/Button";
import SubmittedItems from "../components/SubmittedItems";

type ItemType = {
  id: number;
  type: "lost" | "found";
  itemName: string;
  location: string;
  description: string;
  image: string;
};

interface DashboardProps {
  onClickLost: () => void;
  onClickFound: () => void;
  items: ItemType[];
  handleDelete: (id: number) => void;
}

const Dashboard = ({
  onClickLost,
  onClickFound,
  items,
  handleDelete,
}: DashboardProps) => {
  return (
    <div style={{ padding: "40px 20px" }}>
      <h1 style={{ marginBottom: "10px", fontWeight: "900" }}>CampusFind Dashboard</h1>
      <p style={{ marginBottom: "25px", color: "#555" }}>
        After sign in / sign up, users can report items and browse listed items here.
      </p>

      <div style={{ marginBottom: "30px" }}>
        <Button
          variant="danger"
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={onClickLost}
        >
          Report Lost Item
        </Button>

        <Button
          variant="success"
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={onClickFound}
        >
          Report Found Item
        </Button>
      </div>

      <SubmittedItems itemss={items} handleDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;