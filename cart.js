document.addEventListener("DOMContentLoaded", function() {
    loadCart();
});

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTable = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartTable.innerHTML = "";
    let total = 0;

    cartItems.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${item.imageUrl}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeItem('${item.name}')"> Remove</button></td>
        `;

        cartTable.appendChild(row);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeItem(name) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems = cartItems.filter(item => item.name !== name);

    localStorage.setItem("cart", JSON.stringify(cartItems));
    loadCart();
}


function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

function orderNow() {
    window.location.href = "orderForm.html";
}
