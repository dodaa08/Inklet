"use client";

// import { Button } from "@repo/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {toast} from "react-toastify";
import { useRouter } from "next/navigation";
// import{ CustomDropdownButton } from "../../../../../packages/my-app/components/ui/dropdownMenu"
import { Button } from "@repo/compo/components/button";

const Header = ()=>{

    const [isSignIn, setSignin] = useState("LogIn");
    const {data : session, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
          setSignin("signOut");
        } else if (status === "unauthenticated") {
          setSignin("LogIn");
        }
      }, [status]);

    const handlebtn = async () => {
        try {
          if (session) {
            const res = await signOut({ redirect: false });
            router.refresh();
            toast.success("Logged Out");
          } else {
            router.push("/auth/signin");
          }
        } catch (error) {
          console.error(error);
        }
      };

    return(
        <>
        <div className="flex gap-110">
            <div>
                <Link href="/">
             <h1 className="text-3xl font-serif hover:cursor-pointer">Inklet</h1>
                </Link>
            </div>

            <div className="flex justify-center gap-6">
            <Link  href="/">
                 <Button className="text-xl font-sans  font-bold hover:text-orange-500 rounded-xl  py-2 px-8 hover:cursor-pointer transition duration-400" children="Home" /> 
                </Link>

             
                 <Button className="text-xl font-sans font-bold hover:text-orange-500 rounded-xl  py-2 px-8 hover:cursor-pointer transition duration-400" children="Draw" /> 

            </div>

            <div className="text-white font-sans flex gap-3 ">
            <button onClick={handlebtn} className="border-2 border-gray-900 rounded-xl  bg-orange-500 py-2 px-6 hover:cursor-pointer hover:bg-orange-600 transition duration-400 font-bold" children={isSignIn} /> 

            {/* <Button variant="destructive">Secondary</Button> */}
      
            
            </div>
        </div>  
        </>
    )
}

export default Header;

