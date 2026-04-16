import api from "../../../services/ApiSetter";

// Employer interfaces
export interface EmployerData {
  _id?: string;
  id?: string;
  companyName: string;
  industry?: string;
  companySize?: string;
  website?: string;
  description?: string;
  location?: string;
  email?: string;
  phone?: string;
  // Legacy fields for backward compatibility
  contactEmail?: string;
  contactPhone?: string;
  logo?: string;
  isVerified?: boolean;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  // Job count for display purposes
  jobCount?: number;
}

export interface EmployerResponse {
  success: boolean;
  data?: EmployerData | EmployerData[];
  message?: string;
}

// Get all employers
export const getAllEmployers = async (): Promise<EmployerData[]> => {
  try {
    const response = await api.get(`/employers/all`);

    // Normalize data to handle both single and array responses
    if (Array.isArray(response.data.data)) {
      return response.data.data.map((employer: EmployerData) => ({
        ...employer,
        id: employer._id || employer.id,
      }));
    }

    return [];
  } catch (error: any) {
    console.error("Error fetching employers:", error);
    throw error;
  }
};

// Get employer by ID
export const getEmployerById = async (id: string): Promise<EmployerData> => {
  try {
    const response = await api.get(`/employers/${id}`);

    if (!Array.isArray(response.data.data)) {
      return {
        ...response.data.data,
        id: response.data.data?._id || response.data.data?.id,
      } as EmployerData;
    }

    throw new Error("Invalid response format");
  } catch (error: any) {
    console.error("Error fetching employer:", error);
    throw error;
  }
};

// Create a new employer
export const createEmployer = async (
  employerData: EmployerData,
): Promise<EmployerData> => {
  try {
    const response = await api.post(`/employers`, employerData);

    if (!Array.isArray(response.data.data)) {
      return {
        ...response.data.data,
        id: response.data.data?._id || response.data.data?.id,
      } as EmployerData;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error creating employer:", error);
    throw error;
  }
};

// Update employer
export const updateEmployer = async (
  id: string,
  employerData: Partial<EmployerData>,
): Promise<EmployerData> => {
  try {
    const response = await api.put(`/employers/${id}`, employerData);

    if (!Array.isArray(response.data.data)) {
      return {
        ...response.data.data,
        id: response.data.data?._id || response.data.data?.id,
      } as EmployerData;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error updating employer:", error);
    throw error;
  }
};

// Delete employer
export const deleteEmployer = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/employers/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting employer:", error);
    throw error;
  }
};

// Get employer by userId (for dashboard)
export const getEmployerByUserId = async (
  userId: string,
): Promise<EmployerData | null> => {
  try {
    const response = await api.get(`/employers?userId=${userId}`);

    if (Array.isArray(response.data.data) && response.data.data.length > 0) {
      const employer = response.data.data[0];
      return {
        ...employer,
        id: employer._id || employer.id,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching employer by userId:", error);
    return null;
  }
};

// Get top hiring companies
export const getTopHiringCompanies = async () => {
  try {
    const response = await api.get(`/employers/top-hiring`);

    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching top hiring companies:", error);
    throw error;
  }
};

// Get employer statistics
export const getEmployerStats = async () => {
  try {
    const response = await api.get(`/employers/stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employer stats:", error);
    throw error;
  }
};
