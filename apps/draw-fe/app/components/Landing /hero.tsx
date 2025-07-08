"use client";

// import { Button } from "@repo/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Hero = () => {
  const router = useRouter();
  const session = useSession();

  const handleStart = async () => {
    try {
      if (session.data) {
        router.push("/onboarding");
      } else {
        toast.error("User not LoggedIn");
        setTimeout(() => {
          router.push("/auth/signin");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <h1 className="text-4xl font-mono text-gray-200 text-center">
          Create rooms to <span className="text-orange-300">Scribble</span> and chat with <br />
          <span className="block mt-3">frenz :)</span>
        </h1>
      </div>

      <div className="flex justify-center">
        <h1 className="text-xl font-mono font-bold text-gray-500">
          your space to play around and ease out!
        </h1>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleStart}
          className="border-2 border-gray-900 rounded-xl font-bold bg-orange-500 py-2 px-6 hover:cursor-pointer hover:bg-orange-600 transition duration-400"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
