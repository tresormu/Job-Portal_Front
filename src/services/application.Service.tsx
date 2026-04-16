import api from "./ApiSetter";

export type ApplicationStatus =
  | "PENDING"
  | "REVIEWED"
  | "SHORTLISTED"
  | "REJECTED"
  | "HIRED";

export interface ApplicationModel {
  _id?: string;
  id?: string;
  jobId: string;
  userId: string;
  employerId: string;
  name: string;
  email: string;
  resume: string;
  coverLetter?: string;
  status: ApplicationStatus;
  notes?: string;
  submissionDate?: string;
  lastUpdated?: string;
}

export const ApplicationService = {
  getAll: async (): Promise<ApplicationModel[]> => {
    const response = await api.get("/applications");
    return response.data.data;
  },

  getById: async (id: string): Promise<ApplicationModel> => {
    const response = await api.get(`/applications/${id}`);
    return response.data.data;
  },

  getByJob: async (jobId: string): Promise<ApplicationModel[]> => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data.data;
  },

  getByUser: async (userId: string): Promise<ApplicationModel[]> => {
    const response = await api.get(`/applications/user/${userId}`);
    return response.data.data;
  },

  getByEmployer: async (employerId: string): Promise<ApplicationModel[]> => {
    const response = await api.get(
      `/applications/employer/${employerId}`
    );
    return response.data.data;
  },

  submit: async (
    jobId: string,
    data: Partial<ApplicationModel>,
    resume?: File
  ): Promise<ApplicationModel> => {
    console.log('=== ApplicationService.submit START ===');
    console.log('jobId:', jobId);
    console.log('data:', data);
    console.log('resume:', resume);
    
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
        console.log(`FormData appended: ${key} = ${value}`);
      }
    });

    if (resume) {
      formData.append("resume", resume);
      console.log(`FormData appended: resume = File(${resume.name}, ${resume.size} bytes)`);
    } else {
      console.log('WARNING: No resume file provided');
    }

    console.log('Sending POST request to:', `/applications/${jobId}`);
    
    try {
      const response = await api.post(
        `/applications/${jobId}`,
        formData
      );

      console.log('Response received:', response.data);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('=== ApplicationService.submit ERROR ===');
      console.error('Error:', error);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      throw error;
    }
  },

  updateStatus: async (
    id: string,
    status: ApplicationStatus,
    notes?: string
  ): Promise<ApplicationModel> => {
    const response = await api.put(
      `/applications/${id}/status`,
      { status, notes }
    );
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/applications/${id}`);
  },

  getCandidateStats: async (): Promise<any> => {
    const response = await api.get("/auth/stats");
    return response.data;
  },
};
