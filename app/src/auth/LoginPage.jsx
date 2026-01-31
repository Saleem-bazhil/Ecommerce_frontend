import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const validationSchema = Yup.object({
    username: Yup.string().trim().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
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
                login(response.data.access, response.data.refresh);
                navigate("/");

            } catch (error) {
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
        <div className="min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[hsl(var(--color-background))]">
            {/* Animated Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full float pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[100px] rounded-full float pointer-events-none" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-900/20 blur-[120px] rounded-full float pointer-events-none" style={{ animationDelay: '1s' }} />

            <div className="max-w-md w-full space-y-8 relative z-10 p-6 sm:p-10 glass-gradient rounded-3xl animate-in fade-in zoom-in duration-500 border border-white/10 shadow-luxury">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl sm:text-4xl font-bold font-playfair tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-sm">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground font-medium">
                        Sign in to access your luxury collection
                    </p>
                </div>

                <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* Username/Email Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300" />
                            </div>
                            <Input
                                id="username"
                                name="username"
                                type="text"
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

                        {/* Password Input */}
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
                    </div>

                    {errorMessage && (
                        <div className="text-center text-sm text-destructive bg-destructive/10 border border-destructive/20 py-3 rounded-xl animate-shake">
                            {errorMessage}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 text-lg font-semibold tracking-wide bg-gradient-to-r from-primary to-accent hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl shadow-luxury hover:shadow-glow"
                        >
                            {isLoading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-accent hover:text-white transition-colors inline-flex items-center gap-1 group"
                        >
                            Sign up now
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
