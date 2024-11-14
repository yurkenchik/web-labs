import $API from "../utils/AxiosInstance";

export class CarService {

    async getCars(filterOptions) {
        try {
            const response = await $API.get('/api/cars', { params: filterOptions });
            return response.data;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error;
        }
    }

    async getCarById(carId) {
        try {
            const response = await $API.get(`/api/cars/${carId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching car with ID ${carId}:`, error);
            throw error;
        }
    }

    async createCar(carData) {
        try {
            const response = await $API.post('/api/cars', carData);
            return response.data;
        } catch (error) {
            console.error("Error creating car:", error);
            throw error;
        }
    }

    async updateCar(carId, updateData) {
        try {
            const response = await $API.patch(`/api/cars/${carId}`, updateData);
            return response.data;
        } catch (error) {
            console.error(`Error updating car with ID ${carId}:`, error);
            throw error;
        }
    }
}

