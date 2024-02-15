import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios';
import { Zoom, toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';


function POSPage() {

  const [products,setProducts]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [cart,setCart]=useState([]);
  const [totalAmount,setTotalAmount]=useState(0);

  const toastOptions = {
    autoClose: 1000,
    pauseOnHover: true,
    newestOnTop:true,
    position: "top-center",
    draggable: true,
    progress: 0,
    theme: "colored",
    transition: Zoom,
    newestOnTop:true
  };


  useEffect(()=>{
    fetchProducts();

  },[]);

  useEffect(()=>{
   console.log(products);
  },[products]);

  useEffect(()=>{
    let newTotalAmount = 0;
    cart.forEach(icart=>{
      newTotalAmount=newTotalAmount+parseInt(icart.totalAmount);
    })
    setTotalAmount(newTotalAmount);

  },[cart])
  





  const fetchProducts = async()=>{
    setIsLoading(true);
    //const result = await axios.get('/api/v1/products/getAllProducts');
    //setProducts(await result.data);
    try {
      const result = await axios.get('http://localhost:8080/api/v1/products/getAllProducts');
      //setProducts(await result.data);
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


  const addProductToCart=async(product)=>{
    let findProductInCart=await cart.find(i=>{
        return i.productID === product.productID
    });

    if(findProductInCart){
      let newCart=[];
      let newItem;

      cart.forEach(cartItem=>{
        if(cartItem.productID===product.productID){
          newItem={
            ...cartItem,
            quantity:cartItem.quantity+1,
            totalAmount:cartItem.productPrice*(cartItem.quantity+1)
          }
          newCart.push(newItem);
        } else{
          newCart.push(cartItem);
        }

      });
      setCart(newCart);
      toast.success(`Added ${newItem.productName} to cart`,toastOptions)

    }else{
      let addingProduct={
        ...product,
        'quantity':1,
        'totalAmount':product.productPrice,

    }
    setCart([...cart,addingProduct]);
    toast.success(`Added ${product.productName} to cart`,toastOptions)


  }
};

const removeProduct=async(product)=>{
  const newCart=cart.filter(cartItem=>cartItem.productID !== product.productID);
  setCart(newCart);
}

const componentRef = useRef();

const handleReactToPrint = useReactToPrint({
  content: () => componentRef.current,
});

const handlePrint=()=>{
   handleReactToPrint();
}



  
  return (
    <MainLayout>
      
      <div className='row'>
        <div className='col-lg-8'>
          {isLoading ? 'Loading': <div className='row'> 
          {products.map((product,key)=>
            <div  key={key}className='col-lg-4 mb-4'>
              <div className='pos-item px-3 text-center border '  onClick={()=>addProductToCart(product) }>
                <p>{product.productName}</p>
                <img src={product.img} className='img-fluid' alt={product.name}/>
                <p>Rs.{product.productPrice}</p>
              </div>
            </div>
          )}
          </div>}
      </div>
      

      <div className='col-lg-4'>
        <div style={{display:"none"}}>
          <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
        </div>
        <div className='table-responsive bg-dark'>
          <table className='table table-responsive table-dark table-hover'>
            <thead>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Price</td>
                <td>Quentity</td>
                <td>Total</td>
                <td>Action</td>
              </tr>

            </thead>
            <tbody>
              {cart?cart.map((cartProduct,key)=><tr key={key}>
                <td>{cartProduct.productID}</td>
                <td>{cartProduct.productName}</td>
                <td>{cartProduct.productPrice}</td>
                <td>{cartProduct.quantity}</td>
                <td>{cartProduct.totalAmount}</td>
                <td>
                  <button className='btn btn-danger btn-sm' onClick={()=> removeProduct(cartProduct)}>Remove</button>
                </td>
              </tr>)
              :'No Item in Cart'}

            </tbody>
          </table>
          <h2 className='px-2 text-white'>Total Amount : Rs. {totalAmount}</h2>
        </div>


        <div className='mt-3'> 
         {totalAmount !== 0 ? <div>
          <button className='btn btn-primary' onClick={handlePrint}>Print Bill</button>
         </div> :'Please add a products to the cart first'

         }
        
          
           
        </div>
        
      </div>
      </div>
    </MainLayout>
  );
}

export default POSPage;
