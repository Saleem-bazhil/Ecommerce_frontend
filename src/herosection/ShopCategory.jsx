import React from 'react';
import CategoryCard from './CategoryCard';
import FeaturesProduct from './FeaturesProduct';
import TrendingCard from './TrendingCard';


const ShopCategory = () => {
  return (
   <section className="min-h-screen container mx-auto back px-12 py-20 ">
    <h2 className='text-white text-center font-playfair text-4xl md:text-5xl font-bold mb-4'>Shop by Category</h2>
    <p className='text-center text-muted-foreground text-lg mb-12'>Explore our curated collections</p>
        <CategoryCard/>
        <FeaturesProduct/>
   </section>
  )
}

export default ShopCategory