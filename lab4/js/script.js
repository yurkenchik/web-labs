let cars = JSON.parse(localStorage.getItem('cars')) || [];

function displayCars(carList) {
    const carTableBody = document.getElementById('car-table-body');
    carTableBody.innerHTML = '';

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
        carTableBody.appendChild(row);
    });

    document.getElementById('total-cars').textContent = carList.length;
}

window.editCar = (carId) => {
    window.location.href = `edit.html?carId=${carId}`;
};

document.getElementById('sort-by-model').addEventListener('click', () => {
    const sortedCars = [...cars].sort((a, b) => a.model.localeCompare(b.model));
    displayCars(sortedCars);
});

document.getElementById('sort-by-price').addEventListener('click', () => {
    const sortedCars = [...cars].sort((a, b) => a.price - b.price);
    displayCars(sortedCars);
});

document.getElementById('sort-by-year').addEventListener('click', () => {
    const sortedCars = [...cars].sort((a, b) => a.year - b.year);
    displayCars(sortedCars);
});

document.getElementById('sort-by-country').addEventListener('click', () => {
    const sortedCars = [...cars].sort((a, b) => a.country.localeCompare(b.country));
    displayCars(sortedCars);
});

document.getElementById('search').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredCars = cars.filter(car =>
        car.model.toLowerCase().includes(searchText) ||
        car.price.toString().includes(searchText) ||
        car.year.toString().includes(searchText) ||
        car.country.toLowerCase().includes(searchText)
    );
    displayCars(filteredCars);
});

document.getElementById('create-car-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const newCar = {
        id: cars.length + 1,
        model: document.getElementById('model').value,
        price: parseFloat(document.getElementById('price').value),
        year: parseInt(document.getElementById('year').value),
        country: document.getElementById('country').value,
    };

    const existingCar = cars.find(car => car.model === newCar.model);
    if (existingCar) {
        alert("Car exists!");
        return null;
    }

    cars.push(newCar);
    localStorage.setItem('cars', JSON.stringify(cars));
    displayCars(cars);
    document.getElementById('create-car-form').reset();
});

displayCars(cars);
