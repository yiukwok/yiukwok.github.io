// 商品資料庫 - 使用物件儲存所有商品資訊
const products = {
    1: {id: 1, new:"0",type:"cu",fileN:"./logos/products/cupcake/vanillacupcake.jpg",name:"Vanilla Cupcake",price: 60},
    2: {id: 2, new:"0",type:"ma",fileN:"./logos/products/macaron/pastel-macarons-new.jpg",name:"Pastel Macaron",price: 50},
    3: {id: 3, new:"0",type:"ma",fileN:"./logos/products/macaron/Simply-Recipes-Chocolate-Macarons-Lead-3-07d3c26364604ddbb3fd3a40b6435a50.jpg",name:"Chocolate Macaron",price: 180},
    4: {id: 4, new:"0",type:"ti",fileN:"./logos/products/tiramisu/berries-food-strawberry-cake-wallpaper-preview.jpg",name:"Strawberry Tiramisu",price: 80},
    5: {id: 5, new:"0",type:"cu",fileN:"./logos/products/pie/applepie.jpg",name:"Apple Pie",price: 60}, 
    6: {id: 6, new:"0",type:"cu",fileN:"./logos/products/cake/chocolate-cheesecake-square.jpg",name:"Chocolate Cheese Cake",price: 110},
    7: {id: 7, new:"0",type:"cu",fileN:"./logos/products/cake/cheeseCake.jpg",name:"Biscoff Cheese Cake",price: 90},
    8: {id: 8, new:"0",type:"pu",fileN:"./logos/products/puddingJelly/sugar-free-mango-jelly-with-agar-agar-recipe-74485da835609df4e57f754d4132e124.jpg",name:"Pudding Jelly",price: 60},                                
    9: {id: 9, new:"1",type:"ti",fileN:"./logos/products/tiramisu/tiramisuforCoffeelovers.jpg",name:"Coffee Tiramisu",price: 40},
    10:{id: 10,new:"1",type:"pu",fileN:"./logos/products/pie/creamApplepie.jpg",name:"Vanilla Pie",price: 50},
    11:{id: 11,new:"1",type:"ma",fileN:"./logos/products/macaron/salted-caramel-macarons-14-e1597125020620.jpg",name:"Salted Caramel Macaron",price: 100},
    12:{id: 12,new:"1",type:"cu",fileN:"./logos/products/cupcake/cinnamon-cupcakes-with-cinnamon-buttercream-8.jpg",name:"Cinnamon Cupcake",price: 30},
};


function myfunctionp1(){
    window.open("https://www.ulifestyle.com.hk/");
  }

function myfunctionp2(){
    window.open("https://sachascakes.com/?srsltid=AfmBOorZaFO5d6tX5Rawssoy5WBBKW1Sj6izrPp9pauFNfajc6kV3S0S");
}

function myfunctionp3() {
    window.open("https://www.timeout.com.hk/hong-kong/hk/%E9%A4%90%E5%BB%B3/gelato-messina-hong-kong");
}

function myfunctionp4() {
    window.open("https://www.lecremedelacrumb.com/best-ever-creamy-sweet-macaroni-salad/");
}

function myfunctionp5() {
    window.open("https://www.openrice.com/en/hongkong/r-anna-dessert-jordan-hong-kong-style-dessert-r503590");
}

function myfunctionp6(){
    window.open("https://www.twopinkpeonies.com/carrabbas-dessert-rosa-cake/");
}

  function myfunctionA(){
    location.href = "./shop1.html";
  }

  function myfunctionT(){
    location.href="./Tiramisu.html";
  }

  function myfunctionM(){
    location.href="./Macaron.html";
  }
  
  function myfunctionC(){
    location.href="./cupcake.html";
  }

  


// 初始化購物車
function initializeCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// 獲取購物車內容
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// 更新購物車
function updateCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// 更新購物車商品數量顯示
function updateCartCount() {
    if (document.getElementById('cart-count')) {
        const cart = getCart();
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalItems;
    }
}

// 加入商品到購物車
function addToCart(productId, quantity) {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        // 如果商品已存在，增加數量
        cart[existingItemIndex].quantity += quantity;
    } else {
        // 否則添加新商品
        const product = products[productId];
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            fileN: product.fileN
        });
    }
    
    updateCart(cart);
    //alert('已加入購物車！');
}

// 從購物車移除商品
function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    updateCart(cart);
    displayCartItems(); // 重新顯示購物車內容
    updateCartCount();
}

// 顯示購物車內容 (在 cart.html 使用)
function displayCartItems() {
    if (document.getElementById('cart-items')) {
        const cartItemsContainer = document.getElementById('cart-items');
        const cart = getCart();
        
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 30px;">Your cart is empty</td></tr>';
            updateCartTotals();
            return;
        }
        
        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><button class="remove-btn" data-id="${item.id}"><i class="fa fa-trash"></i></button></td>
                <td><img src="${item.fileN}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" min="1" value="${item.quantity}" class="item-quantity" data-id="${item.id}"></td>
                <td>$${subtotal.toFixed(2)}</td>
            `;

            cartItemsContainer.appendChild(row);
        });
        
        // Add event listeners
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                removeFromCart(productId);
                updateCartTotals();
            });
        });
        
        // Add quantity change listeners
        document.querySelectorAll('.item-quantity').forEach(input => {
            input.addEventListener('change', function() {
                const productId = parseInt(this.dataset.id);
                const newQuantity = parseInt(this.value);
                updateCartQuantity(productId, newQuantity);

                //update the individual item's total
                const item = getCart().find(item => item.id === productId);
                if (item){
                    const subtotal = item.price * newQuantity;
                    this.parentElement.nextElementSibling.textContent = `$${subtotal.toFixed(2)}`;
                }

                updateCartTotals();
                // // update subtotal of each item.
                // const sproduct = products[string(productId)];
                // const unitprice = Number(sproduct["price"]);
                // const subTtl = unitprice * newQuantity;
                // this.parentElement.nextElementSibling.innerHTML = `$${subTtl.toFixed(2)}`;
            });
        });
        
        updateCartTotals();
    }
}

// Add this new function to script4.js
function updateCartQuantity(productId, newQuantity) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        updateCart(cart);
    }
}

// 初始化
initializeCart();

// 為商品列表頁添加事件監聽
// if (document.querySelector('.add-to-cart')) {
//     document.querySelectorAll('.add-to-cart').forEach(button => {
//         button.addEventListener('click', function() {
//             const productElement = this.closest('.product');
//             const productId = parseInt(productElement.dataset.id);
//             const quantity = parseInt(productElement.querySelector('.quantity').value);
//             addToCart(productId, quantity);
//         });
//     });
    
//     // 初始化購物車數量顯示
//     updateCartCount();
// }


/*
document.addEventListener('DOMContentLoaded', function() {
    const productListContainer = document.getElementById('product-list');
    
    // Generate product cards for each product in the products object
    for (const [id, product] of Object.entries(products)) {
        const productCard = document.createElement('div');
        productCard.className = 'product';
        productCard.dataset.id = id;
        
        productCard.innerHTML = `
        <div class="product-card">
            <div class="product-image-container">
                <img class="img-fluid product-image" src="${product.fileN}" alt="${product.name}">
                ${product.new === "1" ? '<span class="new-badge">NEW</span>' : ''}
            </div>
            <div class="product-info">
                <h5 class="product-name">${product.name}</h5>
                <h4 class="product-price">$${product.price}</h4>
                <div class="product-actions">
                    <input type="number" min="1" value="1" class="quantity form-control">
                    <button class="btn btn-primary add-to-cart">Add to cart</button>
                </div>
            </div>
        </div>
    `;
            
        // productCard.innerHTML = `
        //     <div class="product text-center col-lg-3 col-md-4 col-12">
        //     <img class="img-fluid mb-3" src="${product.fileN}" style="width:350p;height:370px" alt="${product.name}">
        //     <h5>${product.name} ${product.new === "1" ? '<span class="new-badge" style="display: inline-block;">NEW</span>' : ''}</h5>
        //     <h4>價格: $<span class="price">${product.price}</span></h4>
        //     <input type="number" min="1" value="1" class="quantity">
        //     <button class="add-to-cart">加入購物車</button>
        //     </div>
        // `;
        

        //   productCard.innerHTML = `
        // <div class="product text-center col-lg-3 col-md-4 col-12">
        // <img class="img-fluid mb-3" src="${product.fileN}" style="width:350px;height:370px" alt="">
        // <h5 class="p-name">${product.name}</h5>
        //  <h4 class="p-price">${product.price}</h4>

        // <input type="number" min="1" value="1" class="quantity">
        // <button class="add-to-cart">加入購物車</button>
        // </div>`;


        productListContainer.appendChild(productCard);
    }
    
    // Add event listeners for add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product');
            const productId = parseInt(productElement.dataset.id);
            const quantity = parseInt(productElement.querySelector('.quantity').value);
            addToCart(productId, quantity);
        });
    });
    
    // Initialize cart count
    updateCartCount();
});



document.addEventListener('DOMContentLoaded', function() {
    const productListContainer = document.getElementById('cupcake-list');
    
    // Generate product cards for each product in the products object
    for (const [id, product] of Object.entries(products)) {
        if(product.type === "cu"){
            const productCard = document.createElement('div');
            productCard.className = 'product';
            productCard.dataset.id = id;
            
            productCard.innerHTML = `
            <div class="product-card">
                <div class="product-image-container">
                    <img class="img-fluid product-image" src="${product.fileN}" alt="${product.name}">
                    ${product.new === "1" ? '<span class="new-badge">NEW</span>' : ''}
                </div>
                <div class="product-info">
                    <h5 class="product-name">${product.name}</h5>
                    <h4 class="product-price">$${product.price}</h4>
                    <div class="product-actions">
                        <input type="number" min="1" value="1" class="quantity form-control">
                        <button class="btn btn-primary add-to-cart">Add to cart</button>
                    </div>
                </div>
            </div>
        `;
            productListContainer.appendChild(productCard);
        }
    }
    
    // Add event listeners for add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product');
            const productId = parseInt(productElement.dataset.id);
            const quantity = parseInt(productElement.querySelector('.quantity').value);
            addToCart(productId, quantity);
        });
    });
    
    // Initialize cart count
    updateCartCount();
});
*/

// Generic function to display products based on type
function displayProducts(containerId, productType = null) {
    const productListContainer = document.getElementById(containerId);
    if (!productListContainer) return;

    // Clear existing content
    productListContainer.innerHTML = '';

    // Filter products if a type is specified
    const productsToDisplay = productType 
        ? Object.values(products).filter(p => p.type === productType)
        : Object.values(products);

    // Generate product cards
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product';
        productCard.dataset.id = product.id;
        
        productCard.innerHTML = `
        <div class="product-card">
            <div class="product-image-container">
                <img class="img-fluid product-image" src="${product.fileN}" alt="${product.name}">
                ${product.new === "1" ? '<span class="new-badge">NEW</span>' : ''}
            </div>
            <div class="product-info">
                <h5 class="product-name">${product.name}</h5>
                <h4 class="product-price">$${product.price}</h4>
                <div class="product-actions">
                    <input type="number" min="1" value="1" class="quantity form-control">
                    <button class="btn add-to-cart" style = "color:#fff">Add to cart</button>
                </div>
            </div>
        </div>
        `;

        productListContainer.appendChild(productCard);
    });

    // Add event listeners for add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product');
            const productId = parseInt(productElement.dataset.id);
            const quantity = parseInt(productElement.querySelector('.quantity').value);
            addToCart(productId, quantity);
        });
    });
}


// Search product page

function displayShortProducts(containerId, productType = null) {
    const productListContainer = document.getElementById(containerId);
    if (!productListContainer) return;

    // Clear existing content
    productListContainer.innerHTML = '';

    // Filter products if a type is specified
    const productsToDisplay = productType 
        ? Object.values(products).filter(p => p.type === productType)
        : Object.values(products);

    // Generate product cards
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product';
        productCard.dataset.id = product.id;
        
        productCard.innerHTML = `
        <div class="sweets">
            <a href="${product.id}.html" class="img-item"><img src="${product.fileN}" alt="${product.name}"></a>
            <div class="s-details">
              <a href="${product.id}.html" class="img-name"><h2>${product.name}</h2></a>
              <h3>$${product.price}</h3>
            </div>
        </div>
        `;

        productListContainer.appendChild(productCard);
    });


    // Add event listeners for img-item or -name


    // document.querySelectorAll('.to-detail').forEach(button => {
    //     button.addEventListener('click', function() {
    //         const productElement = this.closest('.product');
    //         const productId = parseInt(productElement.dataset.id);
    //         const quantity = parseInt(productElement.querySelector('.quantity').value);
    //         displaySingleItem('singleitemarea');
          
    //     });
    // });
 


}





// Initialize the page based on which container exists
document.addEventListener('DOMContentLoaded', function() {
    const SignTitle = document.getElementById('Signature-title');

    if (document.getElementById('product-list')) {
        // Show all products in shop1.html
        displayProducts('product-list');
        SignTitle.textContent = "Our Selections";
    }
    
    if (document.getElementById('cupcake-list')) {
        // Show only cupcake products in cupcake.html
        displayProducts('cupcake-list', 'cu');
        SignTitle.textContent = "Cupcake";
    }
    
    if (document.getElementById('macaron-list')) {
        // Show only macaron products in Macaron.html
        displayProducts('macaron-list', 'ma');
        SignTitle.textContent = "Macaron";
    }

    if (document.getElementById('pudding-list')) {
        // Show only pudding products in Macaron.html
        displayProducts('pudding-list', 'pu');
        SignTitle.textContent = "Pudding";
    }

    if (document.getElementById('tiramisu-list')) {
        // Show only tiramisu products in Macaron.html
        displayProducts('tiramisu-list', 'ti');
        SignTitle.textContent = "Tiramisu";
    }    

    if (document.getElementById('sweet-list')) {
        // Show only for short form lists in search page
        displayShortProducts('sweet-list');
        // SignTitle.textContent = "Tiramisu";
    }    


    // Initialize cart count
    updateCartCount();
});

