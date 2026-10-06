import maizeStalksImage from "../assets/Maize_stalks_-_geograph.org.uk_-_5359105.jpg";
import coffeeHusksImage from "../assets/Coffee_husks.JPG";
import cowManureImage from "../assets/Cow_and_Buffalo_Dung_As_Manure.jpg";

function FeaturedListings() {
  return (
    <section className="py-5">
      <div className="container text-center">
        <h2 className="display-6">Featured Waste Listings</h2>
        <p className="text-muted w-75 mx-auto mb-5">
          Explore available agricultural waste and by-products from farmers
          across the marketplace. Find useful materials, compare prices, and
          connect directly with sellers.
        </p>

        <div className="row g-4">
          <div className="col-md-4 d-flex">
            <div className="card h-100 w-100 border-0 shadow-sm">
              <img
                src={maizeStalksImage}
                alt="Maize Stalks"
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-3">Maize Stalks</h5>
                <p className="card-text">
                  Fresh and high-quality maize stalks available for livestock
                  bedding and fuel.
                </p>
                <p className="fw-bold fs-5 mb-2">100 Ksh / bag </p>
                <p className="text-muted mb-4">Nyeri</p>
                <a
                  href="#"
                  className="btn btn-primary  rounded-pill px-4 py-2 mt-auto"
                >
                  View Listing
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 d-flex">
            <div className="card h-100 w-100 border-0 shadow-sm">
              <img
                src={coffeeHusksImage}
                alt="Coffee Husks"
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-3">Coffee Husks</h5>
                <p className="card-text">
                  Fresh coffee husks available for biofuel and composting.
                </p>
                <p className="fw-bold fs-5 mb-2">120 Ksh / bag </p>
                <p className="text-muted mb-4">Kiambu</p>
                <a
                  href="#"
                  className="btn btn-primary  rounded-pill px-4 py-2 mt-auto"
                >
                  View Listing
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 d-flex">
            <div className="card h-100 w-100  border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <img
                  src={cowManureImage}
                  alt="Coffee Husks"
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <h5 className="card-title fw-bold mb-3">Cow Manure</h5>
                <p className="card-text">
                  Fresh cow manure available for organic farming and composting.
                </p>
                <p className="fw-bold fs-5 mb-2">150 Ksh / bag </p>
                <p className="text-muted mb-4">Nakuru</p>
                <a
                  href="#"
                  className="btn btn-primary  rounded-pill px-4 py-2 mt-auto"
                >
                  View Listing
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedListings;
