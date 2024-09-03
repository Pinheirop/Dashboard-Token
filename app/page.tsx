"use client";
import Loader from "@/components/loader/loader";
import LoginScreen from "@/components/login";
import Dashboard from "@/components/main_dash";

export default function Home() {
  const isLoggedIn =
    typeof localStorage !== "undefined" ? localStorage.getItem("isLogged") : undefined;
  return isLoggedIn === undefined ? <Loader /> : isLoggedIn === "true" ? <Dashboard /> : <LoginScreen />;
}
