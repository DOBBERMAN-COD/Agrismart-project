function HowItWorks(){
    return (
     <section className="bg-light">   
            <div className="container text-center py-5 ">
                <h2 className="display-6">How AgriSmart Works</h2>
                <p className="text-muted w-75 mx-auto mb-5">AgriSmart brings farmers, buyers, and transport providers together in one marketplace. Farmers can turn agricultural waste into income, buyers can find useful materials, and transport providers help move them from farms to their destinations.</p>


                <div className="row g-4">
                    <div className="col-md-4 ">
                        <div className="card h-100 border-0 shadow-sm"> 
                            <div className="card-body p-4">
                                <h5 className="card-title fw-bold mb-3">Farmer</h5>
                                <p className="card-text text-muted">Farmers can list agricultural waste and by-products on AgriSmart and connect with buyers who need these materials.</p>
                                </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="card-title fw-bold mb-3">Buyer</h5>
                                <p className="card-text text-muted">Buyers can discover available agricultural materials, compare listings, and connect with farmers to negotiate prices.</p>
                        </div>
                </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="card-title fw-bold mb-3">Transport Provider</h5>
                                <p className="card-text text-muted">Transport providers can find delivery requests and help move agricultural materials from farmers to buyers.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    </section>        
    )
}

export default HowItWorks;