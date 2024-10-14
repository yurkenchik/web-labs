
async function fetchCarById(carId) {
    try {
        const response = await fetch(`http://localhost:8082/api/cars/${carId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch car');
        }
        return await response.json();
    } catch (error) {
        alert(error);
        return null;
    }
}

async function updateCar(carId, updatedCar) {
    try {
        const response = await fetch(`http://localhost:8082/api/cars/${carId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCar),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update car');
        }

        const updatedCarData = await response.json();
        console.log('Car updated successfully:', updatedCarData);
        window.location.href = 'index.html';
    } catch (error) {
        alert(error.message);
    }
}

async function populateForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('carId');

    if (carId) {
        const car = await fetchCarById(carId);
        if (car) {
            // Populate form with car data
            document.getElementById('model').value = car.model;
            document.getElementById('price').value = car.price;
            document.getElementById('year').value = car.year;
            document.getElementById('country').value = car.country;
        } else {
            console.error('Car not found!');
        }
    } else {
        console.error('No car ID provided in URL.');
    }
}

document.getElementById('edit-car-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('carId');

    if (!carId) {
        console.error('No car ID to update');
        return;
    }

    const updatedCar = {
        model: document.getElementById('model').value,
        price: parseFloat(document.getElementById('price').value),
        year: parseInt(document.getElementById('year').value),
        country: document.getElementById('country').value,
    };

    await updateCar(carId, updatedCar);
});

const carId = new URLSearchParams(window.location.search).get("carId");
console.log(fetchCarById(carId).then(response => console.log(response)));
populateForm();
