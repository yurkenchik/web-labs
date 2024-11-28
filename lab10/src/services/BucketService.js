import $API from "../utils/AxiosInstance";

export class BucketService {
    async addGoodToBucket(addGoodToBucketDto) {
        try {
            const response = await $API.post('/api/bucket', addGoodToBucketDto);
            alert(`${addGoodToBucketDto.quantity} items was added to bucket`);
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            alert(errorMessage);
            throw error;
        }
    }

    async increaseBucketItemQuantity(bucketItemId) {
        try {
            const response = await $API.patch(`/api/bucket/quantity-increase/${bucketItemId}`);
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            alert(errorMessage);
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
            alert(`1 item was removed from bucket`);
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
            alert("items were deleted from bucket");
        } catch (error) {
            console.error(`Error deleting bucket item with ID ${bucketItemId}:`, error);
            alert(error.message);
            throw error;
        }
    }
}
