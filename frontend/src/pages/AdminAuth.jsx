import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import axios from "axios";

import SiesLogo from "../components/SiesLogo";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const schema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required").optional(),
});

const AdminAuth = ({ type }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const title = type === "lab" ? "Lab Admin Portal" : "ICC Admin Portal";
  const endpoint = type === "lab" ? "lab-admin" : "icc-admin";
  const themeColor = type === "lab" ? "text-blue-600" : "text-purple-600";
  const buttonGradient = type === "lab"
    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const url =
        activeTab === "login"
          ? `${BACKEND_URL}/api/auth/${endpoint}/login`
          : `${BACKEND_URL}/api/auth/${endpoint}/signup`;

      const payload =
        activeTab === "login"
          ? { email: data.email, password: data.password }
          : data;

      const response = await axios.post(url, payload);

      localStorage.setItem(`${type}_admin_token`, response.data.token);
      localStorage.setItem(`${type}_admin_data`, JSON.stringify(response.data.admin));

      toast.success(`${activeTab === "login" ? "Login" : "Signup"} successful!`);
      reset();
      navigate(`/${type}/admin/dashboard`);
    } catch (error) {
      toast.error(error.response?.data?.detail || `${activeTab} failed`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-sky-300 via-blue-200 to-indigo-300 flex flex-col relative overflow-hidden font-sans">

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full p-2 z-50">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-3 md:px-6 relative flex items-center justify-center transition-all duration-300 min-h-[70px]">
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/50 rounded-lg p-1 backdrop-blur-sm">
            <SiesLogo className="!p-0" imgClassName="h-16" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight text-center pl-16 pr-4 md:px-0">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-2 relative z-10">
        <div className="max-w-md w-full">
          <Card className="p-6 bg-white/60 backdrop-blur-md border-white/40 shadow-xl overflow-hidden">

            <div className="mb-4 text-center">
              <h2 className="text-lg font-semibold text-slate-800">
                {activeTab === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-slate-600 text-xs mt-0.5">
                {activeTab === "login" ? "Enter your credentials to access the dashboard" : "Register as a new admin"}
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/50 p-1 mb-4 rounded-lg h-9">
                <TabsTrigger
                  value="login"
                  className="rounded-md text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-md text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-3 data-[state=inactive]:hidden">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="login-email" className="text-slate-700 font-medium text-xs">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      {...register("email")}
                      placeholder="admin@example.com"
                      className="h-9 bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="login-password" className="text-slate-700 font-medium text-xs">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      {...register("password")}
                      placeholder="Enter your password"
                      className="h-9 bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm"
                    />
                    {errors.password && (
                      <p className="text-xs text-red-600">{errors.password.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${buttonGradient} text-white py-2.5 h-10 text-sm rounded-lg shadow-lg transition-all hover:scale-[1.02] mt-2`}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-3 data-[state=inactive]:hidden">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="signup-name" className="text-slate-700 font-medium text-xs">Full Name</Label>
                    <Input
                      id="signup-name"
                      {...register("name")}
                      placeholder="Enter your full name"
                      className="h-9 bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-email" className="text-slate-700 font-medium text-xs">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      {...register("email")}
                      placeholder="admin@example.com"
                      className="h-9 bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-password" className="text-slate-700 font-medium text-xs">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      {...register("password")}
                      placeholder="Create a password"
                      className="h-9 bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm"
                    />
                    {errors.password && (
                      <p className="text-xs text-red-600">{errors.password.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${buttonGradient} text-white py-2.5 h-10 text-sm rounded-lg shadow-lg transition-all hover:scale-[1.02] mt-2`}
                  >
                    {isSubmitting ? "Creating account..." : "Sign Up"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-4 text-center border-t border-slate-200/50 pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/${type}/role`)}
                className="text-slate-600 hover:text-slate-900 hover:bg-white/50 text-xs h-8"
              >
                ← Back to Roles
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
