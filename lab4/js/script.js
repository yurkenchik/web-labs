
document.addEventListener('DOMContentLoaded', function() {

    const itemList = document.getElementById('itemList');
    const createForm = document.getElementById('createForm');
    const editForm = document.getElementById('editForm');

    let items = [];
    let currentItemIndex = -1;

    if (localStorage.getItem('items')) {
        items = JSON.parse(localStorage.getItem('items'));
        renderItems();
    }

    if (createForm) {
        createForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const itemName = document.getElementById('itemName').value;
            const itemDescription = document.getElementById('itemDescription').value;
            const itemCategory = document.getElementById('itemCategory').value;
            const itemPrice = document.getElementById('itemPrice').value;

            const priceNumber = parseFloat(itemPrice);
            if (!itemName || !itemDescription || !itemCategory || isNaN(priceNumber) || priceNumber < 0) {
                alert('All fields are required, and price must be a valid positive number');
                return;
            }

            items.push({ name: itemName, description: itemDescription, category: itemCategory, price: priceNumber.toFixed(2) });
            localStorage.setItem('items', JSON.stringify(items));
            renderItems();


            if (itemName.trim() && itemDescription.trim() && itemCategory.trim() && itemPrice.trim()) {
                items.push({ name: itemName, description: itemDescription, category: itemCategory, price: itemPrice });
                localStorage.setItem('items', JSON.stringify(items));
                renderItems();
            }

            createForm.reset();
        });
    }

    if (editForm) {
        const urlParams = new URLSearchParams(window.location.search);
        currentItemIndex = urlParams.get('index');
        if (currentItemIndex !== null) {
            const item = items[currentItemIndex];
            document.getElementById('editItemName').value = item.name;
            document.getElementById('editItemDescription').value = item.description;
            document.getElementById('editItemCategory').value = item.category;
            document.getElementById('editItemPrice').value = item.price;
        }

        editForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const editedName = document.getElementById('editItemName').value;
            const editedDescription = document.getElementById('editItemDescription').value;
            const editedCategory = document.getElementById('editItemCategory').value;
            const editedPrice = document.getElementById('editItemPrice').value;

            if (editedName.trim() && editedDescription.trim() && editedCategory.trim() && editedPrice.trim()) {
                items[currentItemIndex] = { name: editedName, description: editedDescription, category: editedCategory, price: editedPrice };
                localStorage.setItem('items', JSON.stringify(items));
                window.location.href = 'index.html';
            }
        });
    }

    function renderItems() {
        itemList.innerHTML = '';

        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${item.name}</strong><br>
                            <em>${item.description}</em><br>
                            Category: ${item.category} | Price: $${item.price}`;

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', function() {
                window.location.href = `edit.html?index=${index}`;
            });

            li.appendChild(editBtn);
            itemList.appendChild(li);
        });
    }
});
