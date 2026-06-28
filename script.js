const productContainer = document.getElementById("productContainer");
const productCount = document.getElementById("productCount");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

fetch("https://dummyjson.com/products?limit=194")
.then(function(response){
    return response.json();
})
.then(function(data){

    allProducts = data.products;

    displayProducts(allProducts);

});

function displayProducts(products){

    productContainer.innerHTML = "";

    productCount.innerHTML = products.length;

    products.forEach(function(product){

        productContainer.innerHTML += `

        <div class="product-card">

            <span class="discount">
                ${Math.round(product.discountPercentage)}% OFF
            </span>

            <div class="product-image">

                <img src="${product.thumbnail}" alt="${product.title}">

            </div>

            <div class="product-info">

                <div class="tags">

                    <span>${product.category}</span>

                    <span>${product.brand}</span>

                    <span>⭐ ${product.rating}</span>

                </div>

                <h3>${product.title}</h3>

                <p class="stock">
                    ✔ In Stock (${product.stock})
                </p>

                <p class="description">
                    ${product.description}
                </p>

                <div class="price-row">

                    <div>

                        <span class="price">
                            $${product.price}
                        </span>

                    </div>

                    <button onclick="viewProduct(${product.id})">
                        View Details
                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

function viewProduct(id){

    window.location.href = "product.html?id=" + id;

}

if(searchInput){

    searchInput.addEventListener("keyup",function(){

        let value = searchInput.value.toLowerCase();

        let filteredProducts = allProducts.filter(function(product){

            return product.title.toLowerCase().includes(value);

        });

        displayProducts(filteredProducts);

    });

}

const details = document.getElementById("productDetails");

if(details){

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    fetch("https://dummyjson.com/products/" + id)

    .then(function(response){

        return response.json();

    })

    .then(function(product){

        details.innerHTML = `

        <div class="details-page">

            <img src="${product.thumbnail}">

            <h1>${product.title}</h1>

            <h2>$${product.price}</h2>

            <p>${product.description}</p>

            <p><b>Brand :</b> ${product.brand}</p>

            <p><b>Category :</b> ${product.category}</p>

            <p><b>Rating :</b> ⭐ ${product.rating}</p>

            <p><b>Stock :</b> ${product.stock}</p>

        </div>

        `;

    });

}