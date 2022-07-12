function initSite() {
	getNrOfCartItems()
	getCartContent()
	console.log('init körs')
}

function getCartContent() {
	let cart = localStorage.getItem('cart')
		
	if(cart) {
		cart = JSON.parse(cart)
		console.log('localStorage finns')
	} else {
		cart = []
	}
	
	let cartSection = document.getElementsByClassName('sectionCart')[0];
	cartSection.innerHTML = '';

	for (let s = 0; s < cart.length; s++) {
		let cartItem = createContainerForCart(cart[s]);

		cartSection.append(cartItem) 
		console.log('showcart')
		
	}
	completePurchase(cart)
}

function createContainerForCart(cartItem) {
	let cartItemContainer = document.createElement('div');
	cartItemContainer.className = 'cartItem';
			
			let titleContainer = document.createElement('div');
			titleContainer.classList.add('cartTitleContainer');
			let title = document.createElement('h3');
			title.classList.add('priceElement')
			title.innerText = cartItem.product.title
			titleContainer.append(title)

			let cartItemImgContainer = document.createElement('div')
			cartItemImgContainer.classList.add('cartImgContainer');
			let cartItemImg = document.createElement('img')
			cartItemImg.classList.add('cartImg');
			cartItemImg.src = "./assets/" + cartItem.product.image;
			cartItemImgContainer.append(cartItemImg);
			
			/* let controls = document.createElement('div');
			controls.className = 'controls';
			cartItem.append(controls)

			let plus = document.createElement('span');
			plus.textContent = '+';
			plus.setAttribute('data-title', item.title);
			controls.appendChild(plus);
			plus.addEventListener('click', incrementCart) */

			let controls = document.createElement('div');
			controls.classList.add('quantityContainer')
			let qty = document.createElement('span');
			qty.classList.add('controls')
			qty.innerText = cartItem.quantity + 'st';
			let cost = (cartItem.quantity * cartItem.product.price + 'kr');
			cost.innerText = cost;
			controls.append(qty, cost);

			/*
			let minus = document.createElement('span');
			minus.textContent = '-';
			minus.setAttribute('data-title', item.title);
			controls.appendChild(minus);
			minus.addEventListener('click', decrementCart) */

			let priceContainer = document.createElement('div');
			priceContainer.classList.add('priceContainerCart');
			let price = document.createElement('h3')
			price.classList.add('price')
			price.innerText = (cartItem.product.price + 'kr/st');
			

			priceContainer.append(price);


			let removeItemButtonContainer = document.createElement('div')
			removeItemButtonContainer.classList.add('removeBtnContainer')
			let removeItemBtn = document.createElement('removeBtn')
			removeItemBtn.innerText = 'Ta bort'
			removeItemBtn.addEventListener('click', ()=>{
				removeCartItem(cartItem)
				getNrOfCartItems()				
			})

			removeItemButtonContainer.append(removeItemBtn);
			cartItemContainer.append(cartItemImgContainer, titleContainer, priceContainer,  controls,  removeItemButtonContainer)

			return cartItemContainer
}


function completePurchase(cart) {
	
	let totalPrice = 0
	cart.forEach((cartItem) => {
		totalPrice += cartItem.product.price * cartItem.quantity
		console.log(cart)
	});
	
	let checkoutAndPriceContainer = document.getElementsByClassName('priceAndCheckout')[0]
	checkoutAndPriceContainer.innerHTML = ""

	
	let priceContainer = document.createElement('div')
	priceContainer.classList.add('priceContainer')
	priceContainer.innerText = 'Totalt pris:' + ' ' + totalPrice + ' kr'
	
	let checkoutAndPrice = document.createElement('div')
	checkoutAndPrice.classList.add('checkoutSection')

	let checkBox = document.createElement('i')
	checkBox.className = 'fas fa-check'
	checkBox.classList.add('checkBox')

	
	let checkout = document.createElement('div')
	checkout.classList.add('checkoutBtn')
	checkout.innerText = 'Slutför ditt köp'
	checkout.addEventListener('click', () => {
		alert('Tack för ditt köp')
		localStorage.removeItem('cart')
		window.location = 'index.html'
	})
	
		checkoutAndPrice.append(checkBox, checkout)
		checkoutAndPriceContainer.append(priceContainer, checkoutAndPrice)

}

   







/* function incrementCart(ev) {
	ev.preventDefault();
	let title = parseInt(ev.target.getAttribute('data-id'));
	cart.increase(title, 1); //................
	let controls = ev.target.parentElement;
	let qty = controls.querySelector('span:nth-child(2)');
	let item = cart.find(title)
	if(item){
		qty.textContent = item.qty;
	}else{
		document.getElementsByClassName('cart').removeChild(controls.parentElement);
	}
}


function decrementCart(ev) {
	ev.preventDefault();
	let title = parseInt(ev.target.getAttribute('data-id'));
	cart.reduce(title, 1); //................
	let controls = ev.target.parentElement;
	let qty = controls.querySelector('span:nth-child(2)');
	let item = cart.find(title)
	if(item){
		qty.textContent = item.qty;
	}else{
		document.getElementsByClassName('cart').removeChild(controls.parentElement);
	}
}
 */

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


function removeCartItem(cartItem) {

	let cart = JSON.parse(localStorage.getItem('cart'))
	for (let i = 0; i < cart.length; i++) {

		if (cartItem.product.title == cart[i].product.title) {
			cart.splice(i, 1)
		}
	}

		cart = JSON.stringify(cart)
		localStorage.setItem('cart', cart)

		getCartContent()		
}


	/* if (cartContentsFromJSON) {
		cart.contents = JSON.parse(cartContentsFromJSON);
	} else{
	cart.contents = [
		{title: 'Buns', description: 'Sweet fruit', image: 'apple', price: 10},
		{title: 'Buts', description: 'Sweet fruit', image: 'apple', price: 100},
		{title: 'Cheek', description: 'Sweet fruit', image: 'apple', price: 1000}
	];
	cart.sync()
	}
	},
	async sync(){
	let _cart = JSON.stringify(cart.contents);
	await localStorage.setItem(cart.key, _cart)
	},
	find(title) {
	let match = cart.contents.filter(item=>{
		if(item.title == title)
		console.log('found')
		return true;
	});
	if(match && match[0])
	return match[0];
	},
	add(title) {
	if(cart.find(title)) {
		cart.increase(title, 1);
	}else{
		let arr = products.filter(product=>{
			if(product.title == title) {
				return true
			}
		});
		if(arr && arr[0]) {
			let obj = {
				title: arr[0].title,
				image: arr[0].image,
				qty: 1,
				price: arr[0].price
			};
			cart.contents.push(obj);
			console.log('added')
			cart.sync();
		}else{ 
			console.error('Invalid product');
		}
	}
	},
	increase(title, qty=1){
	cart.contents = cart.contents.map(item=>{
		if (item.title === title) 
		item.qty = item.qty + qty;
		console.log('increase')
		return item;
	});
	cart.sync()
	},
	reduce(title, qty=1){
	cart.contents = cart.contents.map(item=>{
		if (item.title === title)
		item.qty = item.qty + qty;
		console.log('reduce')
		return item;
	})
	cart.contents.forEach(async, item => {
		if(item.title === title === 0)
		cart.remove(title);
	});
	cart.sync()
	},
	remove(title){
	cart.contents = cart.contents.filter(item=>{
		if(item.title !== title)
		console.log('remove')
		return true
	})
	cart.sync()
	},
	empty(){
	cart.contents = [];
	console.log('empty')
	cart.sync()
	},
	/* sort(field = 'title'){
	let sorted = cart.contents.sort((a, b)=>{
		if(a[field] > b[field]){
			return 1;
		}else if(a[field] < b[field]){
			return -1;
		}else{
			return 0;
		}
	});
	return sorted;
	}   
	} */