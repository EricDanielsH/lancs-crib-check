"use client"; // This ensures the component is treated as a client-side component

import { useRouter } from 'next/navigation';

export default function LogInButton() {
  const router = useRouter();

  const handleLogIn = () => {
    router.push("/login");
  };

  return (
    <button className="btn" onClick={handleLogIn}>Log In</button>
  );
}
