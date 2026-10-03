function Navbar() {
    return(
        
    <nav className="navbar navbar-expand-lg">

     <div className="container">

            <a className="navbar-brand" href="#">AgriSmart</a>

            <button 
            className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">☰</button>

            <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav" >
                <li className="nav-item">
                    <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Waste Listings</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Get Transport</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Register</a>
                </li>
                </ul>
                </div>

            </div>
        </nav>
        
    )
}

export default Navbar