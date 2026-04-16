import api from "../../../services/ApiSetter";

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationHistory {
  id: string;
  degree: string;
  institution: string;
  year: string;
}
export type UserRole = "CANDIDATE" | "EMPLOYER" | "ADMIN" | "GUEST";
export interface UserModel {
  _id?: string;
  name: string;
  email: string;
  contactPhone: string;
  password: string;
  avatar?: string;
  role: UserRole;
  professionalTitle?: string;
  location?: string;
  experience?: string;
  education?: string;
  skills: string[];
  summary?: string;
  workExperience: WorkExperience[];
  educationHistory: EducationHistory[];
  resume?: string;
  initials?: string;
  isActive: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  employerId?: string;
}
export const CandidateService = {
  getAllUsers: async (): Promise<UserModel[]> => {
    const response = await api.get(`/auth`);
    return response.data.data;
  },
  getUser: async (id: string): Promise<UserModel> => {
    console.log("CandidateService.getUser called with id:", id);
    try {
      if (!id) {
        throw new Error("User ID is required");
      }
      const endpoint = `/auth/${id}`;
      console.log("Calling endpoint:", endpoint);

      const response = await api.get(endpoint);
      console.log("CandidateService.getUser full response:", response);
      console.log("response.data structure:", response.data);
      console.log("response.status:", response.status);

      // Handle both { data: UserModel } and UserModel response formats
      let userData = response.data;

      // If response.data.data exists and is an object (not an array), use it
      if (
        response.data &&
        typeof response.data === 'object' &&
        response.data.data &&
        typeof response.data.data === 'object' &&
        !Array.isArray(response.data.data)
      ) {
        userData = response.data.data;
        console.log("Using response.data.data");
      } else if (response.data && typeof response.data === 'object') {
        userData = response.data;
        console.log("Using response.data directly");
      }

      console.log("Final userData returned:", userData);

      if (!userData || !userData.email) {
        throw new Error("Invalid user data received - missing email field");
      }

      return userData as UserModel;
    } catch (error) {
      console.error("Error in getUser:", error);
      throw error;
    }
  },
  updateUser: async (id: string, data: UserModel): Promise<UserModel> => {
    const response = await api.put(`/auth/${id}`, data);
    return response.data;
  },
  getProfile: async (): Promise<UserModel> => {
    const response = await api.get(`/auth/profile`);
    return response.data;
  },
  createUser: async (data: {
    FirstName: string;
    LastName: string;
    Age: string;
    PhoneNumber: string;
    Email: string;
    password: string;
    UserType: UserRole;
  }): Promise<UserModel> => {
    const response = await api.post(`/auth/register`, data);
    return response.data;
  },
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/auth/${id}`);
  },
  ChangePassword: async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    await api.post(`/auth/change-password`, {
      currentPassword,
      newPassword,
    });
  },
  LoginUser: async (UserData: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: UserModel }> => {
    const response = await api.post(`/auth/login`, UserData);
    return response.data;
  },
  getAdminStats: async (): Promise<any> => {
    const response = await api.get(`/admin/stats`);
    return response.data;
  },
};
