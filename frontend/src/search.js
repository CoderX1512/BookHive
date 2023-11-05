import React from "react";

const SearchBarSection = ({ products, search }) => {
    // Filter products based on the search query
    const filteredProducts = products.filter((product) => {
        const lowerCaseSearch = search.toLowerCase();
        return (
            product.id.toString().includes(lowerCaseSearch) || // Search by ID
            product.title.toLowerCase().includes(lowerCaseSearch) || // Search by title
            product.category.toLowerCase().includes(lowerCaseSearch) // Search by category
        );
    });

    return (
        <div className="searchBarSection">
            <br/><br/>
            <div className="display">
                <div className="row">
                    {filteredProducts.map((item) => (
                        <div className="col-md-4" key={item.id}>
                            <div className="card mb-4">
                            <h5>{item.id}</h5>
                          <img src={item.image} className="card-img-top" alt={item.name} 
                          style={{ width: '100px', height: '100px' }} />
                          <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.description}</p>
                          </div>
                          <div className="card-footer">
                            <button className="btn btn-primary">Add to Cart</button>
                            <p className="card-text">${item.price}</p>
                          </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchBarSection;
