import api from "../../../services/ApiSetter";

// Job interfaces
export interface JobData {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  category: string;
  jobType: string;
  location: string;
  salary?: string;
  deadline: string;
  employerId: string;
  views?: number;
  applicationCount?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  logo?: string;
  logoBg?: string;
  type?: string;
  typeBg?: string;
  experience?: string;
  education?: string;
  // Additional properties used in components
  company?: string;
  tags?: string[];
  featured?: boolean;
}

export interface JobResponse {
  success: boolean;
  data?: JobData | JobData[];
  message?: string;
}

// Get all jobs
export const getAllJobs = async (): Promise<JobData[]> => {
  try {
    const response = await api.get(`/jobs/all`);

    if (Array.isArray(response.data.data)) {
      return response.data.data.map((job: JobData) => ({
        ...job,
        id: job._id || job.id,
      }));
    }

    return [];
  } catch (error: any) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Get job by ID
export const getJobById = async (id: string): Promise<JobData> => {
  try {
    const response = await api.get(`/jobs/${id}`);

    if (!Array.isArray(response.data.data)) {
      return {
        ...response.data.data,
        id: response.data.data?._id || response.data.data?.id,
      } as JobData;
    }

    throw new Error("Invalid response format");
  } catch (error: any) {
    console.error("Error fetching job:", error);
    throw error;
  }
};

// Get jobs by employer ID
export const getJobsByEmployer = async (
  employerId: string,
): Promise<JobData[]> => {
  try {
    const response = await api.get(`/jobs/employer/${employerId}`);

    if (Array.isArray(response.data.data)) {
      return response.data.data.map((job: JobData) => ({
        ...job,
        id: job._id || job.id,
      }));
    }

    return [];
  } catch (error: any) {
    console.error("Error fetching employer jobs:", error);
    throw error;
  }
};

// Create a new job
export const createJob = async (jobData: JobData): Promise<JobData> => {
  try {
    const response = await api.post(`/jobs`, jobData);

    if (!Array.isArray(response.data.data)) {
      return {
        ...response.data.data,
        id: response.data.data?._id || response.data.data?.id,
      } as JobData;
    }

    throw new Error("Invalid response format");
  } catch (error: any) {
    console.error("Error creating job:", error);
    throw error;
  }
};

// Update a job
export const updateJob = async (
  id: string,
  jobData: Partial<JobData>,
): Promise<JobData> => {
  try {
    const response = await api.put(`/jobs/${id}`, jobData);

    if (!Array.isArray(response.data.data)) {
      return {
        ...response.data.data,
        id: response.data.data?._id || response.data.data?.id,
      } as JobData;
    }

    throw new Error("Invalid response format");
  } catch (error: any) {
    console.error("Error updating job:", error);
    throw error;
  }
};

// Delete a job
export const deleteJob = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/jobs/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};

// Get job categories with counts
export const getJobCategories = async (): Promise<{ name: string; count: number }[]> => {
  try {
    const response = await api.get(`/jobs/categories`);
    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching job categories:", error);
    throw error;
  }
};

// Search jobs
export const searchJobs = async (query: string): Promise<JobData[]> => {
  try {
    const response = await api.get(
      `/jobs/search?q=${encodeURIComponent(query)}`,
    );

    if (Array.isArray(response.data.data)) {
      return response.data.data.map((job: JobData) => ({
        ...job,
        id: job._id || job.id,
      }));
    }

    return [];
  } catch (error: any) {
    console.error("Error searching jobs:", error);
    throw error;
  }
};
