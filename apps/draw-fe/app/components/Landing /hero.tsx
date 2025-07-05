import Link from "next/link";
import { Button } from "@repo/ui/button";
import {  toast } from "react-toastify"; // if you're using react-toastify

const Hero = ()=>{
    const handleToast = ()=>{
        toast.error("User not logged In..");
        return {};
    }

    return(
        <>
        
        <div className="flex flex-col gap-10">
            
            <div className="flex justify-center py-10">
                <h1 className="text-3xl text-gray-200 font-mono">Create Rooms for Chats and Scribble <br /> with Frenz :)</h1>
            </div>
            

            <div className="flex justify-center">
                <img src="https://imgs.search.brave.com/yZTW97vO3J-vTWsufmgsP_bJPLGja9Xz8CMCrjoXvyg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waXhs/ci1wcm9tb3MuczMu/YW1hem9uYXdzLmNv/bS9zZW8tY29udGVu/dHMvYWxsLWluLW9u/ZS1kcmF3LXRvb2wt/dHJhbnNwYXJlbnQu/cG5n" alt="" className="w-120 rounded-xl border-b border-gray-700 shadow-lg" />
            </div>
 

            <div className="flex justify-center">
                <Button appName={handleToast} className="text-xl bg-orange-600 shadow-xl rounded-xl py-2 px-5 border-2 border-gray-800 cursor-pointer hover:bg-orange-500 transition duration-400" children="Get Started" />
            </div>


        </div>
        
        </>
    );

}

export default Hero;