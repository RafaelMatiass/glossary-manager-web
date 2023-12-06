'use client'
import * as React from "react";
import '../app/globals.css';

import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import EditTermModal from "@/app/components/EditTerm";
import DetailsTerm from "@/app/components/DetailsTerm";


import { ToastContainer } from 'react-toastify';
import { api } from "@/lib/api";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { ArrowLeftCircle, Frown, Pencil, Trash2, Languages } from "lucide-react";
import { toast } from 'react-toastify';
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';


export default function TermsList() {
  const router = useRouter();

  const [terms, setTerms] = useState<any[]>([]);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const getTerms = async () => {
    await api.get('/term').then((response) => setTerms(response.data));
  };

  useEffect(() => {
    getTerms();
  }, []);

  // Função para atualizar o estado após a exclusão
  const handleDeleteTerm = async (id: any) => {
    const urlToRelation = `term-discipline-def/termId/${id}`;
    const urlToTranslation = `translation-term/termId/${id}`

    try {
      const deleteTermsTerciario = await api.delete(urlToRelation);
      const deleteTermsTranslation = await api.delete(urlToTranslation);
    
      if (deleteTermsTerciario.status === 200 && deleteTermsTranslation.status === 200) {
        setTerms((prevTerms) =>
          prevTerms.filter((term) => term.id !== id)
        );
        toast.success('Termo excluído com sucesso!');
      } else {
        console.error('Erro ao excluir termo do terciário');
        toast.error('Erro ao excluir termo!');
      }
    } catch (error) {
      console.error('Erro ao excluir termo:', error);
      toast.error('Erro ao excluir termo!');
    }
  };
  //modal
  const [mode, setMode] = useState<any>(null);

  const openModal = (term: any) => {
    setSelectedTerm(term);
    setMode('detail');
  };

  const openEditModal = (term: any) => {
    setSelectedTerm(term);
    setMode('edit');
  };

  const closeModal = () => {
    setSelectedTerm(null);
    setMode(null); // Limpa o modo ao fechar o modal
  };

 return (
  <div>
    <Header/>
    <div className='h-screen flex flex-col'>
      <div className='flex flex-1'>
        <Sidebar/>
        {/* Conteúdo */}
        <div className='bg-gray-50 h-full flex flex-col grow'>
        <button className='p-4 hover:-translate-y-1' onClick={() => router.back()}>
          <ArrowLeftCircle size={48} color='rgb(59 130 246)' />
        </button>
        <ToastContainer />
          <div className="flex flex-col mx-52 bg-gray-200  dark:border-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 ">
            <h1 className="text-center dark:text-gray-900 text-4xl p-12 mb-2 font-extrabold">Lista de Termos</h1>
            {/* Lista de Termsos */}
            <ul role="list" className="divide-y divide-gray-100 mx-4">
              {terms.length > 0 ? (
                terms.map((term) => (
                  <li key={term.id} className="flex flex-1 justify-between gap-x-6 py-5">
                  <div className='flex ' >
                      <div className="cursor-pointer" onClick={() => openModal(term)}>
                        <dt className='ml-4 text-lg font-semibold leading-6 text-gray-900'> {term.name} &nbsp;&nbsp;&bull; <span className="pl-2 text-sm leading-5 text-gray-500">Detalhes</span></dt>
                        {/* trazer a disciplina relacionada */}
                      </div>
                    </div>
                    <div className="mr-4 hidden shrink-0 sm:flex sm:justify-content sm:items-end space-x-4">
                      <Link href={`/CreateTranslation?id=${term.id}&name=${encodeURIComponent(term.name)}`}>
                        <button><Languages /></button>
                      </Link>                  
                      <span
                        className="cursor-pointer"
                        onClick={() => openEditModal(term)}
                      >
                        <button><Pencil/></button>
                      </span>
                      <span className="">
                        <button className="" onClick={() => {handleDeleteTerm(term.id)}}><Trash2 color="#f10400" /></button>
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <div className='flex flex-col'>
                  <span className='flex items-center justify-center'>
                    <Frown size={48} />
                  </span>
                  <p className="text-2xl text-center leading-relaxed p-16 text-gray-600">
                    Não há nenhum termo cadastrado! {' '}
                    <Link href="/CreateTerm" className="underline hover:text-blue-500">
                      Crie e associe 
                    </Link>
                    {' '}termos à disciplinas!
                  </p>
                </div>
              )}
            </ul>
            {selectedTerm && mode === 'detail' && (
              <DetailsTerm term={selectedTerm} onClose={closeModal} />
            )}
            {selectedTerm && mode === 'edit' && (
              <EditTermModal term={selectedTerm} onClose={closeModal} />
            )}
          </div>
          <div className="flex flex-1 items-center justify-center">
            <Link href="/CreateTerm" className="items-center font-bold px-5 py-2 rounded-xl bg-blue-500 text-white transition 
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