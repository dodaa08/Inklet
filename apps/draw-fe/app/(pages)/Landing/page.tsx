"use client";

import Hero from "@/app/components/Landing /hero";
import BottomColor from "../../components/Landing /heroColor";
import Header from "@/app/components/Landing /header";

export default function Landing() {
    
  return (
      <div className="bg-black/120">
       <div className="flex justify-center py-4">
            <Header />
          </div>
        <div className="flex justify-center py-60">
            <Hero />
        </div>

        <div className="flex justify-center">
          <BottomColor />
        </div>
      </div>
  );

}
  