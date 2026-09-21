"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section
          className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/image/bg1-IMG_4696.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 text-center px-6">
            <ScrollReveal move="bottom" delay={200} duration={1600}>
              <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                あなたのストーリーを、ひとつの場所で。
              </h1>
            </ScrollReveal>

            <p className="text-xl md:text-2xl text-gray-200 mt-6">
              旅、仕事、趣味。テーマごとにブログを分けて管理できる、
              クリエイターのためのマルチブログ管理アプリ。
            </p>

            <div className="mt-10 flex justify-center gap-6">
              {user ? (
                <Link
                  href="/dashboard"
                  className="px-10 py-4 bg-white text-teal-700 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
                >
                  ダッシュボードへ
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-teal-500 text-white rounded-lg text-lg font-semibold hover:bg-teal-600 transition"
                >
                  ブログを作成する
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 container mx-auto px-6">
          <ScrollReveal move="bottom" delay={200} duration={1400}>
            <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              title="複数ブログをひとつのアカウントで管理"
              desc="旅ブログ、技術ブログ、日記ブログ。テーマごとにブログサイトを作成して、切り替えながら運営できます。"
            />
            <FeatureCard
              title="写真を魅せる記事投稿体験"
              desc="画像スライドショー、OG画像、タグ、カテゴリー。あなたのストーリーを美しく届けるための投稿機能を備えています。"
            />
            <FeatureCard
              title="ブログごとのデザインテーマ"
              desc="ブログサイトごとにテーマカラーやヒーロー画像を設定可能。世界観をそのまま表現できます。"
            />
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-white">
          <ScrollReveal move="bottom" delay={200} duration={1400}>
            <h2 className="text-4xl font-bold text-center mb-12">
              How it works
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-10 px-6">
            <Step number="1" title="ブログサイトを作成する" />
            <Step number="2" title="記事を書く" />
            <Step number="3" title="読者とつながる" />
            <Step number="4" title="複数ブログを切り替えて運営" />
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center bg-teal-600 text-white">
          <ScrollReveal move="bottom" delay={200} duration={1400}>
            <h2 className="text-4xl font-bold mb-6">今すぐ始める</h2>
          </ScrollReveal>

          <p className="text-lg mb-10">
            あなたのストーリーを届ける場所を作ろう。
          </p>

          {user ? (
            <Link
              href="/dashboard"
              className="px-10 py-4 bg-white text-teal-700 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
            >
              ダッシュボードへ
            </Link>
          ) : (
            <Link
              href="/signup"
              className="px-10 py-4 bg-white text-teal-700 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
            >
              アカウントを作成する
            </Link>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ number, title }) {
  return (
    <div className="flex items-start gap-6">
      <div className="text-teal-600 text-4xl font-bold">{number}</div>
      <p className="text-xl font-medium">{title}</p>
    </div>
  );
}
