const params=new URLSearchParams(window.location.search);

const productId=params.get("id");

fetch("https://dummyjson.com/products/"+productId)
.then(function(response){
    return response.json();
})
.then(function(product){

    document.getElementById("productImage").src=product.thumbnail;

    document.getElementById("productTitle").innerHTML=product.title;

    document.getElementById("productBrand").innerHTML=product.brand;

    document.getElementById("productCategory").innerHTML=product.category;

    document.getElementById("productRating").innerHTML=product.rating;

    document.getElementById("productPrice").innerHTML="$"+product.price;

    document.getElementById("productDiscount").innerHTML=product.discountPercentage.toFixed(1);

    document.getElementById("productStock").innerHTML=product.stock;

    document.getElementById("productDescription").innerHTML=product.description;

});

function addToCart(){

    let cart=JSON.parse(localStorage.getItem("cart"));

    if(cart==null){
        cart=[];
    }

    let found=false;

    for(let i=0;i<cart.length;i++){

        if(cart[i].id==productId){
            cart[i].quantity++;
            found=true;
            break;
        }

    }

    if(found==false){

        cart.push({
            id:productId,
            quantity:1
        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    alert("Product Added To Cart");

}