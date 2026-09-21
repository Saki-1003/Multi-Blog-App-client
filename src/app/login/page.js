"use client";
import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Header from "@/components/Header";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { AuthContext } from "@/context/authContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useContext(AuthContext);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "ログインに失敗しました";

      alert(backendMessage);
    }
  }

  return (
    <>
      <Header />
      <div
        style={{ height: "88vh" }}
        className="flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl tracking-wider font-semibold text-indigo-700">
            ログイン
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Eメール
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  パスワード
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  ログイン
                </button>
                <Link
                  href="/signup"
                  className="text-blue-700 hover:underline text-right block mt-4"
                >
                  アカウントをお持ちでない方はこちら
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
