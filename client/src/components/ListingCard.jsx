 import "./ListingCard.css"

function ListingCard ({listing}) {

     
    return ( 
         <div className="col-md-4 d-flex">
                    <div className="card h-100 w-100 border-0 shadow-sm listing-card">

                      <img
                        src={listing.image}
                        alt={listing.type}
                        className="card-img-top listing-image"
                      />

                      <div className="card-body d-flex flex-column">

                          <span className="badge bg-success mb-3 align-self-start">{listing.category}</span>

                        <h5 className="card-title fw-bold mb-3">{listing.type}</h5>

                        <p className="card-text">
                          {listing.description}
                        </p>
                        <p className="fw-bold fs-5 mb-2">KSH {listing.price} / {listing.unit} </p>

                        <p className="text-muted mb-4">📍{listing.location}</p>

                        <a
                          href="#"
                          className="btn btn-primary  rounded-pill px-4 py-2 mt-auto"
                        >
                          View Listing
                        </a>

                      </div>
                    </div>
                  </div>
    )
}

export default ListingCard


