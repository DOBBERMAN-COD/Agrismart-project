import { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";
import { useLocation } from "react-router-dom";

function WasteListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Waste Types");

  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/listings");

        if (!response.ok) {
          throw new Error("Failed to fetch waste listings.");
        }

        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Fetching listings error:", error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      listing.type.toLowerCase().includes(searchText) ||
      listing.description.toLowerCase().includes(searchText) ||
      listing.location.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All Waste Types" ||
      listing.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container text-center pb-5">
      <h1>Agricultural Waste Marketplace</h1>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <p className="text-muted w-75 mx-auto mb-5">
        Turn agricultural waste into value. Explore available farm by-products,
        compare prices, and connect with farmers offering useful materials for
        reuse and sustainable production.
      </p>

      <div className="row g-3 mb-5">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search agricultural waste..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="All Waste Types">All Waste Types</option>
            <option value="Crop Residue">Crop Residue</option>
            <option value="Animal Waste">Animal Waste</option>
            <option value="Food Processing Waste">Food Processing Waste</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {isLoading && (
          <div className="col-12">
            <p className="text-muted">Loading listings ...</p>
          </div>
        )}

        {!isLoading && !errorMessage && filteredListings.length === 0 && (
          <div className="col-12">
            <p className="text-muted">No listings found.</p>
          </div>
        )}

        {!isLoading &&
          !errorMessage &&
          filteredListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
      </div>
    </div>
  );
}

export default WasteListings;
