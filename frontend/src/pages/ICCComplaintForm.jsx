import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import axios from "axios";
import SiesLogo from "../components/SiesLogo";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  roll_number: z.string().min(1, "Roll number is required"),
  stream: z.string().min(1, "Stream is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  complaint: z.string().min(10, "Complaint must be at least 10 characters"),
});

const ICCComplaintForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await axios.post(`${BACKEND_URL}/api/icc-complaints`, data);

      toast.success("Complaint submitted successfully! You'll receive email updates.");
      reset();
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to submit complaint");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-200 to-indigo-300 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 flex flex-col relative overflow-hidden font-sans transition-colors duration-500">

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full p-3 md:p-4 z-50">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-4 md:px-8 relative flex items-center justify-center transition-all duration-300 min-h-[88px]">
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/50 rounded-lg p-1 backdrop-blur-sm">
            <SiesLogo className="!p-0" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight text-center pl-16 pr-4 md:px-0">
            ICC Complaint Form
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <div className="max-w-3xl w-full">
          <Card className="p-8 md:p-10 bg-white/60 backdrop-blur-md border-white/40 shadow-xl">
            <div className="mb-8 text-center">
              <p className="text-lg text-slate-600">
                Please fill out all required fields below
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium">Full Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="bg-white/50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roll_number" className="text-slate-700 font-medium">Roll Number *</Label>
                  <Input
                    id="roll_number"
                    {...register("roll_number")}
                    placeholder="Enter your roll number"
                    className="bg-white/50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                  {errors.roll_number && (
                    <p className="text-sm text-red-600">{errors.roll_number.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stream" className="text-slate-700 font-medium">Stream *</Label>
                  <Input
                    id="stream"
                    {...register("stream")}
                    placeholder="e.g., Computer Science"
                    className="bg-white/50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                  {errors.stream && (
                    <p className="text-sm text-red-600">{errors.stream.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="Enter your phone number"
                    className="bg-white/50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">Email ID *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="your.email@example.com"
                  className="bg-white/50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="complaint" className="text-slate-700 font-medium">Complaint Description *</Label>
                <Textarea
                  id="complaint"
                  {...register("complaint")}
                  placeholder="Describe your complaint in detail..."
                  rows={5}
                  className="resize-none bg-white/50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20"
                />
                {errors.complaint && (
                  <p className="text-sm text-red-600">{errors.complaint.message}</p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg rounded-xl shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]"
                >
                  {isSubmitting ? "Submitting..." : "Submit Complaint"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/icc/role")}
                  disabled={isSubmitting}
                  className="py-6 text-base rounded-xl border-slate-300 hover:bg-slate-100/50"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ICCComplaintForm;
