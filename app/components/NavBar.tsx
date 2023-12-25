'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


const NavBar = () => {
    const router = useRouter();
  return (
    <div className="flex items-center justify-between py-4">

    <div className="font-extrabold text-2xl">Game<span className="text-primary">Review</span>.</div>
    <div className="flex gap-4">
        <Button onClick={()=>router.push('/categories')}> Categories</Button>
    <Button variant={"outline"} onClick={()=>router.push('/addgame')}> Add Game</Button>
    </div>
    
    </div>
  )
}

export default NavBar