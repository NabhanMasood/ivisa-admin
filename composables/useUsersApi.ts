import { useApi } from "./useApi";

interface Permission {
  countries: boolean;
  visaProducts: boolean;
  nationalities: boolean;
  embassies: boolean;
  coupons: boolean;
  additionalInfo: boolean;
  customers: boolean;
  applications: boolean;
  finances: boolean;
}

interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  permissions: Permission;
  createdAt: string;
  updatedAt: string;
}

interface CreateUserData {
  email: string;
  password: string;
  permissions: Permission;
}

interface UpdateUserData {
  password?: string;
  permissions?: Permission;
}

export const useUsersApi = () => {
  const api = useApi();

  const getAllUsers = async () => {
    try {
      const response = await api.get("/auth/subadmins");
      // The axios response is in response.data
      const backendResponse = response.data;
      return {
        success: backendResponse.status === true,
        data: backendResponse.subadmins as User[],
      };
    } catch (error: any) {
      console.error("Error fetching users:", error);

      // Extract error message from axios error response
      let errorMessage = "Failed to fetch users";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage,
        data: [],
      };
    }
  };

  const getUserById = async (id: number) => {
    try {
      const response = await api.get(`/auth/subadmins/${id}`);
      // The axios response is in response.data
      const backendResponse = response.data;
      return {
        success: backendResponse.status === true,
        data: backendResponse.subadmin as User,
      };
    } catch (error: any) {
      console.error("Error fetching user:", error);

      let errorMessage = "Failed to fetch user";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    }
  };

  const createUser = async (userData: CreateUserData) => {
    try {
      const response = await api.post("/auth/subadmins", userData);
      // The axios response is in response.data
      const backendResponse = response.data;
      console.log('Backend response:', backendResponse);
      return {
        success: backendResponse.status === true,
        data: backendResponse.subadmin as User,
        message: backendResponse.message || "Sub-admin created successfully",
      };
    } catch (error: any) {
      console.error("Error creating user:", error);

      // Extract error message from axios error response
      let errorMessage = "Failed to create user";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    }
  };

  const updateUser = async (id: number, userData: UpdateUserData) => {
    try {
      const response = await api.put(`/auth/subadmins/${id}`, userData);
      // The axios response is in response.data
      const backendResponse = response.data;
      return {
        success: backendResponse.status === true,
        data: backendResponse.subadmin as User,
        message: backendResponse.message || "Sub-admin updated successfully",
      };
    } catch (error: any) {
      console.error("Error updating user:", error);

      // Extract error message from axios error response
      let errorMessage = "Failed to update user";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await api.delete(`/auth/subadmins/${id}`);
      // The axios response is in response.data
      const backendResponse = response.data;
      return {
        success: backendResponse.status === true,
        message: backendResponse.message || "Sub-admin deleted successfully",
      };
    } catch (error: any) {
      console.error("Error deleting user:", error);

      let errorMessage = "Failed to delete user";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  return {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
};

