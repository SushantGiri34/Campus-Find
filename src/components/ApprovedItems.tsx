import { useEffect, useState } from "react";

type RequestStatus = "pending" | "approved" | "rejected" | "done";
type ClaimStatus = "requested" | "approved" | "rejected" | "collected";

type ApprovedRequest = {
  id: number;
  requestType: "lost" | "found";
  itemName: string;
  location: string;
  description: string;
  image: string;
  status: RequestStatus;
  submittedBy: string;
};

type CurrentUser = {
  role: "student" | "admin";
  username: string;
} | null;

type RecoveryClaim = {
  id: number;
  itemId: number;
  itemName: string;
  claimantUsername: string;
  proofText: string;
  status: ClaimStatus;
};

const ApprovedItems = () => {
  const [approvedItems, setApprovedItems] = useState<ApprovedRequest[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [claimInputs, setClaimInputs] = useState<Record<number, string>>({});
  const [openClaimBox, setOpenClaimBox] = useState<Record<number, boolean>>({});
  const [claimMessage, setClaimMessage] = useState<Record<number, string>>({});

  const loadApprovedItems = () => {
    const savedRequests: ApprovedRequest[] = JSON.parse(
      localStorage.getItem("campusfind_requests") || "[]",
    );

    const onlyApproved = savedRequests.filter(
      (request) => request.status === "approved",
    );

    setApprovedItems(onlyApproved);

    const savedCurrentUser = localStorage.getItem("campusfind_current_user");
    if (savedCurrentUser) {
      setCurrentUser(JSON.parse(savedCurrentUser));
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    loadApprovedItems();

    const handleDataUpdate = () => {
      loadApprovedItems();
    };

    window.addEventListener("storage", handleDataUpdate);
    window.addEventListener("campusfind_data_updated", handleDataUpdate);

    return () => {
      window.removeEventListener("storage", handleDataUpdate);
      window.removeEventListener("campusfind_data_updated", handleDataUpdate);
    };
  }, []);

  const submitClaim = (item: ApprovedRequest) => {
    if (!currentUser || currentUser.role !== "student") {
      setClaimMessage((prev) => ({
        ...prev,
        [item.id]: "Please login as student first.",
      }));
      return;
    }

    const proofText = (claimInputs[item.id] || "").trim();

    if (!proofText) {
      setClaimMessage((prev) => ({
        ...prev,
        [item.id]: "Please write proof details first.",
      }));
      return;
    }

    const savedClaims: RecoveryClaim[] = JSON.parse(
      localStorage.getItem("campusfind_claims") || "[]",
    );

    const alreadyClaimed = savedClaims.some(
      (claim) =>
        claim.itemId === item.id &&
        claim.claimantUsername === currentUser.username &&
        claim.status !== "rejected",
    );

    if (alreadyClaimed) {
      setClaimMessage((prev) => ({
        ...prev,
        [item.id]: "You already submitted a claim for this item.",
      }));
      return;
    }

    const newClaim: RecoveryClaim = {
      id: Date.now(),
      itemId: item.id,
      itemName: item.itemName,
      claimantUsername: currentUser.username,
      proofText,
      status: "requested",
    };

    const updatedClaims = [newClaim, ...savedClaims];
    localStorage.setItem("campusfind_claims", JSON.stringify(updatedClaims));
    window.dispatchEvent(new Event("campusfind_data_updated"));

    setClaimInputs((prev) => ({
      ...prev,
      [item.id]: "",
    }));

    setOpenClaimBox((prev) => ({
      ...prev,
      [item.id]: false,
    }));

    setClaimMessage((prev) => ({
      ...prev,
      [item.id]: "Recovery request submitted successfully.",
    }));
  };

  const cardsGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
    alignItems: "stretch",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    maxHeight: "220px",
    objectFit: "contain",
    borderRadius: "8px",
    marginTop: "8px",
    marginBottom: "10px",
    backgroundColor: "#f3f3f3",
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto 0 auto",
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Approved Public Items
      </h2>

      {approvedItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No approved items available yet.
        </p>
      ) : (
        <div style={cardsGridStyle}>
          {approvedItems.map((item) => {
            const isFoundItem = item.requestType === "found";
            const isStudent = currentUser?.role === "student";
            const isOwnItem = currentUser?.username === item.submittedBy;
            const canClaim = isFoundItem && isStudent && !isOwnItem;

            return (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "15px",
                  textAlign: "left",
                  backgroundColor: "#fafafa",
                  height: "100%",
                  fontSize: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <h4 style={{ margin: 0 }}>{item.itemName}</h4>

                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "15px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      backgroundColor: "#d1e7dd",
                      color: "#0f5132",
                    }}
                  >
                    APPROVED
                  </span>
                </div>

                <p>
                  <strong>Type:</strong>{" "}
                  {item.requestType === "lost" ? "Lost Item" : "Found Item"}
                </p>

                <p>
                  <strong>Location:</strong> {item.location}
                </p>

                <p>
                  <strong>Description:</strong> {item.description}
                </p>

                <p>
                  <strong>Submitted By:</strong> {item.submittedBy}
                </p>

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.itemName}
                    style={imageStyle}
                  />
                )}

                {isFoundItem && canClaim && (
                  <>
                    <button
                      onClick={() =>
                        setOpenClaimBox((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }
                      style={{
                        border: "none",
                        backgroundColor: "#7E7EEE",
                        color: "white",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginTop: "8px",
                      }}
                    >
                      This is mine
                    </button>

                    {openClaimBox[item.id] && (
                      <div style={{ marginTop: "12px" }}>
                        <textarea
                          placeholder="Write proof like color, sticker, hidden mark, ID card, lockscreen wallpaper, etc."
                          value={claimInputs[item.id] || ""}
                          onChange={(e) =>
                            setClaimInputs((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          style={{
                            width: "100%",
                            minHeight: "90px",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            resize: "vertical",
                            marginBottom: "10px",
                          }}
                        />

                        <button
                          onClick={() => submitClaim(item)}
                          style={{
                            border: "none",
                            backgroundColor: "black",
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          Submit Recovery Request
                        </button>
                      </div>
                    )}
                  </>
                )}

                {isFoundItem && !canClaim && (
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#777",
                      marginTop: "8px",
                    }}
                  >
                    {!isStudent
                      ? "Login as a student to claim this found item."
                      : isOwnItem
                        ? "You cannot claim your own found item."
                        : ""}
                  </p>
                )}

                {claimMessage[item.id] && (
                  <p
                    style={{
                      marginTop: "10px",
                      color: claimMessage[item.id]
                        .toLowerCase()
                        .includes("success")
                        ? "green"
                        : "red",
                      fontWeight: "500",
                    }}
                  >
                    {claimMessage[item.id]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApprovedItems;