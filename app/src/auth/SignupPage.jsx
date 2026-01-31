import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, Loader2, ArrowRight, User, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "../api";

const validationSchema = Yup.object({
    username: Yup.string().trim().required("Username is required"),
    email: Yup.string().trim().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    phone: Yup.string().matches(/^\d{10}$/, "Enter a valid 10-digit phone number"),
});

const SignupPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setErrorMessage("");
            try {
                const payload = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    phone: values.phone
                }
                await api.post("/register/", payload);
                navigate("/login");
            } catch (error) {
                setErrorMessage(
                    error.response?.data?.message ||
                    error.response?.data?.detail ||
                    "Registration failed."
                );
            } finally {
                setIsLoading(false);
            }
        },
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setErrors } =
        formik;

    return (
        <div className="min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[hsl(var(--color-background))]">
            {/* Animated Background */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full float pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[100px] rounded-full float pointer-events-none" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-purple-900/20 blur-[120px] rounded-full float pointer-events-none" style={{ animationDelay: '1s' }} />

            <div className="max-w-md w-full space-y-8 relative z-10 p-6 sm:p-10 glass-gradient rounded-3xl animate-in fade-in zoom-in duration-500 border border-white/10 shadow-luxury">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl sm:text-4xl font-bold font-playfair tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-sm">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground font-medium">
                        Join the exclusive world of Elitora
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300" />
                        </div>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="pl-12 h-14 bg-white/5 border-white/10 hover:border-accent/40 focus:border-accent backdrop-blur-md transition-all duration-300 rounded-xl text-base shadow-inner"
                        />
                    </div>
                    {touched.username && errors.username && (
                        <p className="text-xs text-destructive ml-1 animate-pulse font-medium">{errors.username}</p>
                    )}

                    {/* Email */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300" />
                        </div>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email address"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="pl-12 h-14 bg-white/5 border-white/10 hover:border-accent/40 focus:border-accent backdrop-blur-md transition-all duration-300 rounded-xl text-base shadow-inner"
                        />
                    </div>
                    {touched.email && errors.email && (
                        <p className="text-xs text-destructive ml-1 animate-pulse font-medium">{errors.email}</p>
                    )}

                    {/* Phone */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300" />
                        </div>
                        <Input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Phone (Optional)"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="pl-12 h-14 bg-white/5 border-white/10 hover:border-accent/40 focus:border-accent backdrop-blur-md transition-all duration-300 rounded-xl text-base shadow-inner"
                        />
                    </div>
                    {touched.phone && errors.phone && (
                        <p className="text-xs text-destructive ml-1 animate-pulse font-medium">{errors.phone}</p>
                    )}

                    {/* Password */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300" />
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="pl-12 h-14 bg-white/5 border-white/10 hover:border-accent/40 focus:border-accent backdrop-blur-md transition-all duration-300 rounded-xl text-base shadow-inner"
                        />
                    </div>
                    {touched.password && errors.password && (
                        <p className="text-xs text-destructive ml-1 animate-pulse font-medium">{errors.password}</p>
                    )}

                    {/* Confirm Password */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300" />
                        </div>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="pl-12 h-14 bg-white/5 border-white/10 hover:border-accent/40 focus:border-accent backdrop-blur-md transition-all duration-300 rounded-xl text-base shadow-inner"
                        />
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                        <p className="text-xs text-destructive ml-1 animate-pulse font-medium">{errors.confirmPassword}</p>
                    )}

                    {errorMessage && (
                        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center font-medium animate-in fade-in slide-in-from-top-1 animate-shake">
                            {errorMessage}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 text-lg font-semibold tracking-wide bg-gradient-to-r from-primary to-accent hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl shadow-luxury hover:shadow-glow mt-4"
                        >
                            {isLoading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-accent hover:text-white transition-colors inline-flex items-center gap-1 group"
                        >
                            Sign in
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
