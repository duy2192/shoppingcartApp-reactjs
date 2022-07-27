import React from 'react';

export function OrderItem() {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 cursor-pointer">
      <th
        scope="row"
        className="flex flex-col py-4 px-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
      >
        <span className="">1239123123129312939</span>
        <span className="">1239123123129312939</span>
      </th>
      <td className="py-4 px-6">
        <span>29/03/2022</span>
      </td>
      <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">Laptop</td>
      <td className="py-4 px-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem esse et enim recusandae ratione unde,
        commodi quia vero ea obcaecati voluptatibus cumque tempora iure fugit, consequuntur, praesentium odio
        ducimus sint.
      </td>
      <td className="py-4 px-6">$2999</td>
    </tr>
  );
}
