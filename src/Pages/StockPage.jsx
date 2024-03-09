import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios';



function StockPage() {
  const [stock, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    setIsLoading(true);

    try {
      const result = await axios.get('http://localhost:8080/api/v1/stock');
      console.log('API Response:', result.data);

      if (result.data && result.data.content && Array.isArray(result.data.content)) {
        setStock(result.data.content);
      } else {
        console.error('Invalid data format:', result.data);
        setStock([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setStock([]); 
    }
    setIsLoading(false);
  };

  return (
    <div>
      <MainLayout>
        <div className="row">
          <div className="col-lg-8">
            {isLoading ? (
              'Loading'
            ) : stock && stock.length > 0 ? (
              <div className="row">
                {stock.map((item, key) => (
                  <div key={key} className="col-lg-4 mb-4">
                    <div className="pos-item px-3 text-center border ">
                      <p>{item.stockId}</p>
                      <img src={item.img} className="img-fluid" alt={item.name} />
                      <p>{item.stockQuantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No stock data available.</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {isLoading ? (
              'Loading'
            ) : stock && stock.length > 0 ? (
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.stockQuantity}</td>
                      <td>Some Data</td>
                      <td>Another Data</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No stock data available.</p>
            )}
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default StockPage;
