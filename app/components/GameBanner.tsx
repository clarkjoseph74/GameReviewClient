import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { Xbox , Playstation , PcDisplay , Phone} from 'react-bootstrap-icons'
const GameBanner = ({name,description ,image, platforms,category}:{name:string , description:string,image:string | null,category:string ,platforms: string[]} ) => {
  return (
    <div className={cn('relative h-[300px] rounded-md overflow-hidden object-cover object-top border-[3px] border-red-700 group transition-all duration-500 ' , image ? ' bg-green-300':"bg-black")}>
       {
        image &&  <Image src={image!} alt='image' layout='fill'
    objectFit='cover' className='overflow-hidden object-cover object-top h-[full] w-full  flex items-center justify-center' /> 
       }
       <div className='absolute h-full w-full bg-gradient-to-t from-red-500 to-white group-hover:opacity-40  opacity-0 transition-all duration-500 flex items-center justify-center'>
        
       </div>
      <span className='bg-red-700 absolute top-0 right-0 text-white font-bold px-1 rounded-bl-md'>{category}</span>
        <div className='absolute bottom-0 w-full group-hover:opacity-100 opacity-0 transition-all duration-500'>
           
        <div className=' w-full bg-white h-6 bottom-0 overflow-hidden rounded-b- flex items-center justify-center font-light tracking-wider'>
           {
               platforms.length == 0?  null :<span className='text-white flex flex-row items-center justify-center gap-2'>
                {
                    platforms.map(platform => getIcon(platform))
                }
                </span>
           } 
        </div>
           <h3 className=' text-white font-bold text-center bg-red-500 font-mono'>{name}</h3>
        </div>
        
    </div>
  )
}

const getIcon = (platform: string) =>{
    if(platform.toLocaleLowerCase() === "xbox"){
        return <Xbox size={18} color='green'/>
    }else if(platform.toLocaleLowerCase() === "playstation"){
        return <Playstation size={22} color='dodgerblue'/>
    }else if(platform.toLocaleLowerCase() === "pc"){
        return <PcDisplay size={18} color='red'/>
    }else if(platform.toLocaleLowerCase() === "mobile"){
        return <Phone size={18} color='black' className='font-bold'/>
    }else{
        return null;
    }
}

export default GameBanner