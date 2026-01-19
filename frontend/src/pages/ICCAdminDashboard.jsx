import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { LogOut, LayoutDashboard, Scale } from "lucide-react";
import axios from "axios";
import SiesLogo from "../components/SiesLogo";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ICCAdminDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("icc_admin_data");
    if (data) {
      setAdminData(JSON.parse(data));
    }
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("icc_admin_token");
      const response = await axios.get(`${BACKEND_URL}/api/icc-complaints`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(response.data);
    } catch (error) {
      toast.error("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      const token = localStorage.getItem("icc_admin_token");
      await axios.patch(
        `${BACKEND_URL}/api/icc-complaints/${complaintId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status updated successfully. Email sent to student.");
      fetchComplaints();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("icc_admin_token");
    localStorage.removeItem("icc_admin_data");
    toast.success("Logged out successfully");
    navigate("/icc/admin/auth");
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700/50",
      in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-700/50",
      resolved: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-700/50",
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-200 to-indigo-300 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 transition-colors duration-500 relative overflow-hidden font-sans">

      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header Card */}
      <div className="w-full p-3 md:p-4 z-50 sticky top-0">
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 dark:border-slate-700/50 p-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-white/50 dark:bg-white/90 rounded-lg p-1 backdrop-blur-sm transition-colors">
              <SiesLogo className="!p-0" imgClassName="h-10" />
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-full dark:bg-slate-800">
                <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                ICC Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end bg-white/30 dark:bg-slate-800/30 p-2 rounded-xl border border-white/20 dark:border-slate-700/30">
            <div className="flex flex-col items-start px-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Logged in as</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px]" data-testid="admin-name">
                {adminData?.name || "Admin"}
              </span>
            </div>
            <Button
              data-testid="logout-btn"
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="shadow-lg hover:bg-red-600/90 dark:bg-red-900/50 dark:hover:bg-red-900/80 dark:text-red-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-1">
              Complaint Overview
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Manage and track reported issues
            </p>
          </div>
          <div className="bg-white/40 dark:bg-slate-800/40 px-4 py-2 rounded-xl border border-white/30 dark:border-slate-700/30 text-slate-800 dark:text-slate-200 font-medium">
            Total: <span data-testid="complaint-count" className="text-purple-600 dark:text-purple-400 font-bold ml-1">{complaints.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30">
            <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          <Card className="p-16 text-center bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-white/40 dark:border-slate-700/50 shadow-xl">
            <LayoutDashboard className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-6" />
            <h3 className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-2">No complaints found</h3>
            <p className="text-slate-500 dark:text-slate-400">Everything looks good! No active complaints reported.</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300" data-testid="complaint-card">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Student Name</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 text-lg" data-testid="complaint-name">
                          {complaint.name}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Roll Number</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200 font-mono bg-slate-100 dark:bg-slate-800 inline-block px-2 py-0.5 rounded" data-testid="complaint-roll">
                          {complaint.roll_number}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Stream</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{complaint.stream}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate" data-testid="complaint-email">
                          {complaint.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{complaint.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 h-full">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Complaint Details</p>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed" data-testid="complaint-text">
                        {complaint.complaint}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700/50 gap-4">
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-700 w-full sm:w-auto justify-center sm:justify-start">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Current Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                        complaint.status
                      )}`}
                      data-testid="complaint-status"
                    >
                      {complaint.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
                    <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline">Update:</span>
                    <Select
                      value={complaint.status}
                      onValueChange={(value) => handleStatusChange(complaint.id, value)}
                    >
                      <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" data-testid="status-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                        <SelectItem value="pending" data-testid="status-pending" className="dark:text-slate-200 dark:focus:bg-slate-700">
                          Pending
                        </SelectItem>
                        <SelectItem value="in_progress" data-testid="status-in-progress" className="dark:text-slate-200 dark:focus:bg-slate-700">
                          In Progress
                        </SelectItem>
                        <SelectItem value="resolved" data-testid="status-resolved" className="dark:text-slate-200 dark:focus:bg-slate-700">
                          Resolved
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ICCAdminDashboard;
