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
    loadProducts();
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    // Check your console to see that the products are stored in the listOfProducts varible.
    console.log(listOfProducts);

    let main = document.getElementsByTagName("main")[0]

    let isGrey = true

    for (let index = 0; index < listOfProducts.length; index++) {
        const product = listOfProducts[index];

        // Skapar den yttersta produktboxen
        let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer");
        if (isGrey) {
            productContainer.style.backgroundColor = "lightgray"
        }

        // Skapar box för titel
        let titleContainer = document.createElement("div")
        titleContainer.classList.add("titleContainer")
        let title = document.createElement("h1")
        title.innerText = product.title

        titleContainer.append(title)

        //Skapa box för decription
        let descriptionContainer = document.createElement("div")
        descriptionContainer.classList.add("descriptionContainer")
        let description = document.createElement("p")
        description.innerText = product.description

        descriptionContainer.append(description)

        // Skapa box för bild
        let boxForImg = document.createElement("div")
        boxForImg.classList.add("imgContainer")
        let image = document.createElement("img")
        image.src = "/assets/" + product.image

        boxForImg.append(image)


        //Skapa box för pris
        let priceContainer = document.createElement("div")
        priceContainer.classList.add("priceContainer")
        let price = document.createElement("h3")
        price.innerText = product.price + " kr"

        priceContainer.append(price)


        //Skapa box för kundvagn
        let cartContainer = document.createElement("div")
        cartContainer.classList.add("cartContainer")

        let button = document.createElement("div")
        button.classList.add("cartButton")

        let buttontext = document.createElement("h4")
        buttontext.innerText = "Lägg till i kundvagn"

        let buttonIcon = document.createElement("i")
        buttonIcon.className = "fas fa-shopping-cart buttonIcon"


        button.append(buttontext, buttonIcon)
        button.addEventListener("click", function () {
            addProductsToCart(product)

        })

        cartContainer.append(button)

        productContainer.append(titleContainer, descriptionContainer, boxForImg, priceContainer, cartContainer)
        main.append(productContainer)

        isGrey = !isGrey
    }
}

document.getElementById("myButton").onclick = function () {
location.href = "www.yoursite.com";
};

function addProductsToCart(productToAdd) {

    //localStorage.setItem("ShoppingCart", JSON.stringify(productToAdd));
    let cart = localStorage.getItem("ShoppingCart")
    if (cart !== null && cart !== false) {
        cart = JSON.parse(cart)
    } else {
        cart = []
    }


    cart.push(productToAdd)
    console.log(cart)

    localStorage.setItem("ShoppingCart", JSON.stringify(cart))


    //const cart = ["Banana", "Orange", "Apple", "Mango"];
    //cart.push("Kiwi");   // Adds "Kiwi"    


}













