import Authpage from "@/app/components/auth/page"

export default function(){
    return(
        <>
        <div className="flex justify-center items-center min-h-scren">
            <Authpage type={"signup"} />
        </div>
        </>
    )
}