import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Loader2 } from "lucide-react";

const donorSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  bloodGroup: z.string().min(1, "Please select a blood group"),
  gender: z.string().min(1, "Please select gender"),
  phone: z.string().trim().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  place: z.string().trim().min(2, "Place must be at least 2 characters").max(100, "Place too long"),
});

type DonorFormData = z.infer<typeof donorSchema>;

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DonorFormData>({
    resolver: zodResolver(donorSchema),
  });

  const onSubmit = async (data: DonorFormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "donors"), {
        ...data,
        createdAt: new Date().toISOString(),
      });
      
      toast.success("Registration successful!", {
        description: "Thank you for registering as a blood donor.",
      });
      
      navigate("/donors");
    } catch (error) {
      console.error("Error adding document:", error);
      toast.error("Registration failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto shadow-lg border-border">
          <CardHeader className="space-y-1 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-md">
              <Heart className="w-8 h-8 text-primary-foreground" fill="currentColor" />
            </div>
            <CardTitle className="text-3xl font-bold">Become a Donor</CardTitle>
            <CardDescription className="text-base">
              Join our community and help save lives through blood donation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group *</Label>
                  <Select
                    onValueChange={(value) => setValue("bloodGroup", value)}
                    value={watch("bloodGroup")}
                  >
                    <SelectTrigger className={errors.bloodGroup ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bloodGroup && (
                    <p className="text-sm text-destructive">{errors.bloodGroup.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    onValueChange={(value) => setValue("gender", value)}
                    value={watch("gender")}
                  >
                    <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-destructive">{errors.gender.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  {...register("phone")}
                  className={errors.phone ? "border-destructive" : ""}
                  maxLength={10}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="place">Location/Place *</Label>
                <Input
                  id="place"
                  placeholder="Enter your city or area"
                  {...register("place")}
                  className={errors.place ? "border-destructive" : ""}
                />
                {errors.place && (
                  <p className="text-sm text-destructive">{errors.place.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                    Register as Donor
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
