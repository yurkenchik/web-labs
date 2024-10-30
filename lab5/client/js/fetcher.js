
export async function fetchAllCars(search = "", sort = "model") {
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

export async function fetchCarById(carId) {
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

export async function createCar(car) {
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

export async function updateCar(carId, updatedCar) {
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
