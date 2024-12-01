import $AUTHORIZED_API from "../utils/AxiosAuthInstance";

export class UserService {
    async getUser() {
        try {
            const response = await $AUTHORIZED_API.get('/api/users/me');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}