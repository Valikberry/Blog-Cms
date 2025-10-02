"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const router = useRouter();
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; delay: string }>
  >([]);

  useEffect(() => {
    const p = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }));
    setParticles(p);
  }, []);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #15110d 0%, #2a2520 100%)",
      }}
    >
     
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{
              background: "#a6d9ce",
              left: p.left,
              top: p.top,
              animationName: "float",
              animationDuration: `${5 + Math.random() * 10}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>

      <div className="max-w-md w-full mx-4 relative z-10">
        {/* Glass morphism card */}
        <div
          className="backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-opacity-20"
          style={{
            background: "rgba(21, 17, 13, 0.6)",
            borderColor: "#a6d9ce",
          }}
        >
          {/* Accent bar */}
          <div
            className="h-1.5 w-full"
            style={{
              background:
                "linear-gradient(90deg, #a6d9ce 0%, #7bc4b8 50%, #a6d9ce 100%)",
            }}
          ></div>

          <div className="p-10">
            {/* Logo/Icon area */}
            <div className="flex justify-center mb-8">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #a6d9ce 0%, #7bc4b8 100%)",
                }}
              >
                <Lock className="w-10 h-10 text-white" strokeWidth={2.5} />
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2
                className="text-4xl font-bold mb-2"
                style={{ color: "#a6d9ce" }}
              >
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm">
                Sign in to continue your journey
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div
                  className="rounded-xl p-4 border animate-pulse"
                  style={{
                    background: "rgba(236, 26, 42, 0.1)",
                    borderColor: "#ec1a2a",
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#ec1a2a" }}
                  >
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-5">
                <div className="relative group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "#a6d9ce" }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-opacity-80 transition-colors"
                      style={{
                        color: focusedField === "email" ? "#a6d9ce" : undefined,
                      }}
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 transition-all duration-300 outline-none"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: `2px solid ${
                          focusedField === "email"
                            ? "#a6d9ce"
                            : "rgba(166, 217, 206, 0.2)"
                        }`,
                        boxShadow:
                          focusedField === "email"
                            ? "0 0 20px rgba(166, 217, 206, 0.3)"
                            : "none",
                      }}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "#a6d9ce" }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-opacity-80 transition-colors"
                      style={{
                        color:
                          focusedField === "password" ? "#a6d9ce" : undefined,
                      }}
                    />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField("")}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 transition-all duration-300 outline-none"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: `2px solid ${
                          focusedField === "password"
                            ? "#a6d9ce"
                            : "rgba(166, 217, 206, 0.2)"
                        }`,
                        boxShadow:
                          focusedField === "password"
                            ? "0 0 20px rgba(166, 217, 206, 0.3)"
                            : "none",
                      }}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: loading
                    ? "#7bc4b8"
                    : "linear-gradient(135deg, #a6d9ce 0%, #7bc4b8 100%)",
                  color: "#15110d",
                  boxShadow: loading
                    ? "none"
                    : "0 10px 30px rgba(166, 217, 206, 0.3)",
                }}
              >
                <span className="relative z-10">
                  {loading ? "Signing in..." : "Sign In"}
                </span>
                {!loading && (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                )}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            Secured with end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
}
