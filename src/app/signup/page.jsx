"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";

const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await apiClient.post("/users/register", {
        username,
        email,
        password,
      });
      router.push("/login");
    } catch (error) {
      alert("Please check your input again.");
    }
  }

  return (
    <>
      <Header />
      <div
        style={{ height: "88vh" }}
        className="flex flex-col justify-center sm:px-6 lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl tracking-wider font-semibold text-indigo-700">
            アカウントを作成する
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
                  ユーザー名
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mt-6">
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
                  autoComplete="new-password"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  アカウント作成
                </button>
                <div className="mt-4 text-right">
                  <Link href="/login" className="text-blue-700 hover:underline">
                    すでにアカウントをお持ちの方はこちら
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
