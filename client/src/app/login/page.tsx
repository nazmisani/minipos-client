"use client";

import { useState } from "react";
import { baseUrl } from "@/service/api";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${baseUrl}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(data.token);

      localStorage.setItem("token", data.token);

      if (data.token) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-50 to-slate-100">
      <section className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="w-full max-w-3xl px-8 xl:px-12">
          <div className="mb-6">
            <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold flex items-center justify-center shadow-2xl text-lg xl:text-xl">
              POS
            </div>
          </div>
          <h1 className="text-white font-extrabold leading-tight text-4xl xl:text-5xl 2xl:text-6xl">
            MiniPOS
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              ERP System
            </span>
          </h1>

          <p className="mt-4 xl:mt-6 text-slate-300 text-base xl:text-lg 2xl:text-xl max-w-xl leading-relaxed">
            Professional point-of-sale and inventory management solution.
            Streamline your business operations with powerful analytics and
            reporting.
          </p>
        </div>
      </section>

      {/* RIGHT: Login Card */}
      <section className="flex items-center justify-center px-4 py-8 lg:px-6 lg:py-12">
        <div className="relative w-full max-w-sm lg:max-w-md">
          <div className="absolute -top-8 lg:-top-10 left-1/2 -translate-x-1/2">
            <div className="w-16 h-16 lg:w-18 lg:h-18 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold flex items-center justify-center shadow-2xl ring-4 lg:ring-8 ring-white/50 text-base lg:text-lg">
              POS
            </div>
          </div>

          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-slate-200/50 p-6 lg:p-8 pt-12 lg:pt-14">
            <h2 className="text-center text-2xl lg:text-3xl font-bold text-slate-900">
              Welcome Back
            </h2>
            <p className="mt-1 lg:mt-2 text-center text-slate-600 text-sm lg:text-base">
              Sign in to your MiniPOS account
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-6 lg:mt-8 space-y-4 lg:space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs lg:text-sm font-semibold text-slate-700 mb-1.5 lg:mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg lg:rounded-xl border-2 border-slate-200 bg-slate-50/50 px-3 lg:px-4 py-2.5 lg:py-3.5 text-sm lg:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs lg:text-sm font-semibold text-slate-700 mb-1.5 lg:mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg lg:rounded-xl border-2 border-slate-200 bg-slate-50/50 px-3 lg:px-4 py-2.5 lg:py-3.5 text-sm lg:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg lg:rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 lg:py-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm lg:text-base"
              >
                Sign In
              </button>
            </form>
          </div>

          <p className="mt-4 lg:mt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} MiniPOS ERP System. All rights
            reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
