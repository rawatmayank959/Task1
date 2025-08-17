import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

// A single-file, drop-in React component for a basic Sign-Up page
// Styling: Tailwind CSS
// Validation: simple client-side checks (name, email, password)
// Usage: Place <SignUpPage /> anywhere in your app

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-={}[\]|;:'",.<>/?`~]{8,}$/; // ≥8 chars, at least 1 letter & 1 number

export default function SignUpPage() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [showPw, setShowPw] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    name:
      values.name.trim().length === 0
        ? "Full name is required"
        : values.name.trim().length < 2
        ? "Please enter at least 2 characters"
        : undefined,
    email:
      values.email.trim().length === 0
        ? "Email is required"
        : !emailRegex.test(values.email)
        ? "Please enter a valid email"
        : undefined,
    password:
      values.password.length === 0
        ? "Password is required"
        : !passwordRegex.test(values.password)
        ? "Min 8 chars, with at least 1 letter & 1 number"
        : undefined,
  };

  const isValid = !errors.name && !errors.email && !errors.password;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (!isValid) return;

    // In a real app, send `values` to your backend here
    console.log("Form submitted:", values);
    setSubmitted(true);
    // Optional: reset form
    setValues({ name: "", email: "", password: "" });
    setTouched({ name: false, email: false, password: false });
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">Create your account</h1>
            <p className="text-slate-500 mt-2">It only takes a minute.</p>
          </div>

          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800"
            >
              ✅ Signed up successfully! (Check the console for submitted data.)
            </motion.div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <User className="h-4 w-4 text-slate-400" />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border px-10 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition shadow-sm
                    ${touched.name && errors.name ? "border-rose-300 focus:ring-rose-100" : "border-slate-300 focus:ring-slate-100"}
                  `}
                  placeholder="Jane Doe"
                  required
                />
              </div>
              {touched.name && errors.name && (
                <p className="mt-1 text-sm text-rose-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail className="h-4 w-4 text-slate-400" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border px-10 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition shadow-sm
                    ${touched.email && errors.email ? "border-rose-300 focus:ring-rose-100" : "border-slate-300 focus:ring-slate-100"}
                  `}
                  placeholder="jane@example.com"
                  required
                />
              </div>
              {touched.email && errors.email && (
                <p className="mt-1 text-sm text-rose-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock className="h-4 w-4 text-slate-400" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="new-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border px-10 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition shadow-sm pr-12
                    ${touched.password && errors.password ? "border-rose-300 focus:ring-rose-100" : "border-slate-300 focus:ring-slate-100"}
                  `}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  aria-label={showPw ? "Hide password" : "Show password"}
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 hover:bg-slate-100"
                >
                  {showPw ? <EyeOff className="h-5 w-5 text-slate-500" /> : <Eye className="h-5 w-5 text-slate-500" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-500">Min 8 chars, with at least 1 letter & 1 number.</p>
              {touched.password && errors.password && (
                <p className="mt-1 text-sm text-rose-600">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full rounded-2xl px-4 py-2.5 text-white font-medium shadow-md transition focus:outline-none focus:ring-4
                ${isValid ? "bg-slate-800 hover:bg-slate-900 focus:ring-slate-200" : "bg-slate-300 cursor-not-allowed"}
              `}
            >
              Create account
            </button>
          </form>

          <div className="mt-6 text-xs text-slate-500 text-center">
            By signing up, you agree to our <a href="#" className="underline hover:text-slate-700">Terms</a> & <a href="#" className="underline hover:text-slate-700">Privacy</a>.
          </div>
        </div>

        <p className="text-center text-slate-400 text-xs mt-6">© {new Date().getFullYear()} Your Company</p>
      </motion.div>
    </div>
  );
}
