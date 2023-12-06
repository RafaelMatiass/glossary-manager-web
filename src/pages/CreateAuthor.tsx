import * as React from "react";
import '../app/globals.css';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import FormAuthor from "@/app/components/FormNewAuthor";
import { ToastContainer } from "react-toastify";


export default function CreateGlossary() {
 return (
  <>
  <Header/>
  <div className='h-screen flex flex-col'>
    <div className='flex flex-1'>
      <Sidebar/>
      {/* Conteúdo */}
      <div className='bg-gray-50 h-full flex flex-col grow'>
        <div className="flex flex-col m-auto px-32 bg-gray-200  dark:border-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 ">
          <h1 className="text-center dark:text-gray-900 text-4xl p-12 mb-2 font-extrabold">Cadastro do Autor</h1>
          {/* Formulário do Autor */}
          <ToastContainer />
          <FormAuthor/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
  </>
 )
}