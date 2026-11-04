import {Link } from "react-router-dom"

const img = "http://localhost:5000/images/A_pile_of_straw_after_extracting_grains.jpg";

function Home() {
  return (
    <section className="py-5">
      <div className="container text-start py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <h1 className="display-3 fw-bold">
              Turn Agricultural Waste into Value
            </h1>

            <p className="w-75 text-muted mb-4">
              AgriSmart connects farmers, buyers, and transport providers in one
              simple marketplace. Farmers can turn agricultural waste and
              by-products into an additional source of income, while buyers can
              find useful materials at competitive prices. AgriSmart also helps
              users arrange reliable transportation, making it easier to move
              agricultural waste from the farm to where it is needed.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <Link to="/listings" className="btn btn-primary rounded-pill px-4 py-2 ">
                Browse Waste
              </Link>
              <Link to="/create-listing" className="btn btn-outline-success rounded-pill px-4 py-2">
                Sell Waste
              </Link>
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-center px-md-3">
            <img
              src={img}
              alt="Maize farm in the Mount Kenya region"
              className="img-fluid rounded-4 shadow-sm w-100"
              style={{ height:"420px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
