import React from "react";
import { FaShieldAlt, FaShippingFast, FaGift } from "react-icons/fa";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-6 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] items-center">
          <div className="space-y-8">
            <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-sm uppercase tracking-[0.3em] text-blue-200">
              Curated for you
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                Shop smarter. Save more. Ship fast.
              </h1>
              <p className="max-w-2xl text-base sm:text-lg text-slate-300">
                Discover the latest products, daily deals, and trending collections from the brands you love. Everything you need for your home, work, and lifestyle.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
              <a
                href="#trending"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold transition hover:bg-blue-400"
              >
                Shop Trending
              </a>
              <a
                href="#new-arrivals"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/20"
              >
                Explore New Arrivals
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: FaShippingFast, label: "Free shipping", description: "On orders over $49" },
                { icon: FaShieldAlt, label: "Secure payment", description: "Trusted checkout" },
                { icon: FaGift, label: "Daily rewards", description: "Exclusive offers" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-lg">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 text-white">
                      <Icon />
                    </div>
                    <p className="mt-4 text-sm font-semibold">{item.label}</p>
                    <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.35),transparent_45%)]" />
            <div className="relative flex flex-col gap-6">
              <div className="rounded-3xl bg-slate-950/90 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Best selling</p>
                <h2 className="mt-3 text-3xl font-semibold">Chosen by thousands</h2>
                <p className="mt-3 text-slate-300">
                  Shop the most-loved products and enjoy premium quality with every order.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                  <p className="text-sm text-slate-400">Smart gadgets</p>
                  <p className="mt-2 text-xl font-semibold">Up to 40% off</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                  <p className="text-sm text-slate-400">Home essentials</p>
                  <p className="mt-2 text-xl font-semibold">New arrivals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
