var listOfProducts;

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            listOfProducts = products;
            addProductsToWebpage();
        });
}

function initSite() {
    let productNumber = localStorage.getItem("products");
    if (productNumber) {
        document.querySelector(".cart-icon span").textContent = productNumbers;
    }
    //CC()
    loadProducts();
    getNrOfCartItems()
    // This would also be a good place to initialize other parts of the UI
}



/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    // Check your console to see that the products are stored in the listOfProducts varible.

    let main = document.getElementsByTagName("main")[0];

    let isGrey = true;

    for (let index = 0; index < listOfProducts.length; index++) {
        const product = listOfProducts[index];

        // Skapar den yttersta produktboxen
        let productContainer = document.createElement("div");
        productContainer.classList.add("productContainer");
        if (isGrey) {
            productContainer.style.backgroundColor = "lightgray";
        }

        // Skapar box för titel
        let titleContainer = document.createElement("div");
        titleContainer.classList.add("titleContainer");
        let title = document.createElement("h1");
        title.innerText = product.title;

        titleContainer.append(title);

        //Skapa box för decription
        let descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("descriptionContainer");
        let description = document.createElement("p");
        description.innerText = product.description;

        descriptionContainer.append(description);

        // Skapa box för bild
        let boxForImg = document.createElement("div");
        boxForImg.classList.add("imgContainer");
        let image = document.createElement("img");
        image.classList.add('productImg')
        image.src = "/assets/" + product.image;

        boxForImg.append(image);

        //Skapa box för pris
        let priceContainer = document.createElement("div");
        priceContainer.classList.add("priceContainer");
        let price = document.createElement("h3");
        price.innerText = product.price + " kr";

        priceContainer.append(price);

        //Skapa box för kundvagn
        

        let buttonContainer = document.createElement("div")
        buttonContainer.classList.add("buttonContainer")        
        buttonContainer.addEventListener("click", () =>  {
            addToCart(product)
        })

        let buttonAddToCart = document.createElement("button");
        buttonAddToCart.className = "cartButton"; 
        
        let buttontext = document.createElement("h4");
        buttontext.innerText = "Lägg till i kundvagn";
        
        let buttonIcon = document.createElement("i");
        buttonIcon.className = "fas fa-shopping-cart buttonIcon";

        buttonAddToCart.append(buttontext, buttonIcon)
        buttonContainer.append(buttonAddToCart)
        

        productContainer.append(
            titleContainer,
            descriptionContainer,
            boxForImg,
            priceContainer,
            buttonContainer
        );
        main.append(productContainer);
        isGrey = !isGrey;
        
        
}

}

//function onload() 

 

function addToCart(product) {
    
    let cart = localStorage.getItem("cart")

    if(cart) {
        cart = JSON.parse(cart)
    } else {
        cart = []
    }

    let productIndex = cart.findIndex((cartItem) => {
        return cartItem.product.title == product.title
    })

    if(productIndex >= 0) {
        cart[productIndex].quantity++
    } else {
        cart.push({
            product: product,
            quantity: 1
        })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    getNrOfCartItems()
}

function getNrOfCartItems() {
    let saveProducts = document.getElementsByTagName("span")[0]

    let cart = localStorage.getItem("cart")
      
    let amount = 0
    
    if(!cart) {
        saveProducts.innerText = amount
        return
    } 

    cart = JSON.parse(cart)
    cart.forEach((cartItem) => {
        amount += cartItem.quantity
    })

    saveProducts.innerText = amount 
    
}

