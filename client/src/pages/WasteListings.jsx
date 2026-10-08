import { useState } from "react";
import ListingCard from "../components/ListingCard";
import maizeStalks from '../assets/Maize_stalks_-_geograph.org.uk_-_5359105.jpg'
import coffeHusks from '../assets/Coffee_husks.JPG'
import cowManure from '../assets/Cow_and_Buffalo_Dung_As_Manure.jpg'


function WasteListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Waste Types");

  const listings = [
    {
      type: "Maize Stalks",
      category: "Crop Residue",
      description:
        "Fresh and high-quality maize stalks available for livestock bedding and fuel.",
      price: 100,
      unit: "bag",
      location: "Nyeri",
      image: maizeStalks
    },
    {
      type: "Coffee Husks",
      category: "Food Processing Waste",
      description: "Fresh coffee husks available for biofuel and composting",
      price: 120,
      unit: "bag",
      location: "Kiambu",
      image: coffeHusks
    },
    {
      type: "Cow Manure",
      category: "Animal Waste",
      description:
        "Fresh cow manure available for organic farming and composting",
      price: 150,
      unit: "bag",
      location: "Nakuru",
      image: cowManure
    },
  ];

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
        {filteredListings.length === 0 && (
          <div className="col-12">
            <p className="text-muted">
              No listings found. Try a different search.
            </p>
          </div>
        )}

        {filteredListings.map((listing) => (
          <ListingCard key={listing.type} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default WasteListings;
