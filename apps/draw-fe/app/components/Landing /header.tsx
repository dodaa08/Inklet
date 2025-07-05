import { Button } from "@repo/ui/button";
import Link from "next/link";

const Header = ()=>{
    return(
        <>
        <div className="flex gap-160">
            <div>
                <Link href="/">
             <h1 className="text-3xl font-serif hover:cursor-pointer">Inklet</h1>
                </Link>
            </div>

            <div className="text-white font-sans flex gap-3 ">

               
               <Link  href="/auth/signin">
                 <Button className="border-2 border-gray-900 rounded-xl  bg-orange-500 py-2 px-6 hover:cursor-pointer hover:bg-orange-600 transition duration-400" children="LogIn" /> 
                </Link>
            

            </div>
        </div>
        </>
    )
}

export default Header;
