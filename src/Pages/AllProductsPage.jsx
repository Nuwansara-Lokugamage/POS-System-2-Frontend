import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';

function AllProductsPage() {
  

  const [products,setProducts]=useState([]);
  const [isLoading,setIsLoading]=useState(false);

  useEffect(()=>{
    fetchProducts();

  },[]);

  const fetchProducts = async()=>{
    setIsLoading(true);
   
    try {
      const result = await axios.get('http://localhost:8080/api/v1/products/getAllProducts');
      console.log('API Response:', result.data);
      
      if (result.data && Array.isArray(result.data.content)) {
        setProducts(result.data.content);
      } else {
        console.error('Invalid data format:', result.data);
      }




    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setIsLoading(false);

  };




  return (
   
    <MainLayout>
       
       <div className='row'>
        <div className='col-lg-8'>
          {isLoading ? 'Loading': <div className='row'> 
          {products.map((product,key)=>
            <div  key={key}className='col-lg-4 mb-4'>
              <div className='pos-item px-3 text-center border '>
                <p>{product.productName}</p>
                <img src={product.img} className='img-fluid' alt={product.name}/>
                <p>Rs.{product.productPrice}</p>
              </div>
            </div>
          )}
          </div>}
      </div>
      </div>

    </MainLayout>
  )

  
  
}

export default AllProductsPage
