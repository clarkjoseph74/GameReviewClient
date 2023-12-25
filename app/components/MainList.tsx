'use client'
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import GameBanner from './GameBanner';
import { Game, fetchGames } from '@/apiCalls';
import { Skeleton } from '@/components/ui/skeleton';

const MainList = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


useEffect(()=>{
    const fetchData = async () => {
        setLoading(true);
      try {
        const gamesData = await fetchGames();
        setGames(gamesData);
        
        setLoading(false);

      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Error fetching games:', error);
        setLoading(false);

      }
}
    fetchData();}
,[]);
  return (
    <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
            <div className='text-xl'>Main List</div>
            <Button variant={"link"}>View All &gt; </Button>
        </div>
      { loading  ? 
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-2 h-full gap-4'>
            <Skeleton  className='h-[300px]'/>
            <Skeleton  className='h-[300px] '/>
            <Skeleton  className='h-[300px] '/>
            <Skeleton  className='h-[300px] '/>
            <Skeleton  className='h-[300px] '/>
          </div>
      : <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-2 h-full gap-4'>
         {
           games.map(game => (<GameBanner key={game.id} name={game.name}  description={game.description} image={game.imageUrl} platforms={game.platforms} category={game.category!}/>))
        }
       </div>}
    </div>
  )
}

export default MainList