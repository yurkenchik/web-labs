import $API from "../utils/AxiosInstance";

export class BucketService {
    async addGoodToBucket(addGoodToBucketDto) {
        try {
            const response = await $API.post('/api/bucket', addGoodToBucketDto);
            return response.data;
        } catch (error) {
            console.error("Error adding good to bucket:", error);
            alert(error.message);
            throw error;
        }
    }

    async getBuckets() {
        try {
            const response = await $API.get('/api/bucket');
            return response.data;
        } catch (error) {
            console.error("Error fetching bucket items:", error);
            alert(error.message);
            throw error;
        }
    }

    async getBucketById(bucketItemId) {
        try {
            const response = await $API.get(`/api/bucket/${bucketItemId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching bucket item with ID ${bucketItemId}:`, error);
            alert(error.message);
            throw error;
        }
    }

    async removeGoodFromBucket(bucketItemId) {
        try {
            const response = await $API.patch(`/api/bucket/${bucketItemId}`);
            return response.data;
        } catch (error) {
            console.error(`Error removing good from bucket with ID ${bucketItemId}:`, error);
            alert(error.message);
            throw error;
        }
    }

    async deleteBucketItem(bucketItemId) {
        try {
            await $API.delete(`/api/bucket/${bucketItemId}`);
        } catch (error) {
            console.error(`Error deleting bucket item with ID ${bucketItemId}:`, error);
            alert(error.message);
            throw error;
        }
    }
}
