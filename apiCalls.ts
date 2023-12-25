
import axios from 'axios';



export interface Game {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  category:string | null;
  platforms: string[];
}
const apiUrl = 'https://localhost:7121/api/';

export const fetchGames = async (categoryId : string | null = null)=> {
  try {
    var response = await fetch(apiUrl+'games');
    if(categoryId != null){
        response = await fetch(apiUrl+'games/category/' +categoryId);
    }
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response)
    const data:Game[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};


export const fetchCategories = async () => {
  try {
    const response = await fetch(apiUrl+'category');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const fetchPlatforms = async () => {
  try {
    const response = await fetch(apiUrl+'platforms');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};




export const createGame = async (
  name: string,
  description: string,
  image: File,
  categoryId: string,
  listOfPlatformIds: string[]
) => {
  try {
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    formData.append('Image', image);
    formData.append('CategoryId', categoryId);
    formData.append('platformIds', JSON.stringify(listOfPlatformIds));
    listOfPlatformIds.forEach((value, index) => {
  formData.append(`platformIds[${index}]`, value);
});

    const response = await axios.post(apiUrl + 'games', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
};


export const deleteCategory = async (id:number) => {
  try {
    const response = await axios.delete(apiUrl+'category/'+id);
    console.log(response)
    const data = await response.data;
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};