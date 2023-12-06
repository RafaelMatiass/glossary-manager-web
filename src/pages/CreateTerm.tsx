import React from "react";
import '../app/globals.css';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import FormTerm from "../app/components/FormNewTerm"
import { ToastContainer } from 'react-toastify';

export default function CreateTerm(){
 return(
  <>
  <Header/>
   <div className='h-screen flex flex-col'>
    <div className='flex flex-1'>
     <Sidebar/>
     {/* Conteúdo */}
     <div className='bg-gray-50 h-full flex flex-col grow pb-24'>
      <div className="flex flex-col m-auto px-32 mt-12 bg-gray-200 dark:border-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 ">
        <h1 className="text-center dark:text-gray-900 text-4xl p-12 mb-2 font-extrabold">Cadastro de Termo</h1>
        {/* Formulário do Termo */}
        <ToastContainer />
        <FormTerm/>
      </div>
     </div>
    </div>
    <Footer/>
   </div>
  </>
 );
}