import React from 'react'
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

function HomePage() {
    console.log('HomePage rendered');
  return (
    <MainLayout>
      <div className='bg-light p-5 mt-4 rounded-3'>
            <h1> POS System</h1>
            <p>If you have an issue, call 077 690 626 7</p>
            <Link to='/pos' className='btn btn-primary'>Click here to sell products</Link>
            
          </div>
    </MainLayout>
  );
}

export default HomePage
