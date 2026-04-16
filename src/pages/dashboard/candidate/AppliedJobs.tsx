import { useEffect, useState } from "react";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import { Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react";
import {
  ApplicationService,
  type ApplicationModel,
} from "../../../services/application.Service";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Loader from "../../../shared/components/ui/Loader";

export default function AppliedJobs() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const userId = user?._id || user?.id;
      if (!userId) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await ApplicationService.getByUser(userId);
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-blue-600 bg-blue-50 border-blue-100";
      case "SHORTLISTED":
        return "text-green-600 bg-green-50 border-green-100";
      case "REJECTED":
        return "text-red-600 bg-red-50 border-red-100";
      case "HIRED":
        return "text-purple-600 bg-purple-50 border-purple-100";
      default:
        return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  if (isLoading) return <Loader />;

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Applied Jobs
          </h1>
          <p className="text-gray-500 text-sm">
            You have applied for {applications.length} jobs in total.
          </p>
        </div>
        {/* Search and Filters (Optional for now) */}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    You haven't applied to any jobs yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app._id || app.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400">
                          {(app as any).jobId?.company?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-[#00b4d8] transition-colors">
                            {(app as any).jobId?.title || "Unknown Job"}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />{" "}
                              {(app as any).jobId?.company || "Unknown Company"}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />{" "}
                              {(app as any).jobId?.location || "Remote"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {app.submissionDate
                          ? new Date(app.submissionDate).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(app.status)}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/jobs/${(app as any).jobId?._id || (app as any).jobId?.id}`}
                        className="p-2 text-gray-400 hover:text-[#00b4d8] hover:bg-blue-50 rounded-lg transition-all inline-block"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
