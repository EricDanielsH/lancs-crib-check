"use client"; // This ensures the component is treated as a client-side component

import { useRouter } from 'next/navigation';

export default function RegisterButton() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <button className="btn" onClick={handleRegister}>Register</button>
  );
}
