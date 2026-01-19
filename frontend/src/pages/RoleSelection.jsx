import { useNavigate } from "react-router-dom";
import { GraduationCap, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import SiesLogo from "../components/SiesLogo";

const RoleSelection = ({ type }) => {
  const navigate = useNavigate();
  const title = type === "lab" ? "Lab Complaint Portal" : "ICC Complaint Portal";
  const helpText = type === "lab" ? "Contact Lab Assistant" : "Contact ICC Member";
  const urgentText = type === "lab" ? "Lab Incharge" : "Presiding Officer";

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-200 to-indigo-300 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 flex flex-col relative overflow-hidden transition-colors duration-500">

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full p-3 md:p-4 z-50">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-4 md:px-8 relative flex items-center justify-center transition-all duration-300 min-h-[88px]">

          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/50 rounded-lg p-1 backdrop-blur-sm">
            <SiesLogo className="!p-0" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight text-center pl-16 pr-4 md:px-0">
            {title}
          </h1>

        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <div className="max-w-4xl w-full space-y-6">

          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
              Select your role
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto text-lg leading-relaxed">
              Submit and track {type === "lab" ? "lab" : "ICC"} issues easily.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 px-4">
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/40 flex flex-col items-center text-center space-y-4 hover:shadow-2xl hover:bg-white/70 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-white/50 dark:border-slate-600/50 ring-1 ring-blue-100 dark:ring-slate-700">
                <GraduationCap className="w-12 h-12 text-blue-600 dark:text-blue-400 drop-shadow-sm" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Student</h3>
                <p className="text-sm text-slate-500 max-w-[200px] mx-auto">
                  Raise a complaint, track status & updates
                </p>
              </div>
              <Button
                onClick={() => navigate(`/${type}/student`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-base rounded-lg group"
              >
                Continue as Student
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/40 flex flex-col items-center text-center space-y-4 hover:shadow-2xl hover:bg-white/70 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-6 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-white/50 dark:border-slate-600/50 ring-1 ring-slate-200 dark:ring-slate-700">
                <ShieldCheck className="w-12 h-12 text-slate-700 dark:text-slate-300 drop-shadow-sm" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Admin</h3>
                <p className="text-sm text-slate-500 max-w-[200px] mx-auto">
                  View, assign & resolve complaints
                </p>
              </div>
              <Button
                onClick={() => navigate(`/${type}/admin/auth`)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 text-base rounded-lg group"
              >
                Continue as Admin
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-sm border border-white/40 flex flex-col md:flex-row items-center justify-between gap-3 mx-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-full">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Need Quick Help?</h4>
                <p className="text-xs text-slate-500">{helpText}</p>
              </div>
            </div>
            <div className="flex items-center text-xs text-slate-500">
              <span className="mr-2">›</span>
              Report urgent issues: <span className="font-medium text-slate-700 ml-1">{urgentText}</span>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-slate-500 hover:text-slate-900 gap-2 text-sm"
            >
              ← Back to Home
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
