import Button from "react-bootstrap/Button";

interface prop {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    image: string;
  };
}

const Form = ({ onChange, onSubmit, onImageChange, formData }: prop) => {
  return (
    <>
      <form
        className="innerDiv"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "auto",
        }}
        onSubmit={onSubmit}
      >
        <input
          className="input"
          type="text"
          name="itemName"
          placeholder="Item Name"
          onChange={onChange}
        />

        <input
          className="input"
          type="text"
          name="location"
          placeholder="Location"
          onChange={onChange}
        />

        <textarea
          className="input"
          placeholder="description"
          name="description"
          onChange={onChange}
        ></textarea>

        {/* IMAGE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          style={{ margin: "10px" }}
        />

        {/* IMAGE PREVIEW */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
        )}

        <Button
          variant="primary"
          type="submit"
          style={{ margin: "10px", padding: "10px" }}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Form;