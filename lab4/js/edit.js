// Assuming you have the structure set up to load the cars
let cars = JSON.parse(localStorage.getItem('cars')) || [];

// Get the car ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const carId = parseInt(urlParams.get('carId'));

// Load the car data
const car = cars.find(c => c.id === carId);
if (car) {
    document.getElementById('model').value = car.model;
    document.getElementById('price').value = car.price;
    document.getElementById('year').value = car.year;
    document.getElementById('country').value = car.country;
}

// Handle Update Form Submission
document.getElementById('edit-car-form').addEventListener('submit', (e) => {
    e.preventDefault();

    if (car) {
        car.model = document.getElementById('model').value;
        car.price = parseFloat(document.getElementById('price').value);
        car.year = parseInt(document.getElementById('year').value);
        car.country = document.getElementById('country').value;

        // Update localStorage
        localStorage.setItem('cars', JSON.stringify(cars));

        // Redirect back to the main page
        window.location.href = 'index.html';
    }
});
