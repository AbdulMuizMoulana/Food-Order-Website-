function addToCart(itemName, itemPrice, itemQty,imageUrl) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity += parseInt(itemQty);
    } else {
        // Add the new item to the cart
        cart.push({
            imageUrl:imageUrl,
            name: itemName,
            price: itemPrice,
            quantity: parseInt(itemQty)
        });
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // console.log(`Added ${itemQty} of ${itemName} at $${itemPrice} each to the cart.`);
    alert(itemName + " has been added to the cart!");
}

function like(itemName) {
    let button = document.querySelector(`button[onclick="like('${itemName}')"] i`);
    if (button.classList.contains('fa-light')) {
        button.classList.remove('fa-light');
        button.classList.add('fa-solid');
    } else {
        button.classList.remove('fa-solid');
        button.classList.add('fa-light');
    }
    console.log(`Liked item: ${itemName}`);
}





