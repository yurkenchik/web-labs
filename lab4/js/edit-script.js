
document.addEventListener('DOMContentLoaded', function() {

    const editForm = document.getElementById('editForm');
    let items = [];
    let currentItemIndex = -1;

    if (localStorage.getItem('items')) {
        items = JSON.parse(localStorage.getItem('items'));
    } else {
        console.error('No items found in localStorage');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    currentItemIndex = parseInt(urlParams.get('index'), 10);

    if (isNaN(currentItemIndex) || currentItemIndex < 0 || currentItemIndex >= items.length) {
        console.error('Invalid item index');
        return;
    }
    const item = items[currentItemIndex];

    document.getElementById('editItemName').value = item.name;
    document.getElementById('editItemDescription').value = item.description;
    document.getElementById('editItemCategory').value = item.category;
    document.getElementById('editItemPrice').value = item.price;

    editForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const editedName = document.getElementById('editItemName').value.trim();
        const editedDescription = document.getElementById('editItemDescription').value.trim();
        const editedCategory = document.getElementById('editItemCategory').value.trim();
        const editedPrice = document.getElementById('editItemPrice').value.trim();

        if (!editedName || !editedDescription || !editedCategory || !editedPrice) {
            console.error('All fields are required');
            alert('All fields are required');
            return;
        }

        const priceNumber = parseFloat(editedPrice);
        if (isNaN(priceNumber) || priceNumber < 0) {
            console.error('Price must be a valid positive number');
            alert('Price must be a valid positive number');
            return;
        }

        if (editedName && editedDescription && editedCategory && editedPrice) {
            items[currentItemIndex] = {
                name: editedName,
                description: editedDescription,
                category: editedCategory,
                price: priceNumber.toFixed(2)
            };

            localStorage.setItem('items', JSON.stringify(items));
            window.location.href = 'index.html';
        } else {
            console.error('All fields are required');
        }
    });
});
