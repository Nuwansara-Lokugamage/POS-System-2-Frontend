import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {

    const {cart,totalAmount}=props;
    return (
      <div ref={ref} className="p-5 ">
        <h2 className='px-2 text-center' >FOOD Shop</h2>
        <table className='table '>
            <thead>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Price</td>
                <td>Quentity</td>
                <td>Total</td>
                
              </tr>

            </thead>
            <tbody>
              {cart?cart.map((cartProduct,key)=><tr key={key}>
                <td>{cartProduct.productID}</td>
                <td>{cartProduct.productName}</td>
                <td>{cartProduct.productPrice}</td>
                <td>{cartProduct.quantity}</td>
                <td>{cartProduct.totalAmount}</td>
                
              </tr>)
              :''}

            </tbody>
          </table>
          <h2 className='px-2'>Total Amount : Rs. {totalAmount}</h2>
      </div>
    );
  });