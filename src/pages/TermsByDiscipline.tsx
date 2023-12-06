'use client'
import * as React from "react";
import '../app/globals.css';

import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import EditGlossaryModal from "@/app/components/EditGlossary";

import { api } from "@/lib/api";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { ArrowLeftCircle, Frown, Pencil, Trash2 } from "lucide-react";
import { toast } from 'react-toastify';
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';


export default function TermsList() {
  const router = useRouter();

  const disciplineId = router.query.disciplineId as string;
  const [terms, setTerms] = useState<any[]>([]);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const getTerms = async () => {
    try {
      const response = await api.get(`term-discipline-def/terms/${disciplineId}`);
      setTerms(response.data);
    } catch (error) {
      console.error('Erro ao buscar termos:', error);
    }
  };

  useEffect(() => {
    getTerms();
  }, [disciplineId]);

  // Função para atualizar o estado após a exclusão
  const handleDeleteTerm = async (id: any) => {
    const url = `term/${id}`;
    try {
      await api.delete(url);
      setTerms((prevTerms) =>
        prevTerms.filter((term) => term.id !== id)
      );
      toast.success('Termo excluído com sucesso!');
    } catch {
      toast.error("Erro ao excluir. Tente Novamente!");
    }
  };

  //modal
  const openModal = (discipline: React.SetStateAction<null>) => {
    setSelectedTerm(discipline);
  };

  const closeModal = () => {
    setSelectedTerm(null);
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
          <div className="flex flex-col my-10 mx-52 bg-gray-200  dark:border-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 ">
            <h1 className="text-center dark:text-gray-900 text-4xl p-12 mb-2 font-extrabold">Termos por Disciplina </h1>
            {/* Lista de Termsos */}
            <ul role="list" className="divide-y divide-gray-100 mx-4">
              {terms.length > 0 ? (
                terms.map((term) => (
                  <li key={term.id} className="flex flex-1 justify-between gap-x-6 py-5">
                  <div className='flex ' >
                      <div className=''>
                        <dt className='ml-4 text-lg font-semibold leading-6 text-gray-900'> {term.name}</dt>
                      </div>
                    </div>
                    <div className="mr-4 hidden shrink-0 sm:flex sm:justify-content sm:items-end space-x-4">
                      <span
                        className="cursor-pointer"
                        onClick={() => openModal(term)}
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
                    Esta disciplina não possui nenhum termo cadastrado! {' '}
                    <Link href="/CreateTerm" className="underline hover:text-blue-500">
                      Crie e associe 
                    </Link>
                    {' '}termos à disciplinas!
                  </p>
                </div>
              )}
            </ul>
            {selectedTerm && (
            <EditGlossaryModal glossary={selectedTerm} onClose={closeModal} />
            )}
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="px-2">
              <Link href="/CreateTerm" className="items-center font-bold px-10 py-3 rounded-xl bg-blue-500 text-white transition 
                ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-800 
                duration-100"
                >
                Novo
              </Link>
            </div>
            <Link href="/TermsList" className="items-center font-bold px-5 py-2.5 rounded-xl bg-blue-500 text-white transition 
              ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-800 
              duration-100"
              >
              Todos Termos
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  </div>
 )
}