import { useState } from "react";

type ItemType = {
  id: number;
  type: "lost" | "found";
  itemName: string;
  location: string;
  description: string;
  image: string;
};

interface prop {
  itemss: ItemType[];
  handleDelete: (id: number) => void;
}

const SubmittedItems = ({ itemss, handleDelete }: prop) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = itemss.filter((item) => {
    const fullText =
      `${item.itemName} ${item.location} ${item.description}`.toLowerCase();
    return fullText.includes(searchTerm.toLowerCase());
  });

  const lostItems = filteredItems.filter((item) => item.type === "lost");
  const foundItems = filteredItems.filter((item) => item.type === "found");

  return (
    <>
      <h2 style={{ marginTop: "50px", marginBottom: "20px" }}>
        SUBMITTED ITEMS
      </h2>

      {/* SEARCH BAR */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search by item name, location, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "60%",
            maxWidth: "500px",
            padding: "12px 15px",
            borderRadius: "25px",
            border: "2px solid #ccc",
            outline: "none",
            fontSize: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        />
      </div>

      {itemss.length === 0 ? (
        <p>No Items Submitted Yet.</p>
      ) : filteredItems.length === 0 ? (
        <p>No matching items found.</p>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {/* LOST ITEMS */}
          <div
            style={{
              width: "450px",
              minHeight: "200px",
              border: "2px solid #dc3545",
              borderRadius: "12px",
              padding: "20px",
              backgroundColor: "#fff5f5",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ textAlign: "center", color: "#dc3545" }}>
              🔴 Lost Items
            </h3>

            {lostItems.length === 0 ? (
              <p style={{ textAlign: "center" }}>No lost items.</p>
            ) : (
              lostItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "15px",
                    backgroundColor: "white",
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      border: "none",
                      background: "linear-gradient(135deg, #28a745, #218838)",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "bold",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✔ Claimed
                  </button>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.itemName}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginBottom: "12px",
                      }}
                    />
                  )}

                  <h4>{item.itemName}</h4>
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* FOUND ITEMS */}
          <div
            style={{
              width: "450px",
              minHeight: "200px",
              border: "2px solid #198754",
              borderRadius: "12px",
              padding: "20px",
              backgroundColor: "#f4fff8",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ textAlign: "center", color: "#198754" }}>
              🟢 Found Items
            </h3>

            {foundItems.length === 0 ? (
              <p style={{ textAlign: "center" }}>No found items.</p>
            ) : (
              foundItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "15px",
                    backgroundColor: "white",
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      border: "none",
                      background: "linear-gradient(135deg, #28a745, #218838)",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "bold",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✔ Claimed
                  </button>

                  <h4>{item.itemName}</h4>
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SubmittedItems;
