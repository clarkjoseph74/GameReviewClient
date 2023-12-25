'use client'

import { fetchCategories } from '@/apiCalls';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { Category } from '../categories/columns';

const CategoriesRow = () => {
    const [categories , setCategories] = useState<Category[]>([]);
    useEffect(()=>{
        const getCats = async () =>{
            try {
                
                const cats :Category[]  =await fetchCategories();
                setCategories(cats);
            } catch (error) {
                console.log(error);
            }
        };
        getCats();
    },[]);
  return (
    <>
     <div className='flex items-center justify-between'>
            <div className='text-xl'>Categories</div>
            <Button variant={"link"}>View All &gt; </Button>
        </div>
    <div className='h-[50px] flex items-center justify-start gap-2 overflow-x-clip'>
        {
            categories && categories.map(category => <div className='bg-red-600 p-1 text-center min-w-[100px] rounded-lg text-white font-bold font-mono cursor-pointer  '>{category.name}</div>)
        }
    </div>
        </>
  )
}

export default CategoriesRow