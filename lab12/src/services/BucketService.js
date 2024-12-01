import $AUTHORIZED_API from "../utils/AxiosAuthInstance";

export class BucketService {
    async addGoodToBucket(addGoodToBucketDto) {
        try {
            const response = await $AUTHORIZED_API.post('/api/bucket', addGoodToBucketDto);
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            alert(errorMessage);
            return;
        }
    }

    async getBuckets() {
        try {
            const response = await $AUTHORIZED_API.get('/api/bucket');
            return response.data;
        } catch (error) {
            console.error("Error fetching bucket items:", error);
            throw error;
        }
    }

    async getBucketById(bucketItemId) {
        try {
            const response = await $AUTHORIZED_API.get(`/api/bucket/${bucketItemId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching bucket item with ID ${bucketItemId}:`, error);
            throw error;
        }
    }

    async removeGoodFromBucket(bucketItemId) {
        try {
            const response = await $AUTHORIZED_API.patch(`/api/bucket/${bucketItemId}`);
            return response.data;
        } catch (error) {
            console.error(`Error removing good from bucket with ID ${bucketItemId}:`, error);
            alert(error.message);
            throw error;
        }
    }

    async deleteBucketItem(bucketItemId) {
        try {
            await $AUTHORIZED_API.delete(`/api/bucket/${bucketItemId}`);
        } catch (error) {
            console.error(`Error deleting bucket item with ID ${bucketItemId}:`, error);
            alert(error.message);
            throw error;
        }
    }
}
