function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-6 mb-4">
            <h3 className="fs-5 fw-bold">AgriSmart</h3>
            <p className="text-white-50">
              Connecting farmers, buyers, and transport providers in one simple
              marketplace.
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h3 className="fs-5 fw-bold">Marketplace</h3>
            <ul className="list-unstyled fs-6">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  Waste Listings
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  Get Transport
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h3 className="fs-5 fw-bold">For Users</h3>
            <ul className="list-unstyled fs-6">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <hr className="border-secondary" />
            <p className="text-center mb-0">
              &copy; 2026 AgriSmart. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
