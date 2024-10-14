
async function fetchAllCars(search = "", sort = "model") {
    try {
        const response = await fetch(`http://localhost:8082/api/cars?searchTerm=${search}&sortField=${sort}`);
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to fetch cars');
        }
        const cars = await response.json();
        console.log(cars);
        displayCars(cars);
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function createCar(car) {
    try {
        const response = await fetch('http://localhost:8082/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to create car');
        }

        const createdCar = await response.json()
        console.log("CREATED CAR: ", createdCar);
        return createdCar;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function editCar(carId) {
    console.log("car id: ", carId);
    window.location.href = `edit.html?carId=${encodeURIComponent(carId)}`;
}

function displayCars(carList) {
    const carTableBody = document.getElementById('car-table-body');
    carTableBody.innerHTML = '';

    if (!Array.isArray(carList)) {
        console.error("carList is not an array:", carList);
        return;
    }

    carList.forEach(car => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${car.model}</td>
            <td>$${car.price.toLocaleString()}</td>
            <td>${car.year}</td>
            <td>${car.country}</td>
            <td>
                <button onclick="editCar(${car.id})">Edit</button>
            </td>
        `;

        const editButton = row.querySelector('button');
        editButton.addEventListener('click', () => {
            console.log("Edit button clicked for carId:", car.id);
            editCar(car.id);
        });

        carTableBody.appendChild(row);
    });

    document.getElementById('total-cars').textContent = carList.length;
}

document.getElementById('search').addEventListener('input', async (e) => {
    const searchText = e.target.value.toLowerCase();
    await fetchAllCars(searchText);
});

document.getElementById('sort-by-model').addEventListener('click', async (e) => {
    const searchText = e.target.value.toLowerCase();
    await fetchAllCars(searchText, 'model');
});

document.getElementById('sort-by-price').addEventListener('click', async (e) => {
    const searchText = e.target.value.toLowerCase();
    await fetchAllCars(searchText, 'price');
});

document.getElementById('sort-by-year').addEventListener('click', async (e) => {
    const searchText = e.target.value.toLowerCase();
    await fetchAllCars(searchText, 'year');
});

document.getElementById('sort-by-country').addEventListener('click', async (e) => {
    const searchText = e.target.value.toLowerCase();
    await fetchAllCars(searchText, 'country');
});

document.getElementById('create-car-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const newCar = {
        model: document.getElementById('model').value,
        price: parseFloat(document.getElementById('price').value),
        year: parseInt(document.getElementById('year').value),
        country: document.getElementById('country').value,
    };

    const createdCar = await createCar(newCar);

    if (createdCar) {
        await fetchAllCars();
    }
});
// Fetch all cars on page load
fetchAllCars();