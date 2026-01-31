import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "../api";

const validationSchema = Yup.object({
    username: Yup.string().trim().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setErrorMessage("");
            try {
                const response = await api.post("/token/", values);
                console.log("Login Success:", response.data);

                // Store tokens
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);

                // Ideally, fetch user info or update context here
                // for now, just navigate to home or cart
                navigate("/");

            } catch (error) {
                console.error("Login Error:", error);
                setErrorMessage(
                    error.response?.data?.detail || "Invalid credential"
                );
            } finally {
                setIsLoading(false);
            }
        },
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
        formik;

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full space-y-8 relative z-10 p-8 glass-gradient rounded-3xl animate-in fade-in zoom-in duration-500">
                <div className="text-center">
                    <h2 className="mt-2 text-4xl font-bold font-playfair tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to access your luxury collection
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Username/Email Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                            </div>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="pl-10 h-12 bg-white/5 border-white/10 hover:border-accent/50 focus:border-accent backdrop-blur-sm transition-all"
                            />
                        </div>
                        {touched.username && errors.username && (
                            <p className="text-xs text-destructive ml-1">{errors.username}</p>
                        )}

                        {/* Password Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="pl-10 h-12 bg-white/5 border-white/10 hover:border-accent/50 focus:border-accent backdrop-blur-sm transition-all"
                            />
                        </div>
                        {touched.password && errors.password && (
                            <p className="text-xs text-destructive ml-1">{errors.password}</p>
                        )}
                    </div>

                    {errorMessage && (
                        <div className="text-center text-sm text-destructive bg-destructive/10 py-2 rounded-lg">
                            {errorMessage}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity rounded-xl shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1 group"
                        >
                            Sign up now
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
