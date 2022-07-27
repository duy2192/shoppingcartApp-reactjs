import React from 'react';
import { Account } from '../components/Account';

function AccountPage() {
  return (
    <div className="container ">
      <h1 className="border-b-2 text-2xl font-normal pb-2">Thông tin tài khoản</h1>

      <div className="mt-8">
        <Account />
      </div>
    </div>
  );
}

export default AccountPage;
