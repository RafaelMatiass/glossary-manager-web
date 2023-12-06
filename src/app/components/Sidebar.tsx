import React from "react";
import { useState } from 'react';
import Link from "next/link";
import { Languages, FilePlus2, Newspaper, ClipboardList, Home, User, Settings, LogOut, ClipboardType, UserPlus, FileType2 } from "lucide-react";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState<string>('');

  const handleClick = (link: string) => {
    setActiveLink(link === activeLink ? '' : link);
  };

 return (
  <aside className='w-64 bg-slate-100 text-gray-800'>
   <div className="flex flex-col top-0 left-0 w-64 h-full border-r">
    <div className="overflow-y-auto overflow-x-hidden flex-grow">
     <ul className="flex flex-col space-y-2">
      <li className="p-3">
       <div className="flex flex-row items-center h-8">
        <div className="text-2xl font-semibold tracking-wide text-gray-500">Menu</div>
       </div>
      </li>
      <li>
       <Link href="/home" className={`relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
            activeLink === "/home" ? 'bg-gray-200 text-indigo-500' : ''
          }`}
          onClick={() => handleClick("/home")}
        ><span className="inline-flex justify-center items-center ml-4">
          <Home size={30} color="#00219a" strokeWidth={1.5} />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Home</span>
       </Link>
      </li>
      <li>
        <Link href="GlossaryList" className={`relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
            activeLink === "GlossaryList"  ? 'bg-gray-200 text-indigo-500' : ''
          }`}
          onClick={() => handleClick("GlossaryList")}
        ><span className="inline-flex justify-center items-center ml-4">
          <ClipboardList size={30} color="#00219a" strokeWidth={1.5} />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Listar Glossários</span>
      </Link>
      </li>
      <li>
       <Link href="TermsList" className={`relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
            activeLink === "TermsList"  ? 'bg-gray-50 text-indigo-500 border-indigo-500' : ''
          }`}
          onClick={() => handleClick("TermsList" )}
        >
        <span className="inline-flex justify-center items-center ml-4">
          <ClipboardType size={30} color="#00219a" strokeWidth={1.5} />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Listar Termos</span>
       </Link>
      </li>
      <li>
       <Link href="SourceList" className={`relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
            activeLink === "SourceList"  ? 'bg-gray-50 text-indigo-500 border-indigo-500' : ''
          }`}
          onClick={() => handleClick("SourceList" )}
        >
        <span className="inline-flex justify-center items-center ml-4">
          <FileType2 size={30} color="#00219a" strokeWidth={1.5} />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Listar Fontes</span>
       </Link>
      </li>
      
      <li className="p-3">
       <div className="flex flex-row items-center h-8">
        <div className="text-2xl font-semibold tracking-wide text-gray-500">Gerenciamento</div>
       </div>
      </li>
      <li>
       <Link href="CreateGlossary" className={`relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
            activeLink === "CreateGlossary" ? 'bg-gray-200 text-indigo-500' : ''
          }`}
          onClick={() => handleClick("CreateGlossary")}
        >
        <span className="inline-flex justify-center items-center ml-4">
          <Newspaper size={30} color="#00219a" strokeWidth={1.5} />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Cadastar novo glossário</span>
       </Link>
      </li>
      <li>
       <Link href="CreateTerm" className={`relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
            activeLink === "CreateTerm" ? 'bg-gray-200 text-indigo-500' : ''
          }`}
          onClick={() => handleClick("CreateTerm")}
        >
        <span className="inline-flex justify-center items-center ml-4">
          <FilePlus2 size={30} color="#00219a" strokeWidth={1.5} />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Cadastrar novo termo</span>
       </Link>
      </li>
      <li>
       <Link href="CreateTranslation" className={`relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
            activeLink === "CreateTranslation" ? 'bg-gray-200 text-indigo-500' : ''
          }`}
          onClick={() => handleClick("CreateTranslation")}
        >
        <span className="inline-flex justify-center items-center ml-4">
          <Languages size={30} color="#00219a" strokeWidth={1.5} />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Cadastrar nova tradução</span>
      </Link>
      </li>
      <li>
       <Link href="CreateAuthor" className={`relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
            activeLink === "CreateAuthor" ? 'bg-gray-200 text-indigo-500' : ''
          }`}
          onClick={() => handleClick("CreateAuthor")}
        >
        <span className="inline-flex justify-center items-center ml-4">
          <UserPlus size={30} color="#00219a" strokeWidth={1.5}  />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Cadastrar autor</span>
      </Link>
      </li>
      <li className="p-3">
       <div className="flex flex-row items-center h-8">
        <div className="text-2xl font-semibold tracking-wide text-gray-500">Configurações</div>
       </div>
      </li>
      <li>
       <Link href="#" className={`relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
            activeLink === "#"  ? 'bg-gray-200 text-indigo-500' : ''
          }`}
          onClick={() => handleClick("#")}
        >
        <span className="inline-flex justify-center items-center ml-4">
          <User size={30} color="#00219a" strokeWidth={1.5} />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Perfil</span>
       </Link>
      </li>
      <li>
       <Link href="#" className={`relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
            activeLink === "#"  ? 'bg-gray-50 text-indigo-500 border-indigo-500' : ''
          }`}
          onClick={() => handleClick("#")}
        >
        <span className="inline-flex justify-center items-center ml-4">
          <Settings size={30} color="#00219a" strokeWidth={1.5} />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Settings</span>
       </Link>
      </li>
      <li>
       <Link href="#" className={`relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
            activeLink === "#" ? 'bg-gray-200 text-indigo-500' : ''
          }`}
          onClick={() => handleClick("#")}
        >
        <span className="inline-flex justify-center items-center ml-4">
          <LogOut size={30} color="#00219a" strokeWidth={1.5} />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
       </Link>
      </li>
     </ul>
    </div>
   </div>
   {/* </div> */}
  </aside>
 )
}