'use client'
import * as React from "react";
import '../app/globals.css';

import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import EditSourceModal from "@/app/components/EditSource";
import SourceModal from "@/app/components/AddSourceModal";

import { api } from "@/lib/api";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { ArrowLeftCircle, Frown, Pencil, Trash2 } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";


export default function TermsList() {
  const router = useRouter();

  const [sources, setSources] = useState<any[]>([]);
  const [selectedSource, setSelectedSource] = useState(null);

  const getSources = async () => {
    await api.get('/source-def-trad').then((response) => setSources(response.data));
  };

  useEffect(() => {
    getSources();
  }, []);

  // Função para atualizar o estado após a exclusão
  const handleDeleteSource = async (sourceId: any) => {
    const url = `source-def-trad/${sourceId}`;
    console.log(url);
    const urlToRelation = `source-authorship/source/${sourceId}`;

    try {
      const sourceAuthorshipId = await api.get(urlToRelation);
      const deleteSourceTerciario = await api.delete(`source-authorship/${sourceAuthorshipId.data}`);
    
      console.log(deleteSourceTerciario);
      if (deleteSourceTerciario.status === 200) {
        const deleteSource = await api.delete(url);

        if (deleteSource.status === 200) {
          setSources((prevTerms) =>
            prevTerms.filter((source) => source.sourceId !== sourceId)
          );
          toast.success('Fonte excluída com sucesso!');
        } else {
          toast.error("Erro ao excluir fonte");
        }
      } else {
        console.error("Erro ao excluir fonte do terciário");
      }
    } catch (error) {
      toast.error("Erro ao excluir. Tente novamente!");
    }
  };

  // Modal AddSource
  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  //modal
  const openModal = (source: React.SetStateAction<null>) => {
    setSelectedSource(source);
  };

  const closeModal = () => {
    setSelectedSource(null);
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
          <div className="flex flex-col my-10 mx-52 bg-gray-200  dark:border-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 ">
            <h1 className="text-center dark:text-gray-900 text-4xl p-12 mb-2 font-extrabold">Lista de Fontes</h1>
            {/* Lista de Termsos */}
            <ul role="list" className="divide-y divide-gray-100 mx-4">
              {sources.length > 0 ? (
                sources.map((source) => (
                  <li key={source.id} className="flex flex-1 justify-between gap-x-6 py-5">
                  <div className='flex ' >
                      <div className=''>
                        <dt className='ml-4 text-lg font-semibold leading-6 text-gray-900'> {source.publisher}</dt>
                        <dd className="ml-4 mt-1 truncate text-sm leading-5 text-gray-500">{source.title}</dd>
                      </div>
                    </div>
                    <div className="mr-4 hidden shrink-0 sm:flex sm:justify-content sm:items-end space-x-4">                
                      <span
                        className="cursor-pointer"
                        onClick={() => openModal(source)}
                      >
                        <button><Pencil/></button>
                      </span>
                      <span className="">
                        <button className="" onClick={() => {handleDeleteSource(source.sourceId)}}><Trash2 color="#f10400" /></button>
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <div className='flex flex-col'>
                  <span className='flex items-center justify-center'>
                    <Frown size={48} />
                  </span>
                  <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-600">Não possui nenhuma fonte cadastrada?</label>
                    <button type="button" className="text-blue-600 hover:underline dark:text-blue-500 pl-1"
                    onClick={OpenModal}>
                      Cadastrar nova fonte
                    </button> 
                    <SourceModal isOpen={isModalOpen} onClose={CloseModal}/>
                </div>
              )}
            </ul>
            {selectedSource && (
            <EditSourceModal source={selectedSource} onClose={closeModal} />
            )}
          </div>
          <div className="flex flex-1 items-center justify-center pb-4">
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