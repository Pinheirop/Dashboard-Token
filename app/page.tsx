'use client'
import LoginScreen from "@/components/login";
import  Dashboard  from "@/components/main_dash";

export default function Home() {
  
  const isLoggedIn = localStorage.getItem('isLogged');
  return(isLoggedIn === 'true' ?  <Dashboard /> : <LoginScreen />);
}
