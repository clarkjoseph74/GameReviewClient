'use client'

import { fetchCategories } from "@/apiCalls";
import { useEffect, useState } from "react"

import { ColumnDef } from '@tanstack/react-table';
import { columns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import DataTable from "./Data-table";
import { useRouter } from "next/navigation";



const Categories = () => {
    const [categories , setCategories] = useState([]);
    const [deletedItem , setDeletedItem] = useState(null);

    if(deletedItem){
        categories.splice(categories.indexOf(categories[deletedItem]) , 1);
    }
    useEffect(()=>{
        const getCats = async () =>{
            try {
                const cats =await fetchCategories();
                setCategories(cats);
            
            } catch (error) {
                console.log(error)
            }
        }
        getCats();
    } ,[])
  return (
    <div className="m-10 flex flex-col">
        <h2 className="font-bold text-2xl mb-4">Categories</h2>
        
        <DataTable data={categories}/>
        
        </div>
  )
}

export default Categories