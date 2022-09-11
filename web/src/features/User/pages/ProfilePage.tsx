import React from 'react';
import Profile from '../components/Profile';

function InformationPage() {
  return (
    <div className=" ">
      <h1 className="border-b-2 text-2xl font-normal pb-2">Thông tin cá nhân</h1>

      <div className="mt-8">
        <Profile />
      </div>
    </div>
  );
}

export default InformationPage;
