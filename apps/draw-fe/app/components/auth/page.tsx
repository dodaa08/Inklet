"use client";

import { useState } from "react";
import { FC } from "react";
import { Button } from "@repo/ui/button";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {toast} from "react-toastify";

type Auth = {
    type : string,
}

const Authpage : FC<Auth> = ({type})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [eye, setEye] = useState(true);
    const router = useRouter();

    const buttonLabel = type == "signup" ? "Already have an account? Sign In" : "don't have an account? Sign Up";
    const label  = type === "signin" ? "signin" : "signup";
    const route = type === "signin" ? "signup" : "signin";

    const handleeye = async ()=>{
        setEye(!eye)
    }



    const GoogleSignIn = async ()=>{
        try{
            await signIn("google", {
                callbackUrl : "/"
            })
        }
        catch(error){
           console.error(error)
        }
    }


    const GithubSignIn = async ()=>{
        try{
            await signIn("github", {
                callbackUrl : "/"
            });
        }
        catch(error){
            console.error(error)
        }
    }


    const CredsSignin = async ()=>{
       try{
        const res = await signIn("credentials", {
            redirect : false,
            email,
            password
        });
        if(res?.ok){
            toast.success("Login successful!");
        }
       }
       catch(error){
          console.error(error);
          toast.error("Invalid creds..")
       }
    }

    return(
        <>
        <div className="flex justify-center py-28">

          <div className="flex flex-col border-2 border-gray-800 w-max  px-5 py-5 rounded-xl gap-5">
            
            <div className="flex justify-center">
              <h1 className="text-3xl text-white font-sans text-bold">{label}</h1>
            </div>

            <div className="flex flex-col  mt-5 mb-2 gap-5">
                 <div className="flex justify-center bg-white text-black py-2 px-20 gap-3 hover:cursor-pointer hover:bg-white/95 transition duration-400">
                    <img src="https://imgs.search.brave.com/7oRMZ5ifuTywDSOtzsemEMjW7jsmHMLZeDMZPLycObU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmVjdG9ybG9nby56/b25lL2xvZ29zL2dv/b2dsZS9nb29nbGUt/dGlsZS5zdmc" alt="" className="w-5 bg-white" />
                    <button onClick={GoogleSignIn} className="text-l font-sans">Sign up with Google</button>
                 </div>

                 <div className="flex justify-center border-2 border-gray-600 text-white py-1 px-20 gap-3 hover:cursor-pointer hover:bg-gray-900 transition duration-400">
                    <img src="https://imgs.search.brave.com/oYXa5uDIIlHjNY3u9bMrzhmOpTH2-w1M6vZo3rqFgBQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMTEzNzYvMTEz/NzY0NDYucG5n" alt="" className="w-8 bg-black" />
                    <button onClick={GithubSignIn} className="text-l font-sans ">Sign up with Github</button>
                 </div>
            </div>

            <div className="flex flex-row ">
                <div className="border-t flex-grow border-gray-400  mt-3"></div>
                 <h1 className="mx-4">or</h1>
                 <div className="border-t flex-grow border-gray-400 mt-3"></div>
            </div>

            <div className="flex flex-col ">
                
                <h1 className="text-xl font-sans mb-2">Email</h1>
                <div className="mb-4">
                <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="you@email.com"
  className="py-2 w-92 px-4 rounded-xl text-white border-2 border-gray-800 focus:outline-none"
/>
                </div>

                <h1 className="text-xl font-sans mb-4">Password</h1>
                <div className="mb-4 flex gap-2">
                    <input type={
                        eye ? "password" : "text"
                    } value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" className="py-2 w-92 px-4 rounded-xl text-white border-2 border-gray-800 focus:outline-none"/>
                   <button onClick={handleeye} className="py-4 ml-2 cursor-pointer">
                    {
                        eye ? <>
                         <FaEyeSlash />
                        </> : <>
                         <FaEye />
                        </>
                    }
                    </button>
                </div>
            </div>

            <div className="flex flex-col justify-center">
          <Button
            onClick={CredsSignin}
            className="border-2 border-gray-800 py-2 px-40 rounded-xl bg-orange-500"
            children={label}
          />
          <div className="flex justify-center">
            <button onClick={()=>router.push(`/auth/${route}`)} className="mt-4 text-gray-400 cursor-pointer hover:text-gray-500 transition duration-400" children={buttonLabel}>
            </button>
          </div>
        </div>
          </div>
        </div>
        </>
    )
}

export default Authpage