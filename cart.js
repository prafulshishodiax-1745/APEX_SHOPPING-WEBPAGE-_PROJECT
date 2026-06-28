const cartContainer=document.getElementById("cartContainer");
const totalItems=document.getElementById("totalItems");
const totalPrice=document.getElementById("totalPrice");
const grandTotal=document.getElementById("grandTotal");

let cart=JSON.parse(localStorage.getItem("cart"))||[];

displayCart();

function displayCart(){

    cartContainer.innerHTML="";

    if(cart.length==0){

        cartContainer.innerHTML="<div class='empty-cart'>Your Cart is Empty</div>";

        totalItems.innerHTML="0";
        totalPrice.innerHTML="$0";
        grandTotal.innerHTML="$0";

        return;

    }

    let itemCount=0;
    let price=0;

    cart.forEach(function(item){

        fetch("https://dummyjson.com/products/"+item.id)
        .then(function(response){
            return response.json();
        })
        .then(function(product){

            itemCount+=item.quantity;

            price+=product.price*item.quantity;

            totalItems.innerHTML=itemCount;

            totalPrice.innerHTML="$"+price.toFixed(2);

            grandTotal.innerHTML="$"+price.toFixed(2);

            cartContainer.innerHTML+=`

            <div class="cart-card">

                <img src="${product.thumbnail}">

                <div class="cart-info">

                    <h3>${product.title}</h3>

                    <p>$${product.price}</p>

                    <div class="quantity">

                        <button onclick="decreaseQuantity(${product.id})">-</button>

                        <span>${item.quantity}</span>

                        <button onclick="increaseQuantity(${product.id})">+</button>

                    </div>

                </div>

                <button class="remove-btn" onclick="removeItem(${product.id})">

                    Remove

                </button>

            </div>

            `;

        });

    });

}

function increaseQuantity(id){

    for(let i=0;i<cart.length;i++){

        if(cart[i].id==id){

            cart[i].quantity++;

            break;

        }

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

function decreaseQuantity(id){

    for(let i=0;i<cart.length;i++){

        if(cart[i].id==id){

            if(cart[i].quantity>1){

                cart[i].quantity--;

            }

            break;

        }

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

function removeItem(id){

    cart=cart.filter(function(item){

        return item.id!=id;

    });

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}