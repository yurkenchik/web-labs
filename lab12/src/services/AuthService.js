import $AUTHORIZED_API from "../utils/AxiosAuthInstance";

export class AuthService {

    async registration(registrationDto) {
        try {
            const response = await $AUTHORIZED_API.post('/api/auth/registration', registrationDto);
            localStorage.setItem("authToken", response.data.token);
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            return;
        }
    }

    async login(loginDto) {
        try {
            const response = await $AUTHORIZED_API.post('/api/auth/login', loginDto);
            localStorage.setItem("authToken", response.data.token);
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            alert(errorMessage);
            return;
        }
    }

    async logout() {
        try {
            const response = await $AUTHORIZED_API.delete('/api/auth/logout');
            localStorage.removeItem("authToken");
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            alert(errorMessage);
            return;
        }
    }
}