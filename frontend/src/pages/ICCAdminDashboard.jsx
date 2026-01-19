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
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      in_progress: "bg-blue-50 text-blue-700 border-blue-200",
      resolved: "bg-green-50 text-green-700 border-green-200",
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Scale className="w-6 h-6" />
            <h1 className="text-xl font-semibold">ICC Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm" data-testid="admin-name">
              {adminData?.name || "Admin"}
            </span>
            <Button
              data-testid="logout-btn"
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            ICC Complaints
          </h2>
          <p className="text-base text-slate-600">
            Total complaints: <span data-testid="complaint-count">{complaints.length}</span>
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          <Card className="p-12 text-center">
            <LayoutDashboard className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No complaints yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="p-6" data-testid="complaint-card">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-500">Student Name</p>
                    <p className="font-medium text-slate-900" data-testid="complaint-name">
                      {complaint.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Roll Number</p>
                    <p className="font-medium text-slate-900" data-testid="complaint-roll">
                      {complaint.roll_number}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Stream</p>
                    <p className="font-medium text-slate-900">{complaint.stream}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium text-slate-900" data-testid="complaint-email">
                      {complaint.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-medium text-slate-900">{complaint.phone}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-slate-500 mb-1">Complaint</p>
                  <p className="text-slate-700" data-testid="complaint-text">
                    {complaint.complaint}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-slate-500">Status:</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                        complaint.status
                      )}`}
                      data-testid="complaint-status"
                    >
                      {complaint.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-500">Update Status:</span>
                    <Select
                      value={complaint.status}
                      onValueChange={(value) => handleStatusChange(complaint.id, value)}
                    >
                      <SelectTrigger className="w-40" data-testid="status-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending" data-testid="status-pending">
                          Pending
                        </SelectItem>
                        <SelectItem value="in_progress" data-testid="status-in-progress">
                          In Progress
                        </SelectItem>
                        <SelectItem value="resolved" data-testid="status-resolved">
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
