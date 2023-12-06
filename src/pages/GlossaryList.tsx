import * as React from "react";
import '../app/globals.css';

import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import EditGlossaryModal from "@/app/components/EditGlossary";

import { ToastContainer } from 'react-toastify';
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Frown, Pencil, Trash2 } from "lucide-react";
import { toast } from 'react-toastify';
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';


export default function GlossaryList() {
  const [glossaries, setGlossary] = useState<any[]>([]);
  const [selectedGlossary, setSelectedGlossary] = useState(null);

  const getGlossary = async () => {
    await api.get('/glossary').then((response) => setGlossary(response.data));
  };

  useEffect(() => {
    getGlossary();
  }, []);

  // Função para atualizar o estado após a exclusão
  const handleDeleteGlossary = async (id: any) => {
    const url = `glossary/${id}`;
    try {
      await api.delete(url);
      setGlossary((prevGlossaries) =>
        prevGlossaries.filter((glossary) => glossary.id !== id)
      );
    toast.success('Glossário excluído com sucesso!')
    } catch {
      toast.error('Erro ao excluir glossário:');
    }
  };

  //modal
  const openModal = (glossary: React.SetStateAction<null>) => {
    setSelectedGlossary(glossary);
  };

  const closeModal = () => {
    setSelectedGlossary(null);
  };


 return (
  <div>
    <Header/>
    <div className='h-screen flex flex-col'>
      <div className='flex flex-1'>
        <Sidebar/>
        {/* Conteúdo */}
        <div className='bg-gray-50 h-full flex flex-col grow'>
          <div className="flex flex-col my-12 mx-52 bg-gray-200  dark:border-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 ">
          <ToastContainer />
            <h1 className="text-center dark:text-gray-900 text-4xl p-12 mb-2 font-extrabold">Lista de Glossários</h1>
            {/* Lista de Glossário */}
            <ul role="list" className="divide-y divide-gray-100 mx-4">
              {glossaries.length > 0 ? (
                glossaries.map((glossary) => (
                  <li key={glossary.id} className="flex justify-between gap-x-6 py-5">
                  <div className='flex min-w-0 gap-x-4' >
                      <div className="min-w-0 flex-auto">
                        <Link href={`/Disciplinies?glossaryId=${glossary.id}`} className="ml-4 text-lg font-semibold leading-6 text-gray-900 hover:text-blue-500">
                          {glossary.name}
                        </Link>
                        <dd className="ml-4 mt-1 truncate text-sm leading-5 text-gray-500">{glossary.description}</dd>
                      </div>
                    </div>
                    <div className="mr-4 hidden shrink-0 sm:flex sm:justify-content sm:items-end space-x-4">
                      <span
                        className="cursor-pointer"
                        onClick={() => openModal(glossary)}
                      >
                        <button><Pencil/></button>
                      </span>
                      <span className="">
                        <button className="" onClick={() => {handleDeleteGlossary(glossary.id)}}><Trash2 color="#f10400" /></button>
                      </span>
                    </div>
                  </li>
                ))
              ): (
                <div className='flex flex-col'>
                  <span className='flex items-center justify-center'>
                    <Frown size={48} />
                  </span>
                  <p className="text-2xl text-center leading-relaxed p-16 text-gray-600">
                    Não há nenhum glossário cadastrado! {' '}
                    <Link href="/CreateGlossary" className="underline hover:text-blue-500">
                      Crie glossários!
                    </Link>
                  </p>
                </div>
              )}
            </ul>
            {selectedGlossary && (
            <div>
              <EditGlossaryModal glossary={selectedGlossary} onClose={closeModal} />
            </div>
            )}
          </div>
          <div className="flex flex-1 items-center justify-center pb-24">
            <Link href="/CreateGlossary" className="items-center font-bold px-5 py-2 rounded-xl bg-blue-500 text-white transition 
              ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-800 
              duration-100"
              >
              Novo
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  </div>
 )
}