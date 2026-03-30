import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ApprovedItems from "../components/ApprovedItems";
import Navbar from "../components/Navbar";

interface StudentDashboardProps {
  username: string;
  onLogout: () => void;
}

type RequestType = "lost" | "found";
type RequestStatus = "pending" | "approved" | "rejected" | "done";
type ClaimStatus = "requested" | "approved" | "rejected" | "collected";

type StudentRequest = {
  id: number;
  requestType: RequestType;
  itemName: string;
  location: string;
  description: string;
  image: string;
  status: RequestStatus;
  submittedBy: string;
};

type RecoveryClaim = {
  id: number;
  itemId: number;
  itemName: string;
  claimantUsername: string;
  proofText: string;
  status: ClaimStatus;
};

const StudentDashboard = ({
  username,
  onLogout,
}: StudentDashboardProps) => {
  const [requestType, setRequestType] = useState<RequestType>("lost");
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [myRequests, setMyRequests] = useState<StudentRequest[]>([]);
  const [myClaims, setMyClaims] = useState<RecoveryClaim[]>([]);

  useEffect(() => {
    refreshMyRequests();
    refreshMyClaims();

    const handleDataUpdate = () => {
      refreshMyRequests();
      refreshMyClaims();
    };

    window.addEventListener("storage", handleDataUpdate);
    window.addEventListener("campusfind_data_updated", handleDataUpdate);

    return () => {
      window.removeEventListener("storage", handleDataUpdate);
      window.removeEventListener("campusfind_data_updated", handleDataUpdate);
    };
  }, [username]);

  const refreshMyRequests = () => {
    const savedRequests: StudentRequest[] = JSON.parse(
      localStorage.getItem("campusfind_requests") || "[]",
    );

    const filteredRequests = savedRequests.filter(
      (request) => request.submittedBy === username,
    );

    setMyRequests(filteredRequests);
  };

  const refreshMyClaims = () => {
    const savedClaims: RecoveryClaim[] = JSON.parse(
      localStorage.getItem("campusfind_claims") || "[]",
    );

    const filteredClaims = savedClaims.filter(
      (claim) => claim.claimantUsername === username,
    );

    setMyClaims(filteredClaims);
  };

  const resetForm = () => {
    setItemName("");
    setLocation("");
    setDescription("");
    setImage("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmitRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!itemName || !location || !description) {
      setMessage("Please fill all required fields.");
      return;
    }

    const savedRequests: StudentRequest[] = JSON.parse(
      localStorage.getItem("campusfind_requests") || "[]",
    );

    const newRequest: StudentRequest = {
      id: Date.now(),
      requestType,
      itemName,
      location,
      description,
      image,
      status: "pending",
      submittedBy: username,
    };

    const updatedRequests = [newRequest, ...savedRequests];
    localStorage.setItem("campusfind_requests", JSON.stringify(updatedRequests));
    window.dispatchEvent(new Event("campusfind_data_updated"));

    setMessage("Request submitted successfully. Waiting for admin approval.");
    resetForm();
    refreshMyRequests();
  };

  const getStatusStyle = (status: RequestStatus) => {
    if (status === "pending") {
      return {
        backgroundColor: "#fff3cd",
        color: "#856404",
      };
    }

    if (status === "approved") {
      return {
        backgroundColor: "#d1e7dd",
        color: "#0f5132",
      };
    }

    if (status === "done") {
      return {
        backgroundColor: "#d1ecf1",
        color: "#0c5460",
      };
    }

    return {
      backgroundColor: "#f8d7da",
      color: "#842029",
    };
  };

  const getClaimStatusStyle = (status: ClaimStatus) => {
    if (status === "requested") {
      return {
        backgroundColor: "#fff3cd",
        color: "#856404",
      };
    }

    if (status === "approved") {
      return {
        backgroundColor: "#d1e7dd",
        color: "#0f5132",
      };
    }

    if (status === "collected") {
      return {
        backgroundColor: "#d1ecf1",
        color: "#0c5460",
      };
    }

    return {
      backgroundColor: "#f8d7da",
      color: "#842029",
    };
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.463)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "left",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "10px",
    border: "1px solid rgba(0,0,0,0.05)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "wheat",
        padding: "100px 20px 40px 20px",
      }}
    >
      <Navbar onLetsStart={() => {}} onLogout={onLogout} isDashboard />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto 40px auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontWeight: "900", fontSize: "3em", marginBottom: "10px", color: "#333" }}>
          Student Dashboard
        </h1>
        <p style={{ fontSize: "1.2em", fontWeight: "600", color: "#444" }}>
          Welcome back, <span style={{ color: "#7e7eee" }}>{username}</span>!
        </p>
      </div>

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto 40px auto",
          backgroundColor: "rgba(255, 255, 255, 0.463)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "40px",
          borderRadius: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h2 style={{ marginBottom: "30px", textAlign: "center", fontWeight: "800", color: "#333" }}>
          Raise Item Request
        </h2>

        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "12px",
              color: "#333"
            }}
          >
            Select Request Type
          </label>

          <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontWeight: "600" }}>
              <input
                type="radio"
                name="requestType"
                value="lost"
                checked={requestType === "lost"}
                onChange={() => setRequestType("lost")}
                style={{ marginRight: "10px", width: "18px", height: "18px" }}
              />
              Lost Item
            </label>

            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontWeight: "600" }}>
              <input
                type="radio"
                name="requestType"
                value="found"
                checked={requestType === "found"}
                onChange={() => setRequestType("found")}
                style={{ marginRight: "10px", width: "18px", height: "18px" }}
              />
              Found Item
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmitRequest} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={textareaStyle}
          />

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#555" }}>
              Upload Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "12px",
                border: "1px solid rgba(0,0,0,0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.5)"
              }}
            />
          </div>

          {image && (
            <div style={{ position: "relative", marginBottom: "15px" }}>
              <img
                src={image}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "300px",
                  objectFit: "contain",
                  borderRadius: "16px",
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
              />
              <button
                type="button"
                onClick={() => setImage("")}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ×
              </button>
            </div>
          )}

          {message && (
            <div
              style={{
                backgroundColor: message.toLowerCase().includes("successfully") ? "#d1e7dd" : "#f8d7da",
                color: message.toLowerCase().includes("successfully") ? "#0f5132" : "#842029",
                padding: "12px 15px",
                borderRadius: "12px",
                marginBottom: "15px",
                textAlign: "center",
                fontWeight: "600"
              }}
            >
              {message}
            </div>
          )}

          <Button
            type="submit"
            style={{
              backgroundColor: "#7e7eee",
              border: "none",
              borderRadius: "12px",
              padding: "12px",
              fontWeight: "700",
              fontSize: "1.1em"
            }}
          >
            Submit Request
          </Button>
        </form>
      </div>

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto 40px auto",
          backgroundColor: "rgba(255, 255, 255, 0.463)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "40px",
          borderRadius: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h2 style={{ marginBottom: "30px", textAlign: "center", fontWeight: "800", color: "#333" }}>
          My Recent Requests
        </h2>

        {myRequests.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
            You haven't submitted any requests yet.
          </p>
        ) : (
          <div style={gridStyle}>
            {myRequests.map((request) => (
              <div key={request.id} style={cardStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h4 style={{ margin: 0, fontWeight: "700" }}>{request.itemName}</h4>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "15px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      ...getStatusStyle(request.status),
                    }}
                  >
                    {request.status.toUpperCase()}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "0.9em" }}>
                  <strong>Type:</strong>{" "}
                  {request.requestType === "lost" ? "Lost Item" : "Found Item"}
                </p>
                <p style={{ margin: 0, fontSize: "0.9em" }}>
                  <strong>Location:</strong> {request.location}
                </p>
                <p style={{ margin: 0, fontSize: "0.9em" }}>
                  <strong>Description:</strong> {request.description}
                </p>
                {request.image && (
                  <img
                    src={request.image}
                    alt={request.itemName}
                    style={imageStyle}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto 40px auto",
          backgroundColor: "rgba(255, 255, 255, 0.463)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "40px",
          borderRadius: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h2 style={{ marginBottom: "30px", textAlign: "center", fontWeight: "800", color: "#333" }}>
          My Recovery Claims
        </h2>

        {myClaims.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
            You haven't made any claims yet.
          </p>
        ) : (
          <div style={gridStyle}>
            {myClaims.map((claim) => (
              <div key={claim.id} style={cardStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h4 style={{ margin: 0, fontWeight: "700" }}>{claim.itemName}</h4>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "15px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      ...getClaimStatusStyle(claim.status),
                    }}
                  >
                    {claim.status.toUpperCase()}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "0.9em" }}>
                  <strong>Proof Provided:</strong> {claim.proofText}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <ApprovedItems />
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: "12px",
  border: "1px solid rgba(0,0,0,0.1)",
  fontSize: "16px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  outline: "none",
  transition: "border-color 0.3s",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: "12px",
  border: "1px solid rgba(0,0,0,0.1)",
  fontSize: "16px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  outline: "none",
  minHeight: "100px",
  transition: "border-color 0.3s",
  resize: "vertical",
};

export default StudentDashboard;