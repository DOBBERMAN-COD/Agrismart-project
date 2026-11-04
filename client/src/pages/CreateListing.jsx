import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  type:"",
  category:"",
  description:"",
  price:"",
  unit:"",
  location:"",
}




function CreateListing() {
  const imageInputRef = useRef(null);
  
  // const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      setImageFile(null);
      setImagePreview("");
      setErrorMessage("Image must not exceed 5 MB");
      return;
    }

     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
    event.target.value = "";
    setImageFile(null);
    setImagePreview("");
    setErrorMessage("Only JPEG, PNG, and WEBP image formats are allowed.");
    
    return;
  }
    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

 
  const resetForm = () => {
    setFormData(initialFormData);

    setImageFile(null);
    setImagePreview("");

    if(imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = async(event) =>{
    event.preventDefault();


   //setSuccessMessage("");
   setErrorMessage("");

    //Make sure an image has been selected
    if(!imageFile) {
      setErrorMessage("Please select an image for your listing.");
      return;
    }

    //Validate the price
    if ( 
      Number(formData.price) < 0 || 
      !Number.isFinite(Number(formData.price))
    ) {
      setErrorMessage("Please enter a valid price.");
      return;
    }

    //package the form fields and image
    const listingData = new FormData();

    listingData.append("type", formData.type);
    listingData.append("category", formData.category);
    listingData.append("description", formData.description);
    listingData.append("price", formData.price);
    listingData.append("unit", formData.unit);
    listingData.append("location", formData.location);
    listingData.append("image", imageFile);

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "http://localhost:5000/api/listings",
        {
            method: "POST",
            body: listingData,
        }
      );

      const result = await response.json();

      if (!response.ok ) {
        throw new Error(result.message || "Failed to create listing.");
      }



      console.log("Created listing:" , result.listing);

      resetForm();

      navigate("/listings", {
        state: {
          successMessage: "Your waste listing was published successfully!"
        },
      });
    } catch(error) {
      console.error("Submission error:" ,error);

       setErrorMessage(
        error.message || "Something went wrong. Please try again."
       );

    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h1>Create a Waste Listing</h1>

      

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Waste Type</label>

          <input
            type="text"
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="e.g. Maize Husks"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>

          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g Crop residue"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>

          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the waste material ..."
            rows="4"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (Ksh)</label>

          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="Enter your asking price"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Unit</label>

          <select
            className="form-select"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
          >
            <option value="">Select a unit</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="tonne">Tonne</option>
            <option value="bag">Bag</option>
            <option value="piece">Piece</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>

          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Nyeri, Kenya"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Waste Image</label>

          <input
            ref={imageInputRef}
            type="file"
            className="form-control"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleImageChange}
            required
          />

          {imagePreview && (
            <div className="mt-3">
              <h5>Image Preview</h5>

              <img
                src={imagePreview}
                alt="selected waste material"
                className="img-thumbnail"
                style={{
                  width: "300px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </div>

        <button 
            type="submit"
            className="btn btn-success"
            disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Create Listing"}
         </button>
      </form>
    </div>
  );
}

export default CreateListing;
