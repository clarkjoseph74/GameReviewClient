'use client'

import {  fetchPlatforms } from '@/apiCalls';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { PcDisplay, Phone, Playstation, Xbox } from 'react-bootstrap-icons';

export type Platform = {
  id: string
  name: string
}
const PlatformsRow = () => {
    const [platforms , setPlatforms] = useState<Platform[]>([]);
    useEffect(()=>{
        const getPlats = async () =>{
            try {
                
                const plats : Platform[] = await fetchPlatforms();
                setPlatforms(plats);
            } catch (error) {
                console.log(error);
            }
        };
        getPlats();
    },[]);
  return (
    <>
     <div className='flex items-center justify-between'>
            <div className='text-xl'>Platforms</div>
            {/* <Button variant={"link"}>View All &gt; </Button> */}
        </div>
    <div className='h-[50px] flex items-center justify-start gap-2 overflow-x-clip'>
        {
            platforms && platforms.map(platform => getIcon(platform.name))
        }
    </div>
        </>
  )
}
const getIcon = (platform: string) =>{
    if(platform.toLocaleLowerCase() === "xbox"){
        return <div className='flex items-center justify-center gap-2 bg-green-500 px-2 py-1 rounded-md text-white'>
            <Xbox size={18} />
            <span className='font-mono font-bold text-lg'>Xbox</span>
        </div>
    }else if(platform.toLocaleLowerCase() === "playstation"){
         return <div className='flex items-center justify-center gap-2 bg-blue-600 px-2 py-1 rounded-md text-white'>
            <Playstation size={22}/>
            <span className='font-mono font-bold text-lg'>Playstation</span>
        </div>
    }else if(platform.toLocaleLowerCase() === "pc"){
         return <div className='flex items-center justify-center gap-2 bg-teal-600 px-2 py-1 rounded-md text-white'>
            <PcDisplay size={22}/>
            <span className='font-mono font-bold text-lg'>Pc</span>
        </div>
    }else if(platform.toLocaleLowerCase() === "mobile"){
        return <div className='flex items-center justify-center gap-2 bg-slate-600 px-2 py-1 rounded-md text-white'>
            <Phone size={22}/>
            <span className='font-mono font-bold text-lg'>Android/ios</span>
        </div>
    }else{
        return null;
    }
}
export default PlatformsRow