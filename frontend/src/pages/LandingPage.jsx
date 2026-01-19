import { useNavigate } from "react-router-dom";
import { Monitor, Scale, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import SiesLogo from "../components/SiesLogo";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-200 to-indigo-300 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 flex flex-col font-sans relative overflow-hidden transition-colors duration-500">

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full p-3 md:p-4 z-50">
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 dark:border-slate-700/50 p-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-white/50 dark:bg-white/90 rounded-lg p-1 backdrop-blur-sm transition-colors">
              <SiesLogo className="!p-0" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight transition-colors">
                Complaint Management Portal
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium hidden md:block transition-colors">
                SIES College of Arts, Science & Commerce (Autonomous), Nerul
              </p>
            </div>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-500 font-medium md:hidden text-center transition-colors">
            SIES College of Arts, Science & Commerce (Autonomous), Nerul
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <div className="max-w-4xl w-full space-y-8">

          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">
              Select Complaint Type
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-lg leading-relaxed transition-colors">
              Please choose the appropriate category below to file your complaint or track its status.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 px-2">
            <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/40 dark:border-slate-700/50 flex flex-col items-center text-center space-y-6 hover:shadow-2xl hover:bg-white/70 dark:hover:bg-slate-900/70 transition-all duration-300 group transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-white/50 dark:border-slate-600/50 ring-1 ring-blue-100 dark:ring-slate-700">
                <Monitor className="w-12 h-12 text-blue-600 dark:text-blue-400 drop-shadow-sm" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 transition-colors">Lab Complaint</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[240px] mx-auto leading-relaxed transition-colors">
                  Report hardware or software issues in the computer laboratories.
                </p>
              </div>
              <Button
                onClick={() => navigate("/lab/role")}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-6 rounded-xl font-medium shadow-blue-100 dark:shadow-none shadow-lg hover:shadow-xl transition-all group"
              >
                Go to Lab Portal
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/40 dark:border-slate-700/50 flex flex-col items-center text-center space-y-6 hover:shadow-2xl hover:bg-white/70 dark:hover:bg-slate-900/70 transition-all duration-300 group transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-white/50 dark:border-slate-600/50 ring-1 ring-purple-100 dark:ring-slate-700">
                <Scale className="w-12 h-12 text-purple-600 dark:text-purple-400 drop-shadow-sm" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 transition-colors">ICC Complaint</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-[240px] mx-auto leading-relaxed transition-colors">
                  Internal Complaints Committee for sensitive issue reporting.
                </p>
              </div>
              <Button
                onClick={() => navigate("/icc/role")}
                className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white py-6 rounded-xl font-medium shadow-purple-100 dark:shadow-none shadow-lg hover:shadow-xl transition-all group"
              >
                Go to ICC Portal
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LandingPage;
