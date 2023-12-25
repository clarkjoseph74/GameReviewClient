'use client'
import { Xbox } from 'react-bootstrap-icons'
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,

} from "@/components/ui/select"
import { createGame, fetchCategories, fetchPlatforms } from '@/apiCalls';
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';
import MultiSelect from '../components/MultiSelector';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
 type Category = {
    id : string;
    name : string;
  }

const AddGame: React.FC = () => {
    const router = useRouter();
  // State variables to manage form data
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
   const [imagePreview, setImagePreview] = useState<string | null>(null); // Added state for image preview
  const [category, setCategory] = useState<string>('0');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [platformsList, setPlatformsList] = useState([]);

 
  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGameHandler();
    console.log('Form submitted:', { name, description, image, category, platforms });
    // Reset form fields if needed
    setName('');
    setDescription('');
    setImage(null);
    setCategory('0');
    setPlatforms([]);
  };
console.log(category)
  useEffect(()=>{
    const getCats = async () => {
        try {
            
            const  categories : Category[] = await fetchCategories();
            setCategoriesList(categories);
        } catch (error) {
            console.log(error);
        }
    }
        const getPlatforms = async () => {
        try {
            
            const  plats  = await fetchPlatforms();
            setPlatformsList(plats);
        } catch (error) {
            console.log(error);
        }
    }
    getCats();
    getPlatforms();
  },[]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files ? e.target.files[0] : null;

    if (selectedImage) {
      setImage(selectedImage);

      // Read the selected image and set it as the preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleMultiSelectValues = (data: string[]) => {
    setPlatforms(data);
  };
  const addGameHandler =async () =>{
       var game = await createGame
         try {
            
           const game = await createGame(name , description , image! , category , platforms)
            if(game){
                toast.success(`The game with name ${name} has been created successfully`)
            router.replace('/');
            }
        } catch (error) {
            console.log(error);
                toast.error(`There is error while adding this game, Please try again!`)

        }
  }
  return (
    <div className=''>
        {imagePreview && (
           
          <div className="m-4 absolute right-0 top-1/2 -translate-y-1/2 border-2  bg-gradient-to-b from-red-400 to-sky-400 rounded-lg hidden lg:flex flex-col">
             <span className='text-center font-bold text-white text-2xl font-mono'>Selected Image</span>
            <img src={imagePreview} alt="Selected" className=" max-w-[300px] h-auto rounded-md m-3" />
          </div>
        )}

    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Image Upload:</label>
          <input type="file"  onChange={handleImageChange} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Category:</label>
          <Select onValueChange={(value) => setCategory(value) } >
                <SelectTrigger className="w-full" >
                    <SelectValue placeholder={"Select a category"}  >{categoriesList.find(cat => cat.id.toString() === category)?.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    {
                        categoriesList.map((c) =><SelectItem key={c.id} value={c.id}  >{c.name}</SelectItem> )
                    }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Platforms:</label>
          <MultiSelect  values={platformsList} onSelectedPlatforms={handleMultiSelectValues}/>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-red-500 text-white p-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring focus:border-blue-300"
            >
            Submit
          </button>
        </div>
      </form>
        
    </div>
              </div>
  );
};



export default AddGame;
