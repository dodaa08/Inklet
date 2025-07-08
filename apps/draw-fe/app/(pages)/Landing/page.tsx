"use client";

import Hero from "@/app/components/Landing /hero";
import BottomColor from "../../components/Landing /heroColor";


export default function Landing() {
    
  return (
      <div className="bg-black/120">
        <div className="flex justify-center py-60">
            <Hero />
        </div>

        <div className="flex justify-center">
          <BottomColor />
        </div>
      </div>
  );

}
  