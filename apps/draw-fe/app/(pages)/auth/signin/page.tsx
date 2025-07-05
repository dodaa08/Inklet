import Authpage from "@/app/components/auth/page"

// Option 1: Add async operation to trigger loading.tsx
export default async function Page(){
    

    return(
        <>
        <div className="flex justify-center items-center min-h-scren">  
            <Authpage type="signin" />
        </div>
        </>
    )
}