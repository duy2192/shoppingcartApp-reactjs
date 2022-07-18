import React from 'react'

export default function Footer() {
  return (
    <footer className='mt-10 flex justify-center items-center bg-slate-800 h-20'>
        <span className='font-semibold text-slate-50'>Copyright © </span>
        <a className='text-slate-50 hover:text-slate-300' href="https://da29.online/">
          da29.online
        </a>
        {' ' + new Date().getFullYear()}
      </footer>
  )
}
