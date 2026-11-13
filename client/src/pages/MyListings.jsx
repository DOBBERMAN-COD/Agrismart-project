import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyListings() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Fetch listings belonging to the logged-in farmer.
  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/listings/mine",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch your listings.");
        }

        setListings(data.listings || []);
      } catch (error) {
        console.error("Fetching my listings error:", error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  // Delete a listing.
  const handleDelete = async (listingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmed) return;

    setDeletingId(listingId);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/listings/${listingId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete listing.");
      }

      // Remove the deleted listing from the displayed list.
      setListings((currentListings) =>
        currentListings.filter((listing) => listing._id !== listingId)
      );

      setSuccessMessage("Listing deleted successfully.");
    } catch (error) {
      console.error("Deleting listing error:", error);
      setErrorMessage(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="mb-2">My Listings</h1>
          <p className="text-muted mb-0">
            Manage the agricultural waste products you have listed.
          </p>
        </div>

        <Link to="/create-listing" className="btn btn-success">
          + Create New Listing
        </Link>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Listing count */}
      {!isLoading && !errorMessage && (
        <div className="mb-4">
          <h5>
            Total Listings: <span className="text-success">{listings.length}</span>
          </h5>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3">Loading your listings...</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !errorMessage && listings.length === 0 && (
        <div className="text-center border rounded p-5">
          <h4>You haven't created any listings yet.</h4>
          <p className="text-muted">
            Start by listing agricultural waste products that you want to sell.
          </p>

          <Link to="/create-listing" className="btn btn-success mt-2">
            Create Your First Listing
          </Link>
        </div>
      )}

      {/* Display farmer's listings */}
      {!isLoading && listings.length > 0 && (
        <div className="row g-4">
          {listings.map((listing) => (
            <div className="col-md-6 col-lg-4" key={listing._id}>
              <div className="card h-100 shadow-sm">
                {listing.image ? (
                  <img
                    src={listing.image}
                    className="card-img-top"
                    alt={listing.type}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="bg-light d-flex align-items-center justify-content-center"
                    style={{ height: "200px" }}
                  >
                    <span className="text-muted">No image available</span>
                  </div>
                )}

                <div className="card-body">
                  <span className="badge bg-success mb-2">
                    {listing.category}
                  </span>

                  <h5 className="card-title">{listing.type}</h5>

                  <p className="card-text text-muted">
                    {listing.description}
                  </p>

                  <p className="mb-1">
                    <strong>Price:</strong> KSh {listing.price} / {listing.unit}
                  </p>

                  <p className="mb-0">
                    <strong>Location:</strong> {listing.location}
                  </p>
                </div>

                <div className="card-footer bg-white d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    disabled={deletingId === listing._id}
                    onClick={() => handleDelete(listing._id)}
                  >
                    {deletingId === listing._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;