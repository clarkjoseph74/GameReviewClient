'use client'
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Category } from './columns';
import { Button } from '@/components/ui/button';
import { deleteCategory } from '@/apiCalls';
import { useRouter } from 'next/navigation';
const DataTable = ({ data } : {data:Category[] }) => {
  const [deletedItem , setDeletedItem] = useState(null);
    const router = useRouter();
   if (deletedItem) {
      // If the condition is met, navigate to the desired route
      setDeletedItem(null);
      router.push('/');
    } else {
      // If the condition is not met, handle accordingly (optional)
      console.log('Condition not met, not navigating.');
    }


  const handleDelete = async (id:number) => {
    try {
      const res = await deleteCategory(id);
      setDeletedItem(res);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b w-[10%] bg-zinc-50">ID</th>
            <th className="py-2 px-4 border-b text-start bg-zinc-100">Name</th>
            <th className="py-2 px-4 border-b w-[50%] bg-zinc-50">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-zinc-300">
              <td className="py-2 px-4 text-center bg-zinc-100">{item.id}</td>
              <td className="py-2 px-4 text-start bg-zinc-200">{item.name}</td>
              <td className="py-2 px-4 text-center bg-zinc-100 flex gap-4 items-center justify-center">

                  <AlertDialog>
                    <AlertDialogTrigger><Button variant={"outline"} >Edit</Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                    <AlertDialog >
                    <AlertDialogTrigger><Button variant={"default"}  size={'sm'}>Delete</Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>handleDelete(parseInt(item.id))}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>


                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
