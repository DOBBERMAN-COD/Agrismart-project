function Navbar() {
    return(
        
    <nav className="navbar navbar-expand-lg bg-white border-bottom">

     <div className="container">

            <a className="navbar-brand fw-bold fs-4" href="#">AgriSmart</a>

            <button 
            className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">☰</button>

            <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav" >
                <li className="nav-item">
                    <a className="nav-link px-3" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link px-3" href="#">Waste Listings</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link px-3" href="#">Get Transport</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link px-3" href="#">Login</a>
                </li>
                <li className="nav-item">
                    <a className="btn btn-success rounded-pill px-4 ms-lg-2" href="#">Register</a>
                </li>
                </ul>
                </div>

            </div>
        </nav>
        
    )
}

export default Navbar