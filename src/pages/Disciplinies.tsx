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
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';


export default function Disciplinies() {
  const router = useRouter();
  const glossaryId = router.query.glossaryId as string;
  const [disciplinies, setDisciplinies] = useState<any[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);

  const getDisciplinies = async () => {
    try {
      const response = await api.get(`discipline/glossary/${glossaryId}`);
      setDisciplinies(response.data);
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
    }
  };

  useEffect(() => {
    getDisciplinies();
  }, [glossaryId]);

  // Função para atualizar o estado após a exclusão
  const handleDeleteDiscipline = async (id: any) => {
    const url = `discipline/${id}`;
    try {
      await api.delete(url);
      setDisciplinies((prevDisciplinies) =>
        prevDisciplinies.filter((discipline) => discipline.id !== id)
      );
      toast.success('Disciplina excluída com sucesso!');
    } catch {
      toast.error('Erro ao excluir. Tente Novamente!');
    }
  };

  //modal
  const openModal = (discipline: React.SetStateAction<null>) => {
    setSelectedDiscipline(discipline);
  };

  const closeModal = () => {
    setSelectedDiscipline(null);
  };

 return (
  <div>
    <Header/>
    <div className='h-screen flex flex-col'>
      <div className='flex flex-1'>
        <Sidebar/>
        {/* Conteúdo */}
        <ToastContainer/>
        <div className='bg-gray-50 h-full flex flex-col grow'>
          <button className='p-4 hover:-translate-y-1' onClick={() => router.back()}>
            <ArrowLeftCircle size={48} color='rgb(59 130 246)' />
          </button>
          <div className="flex flex-col my-12 mx-52 bg-gray-200  dark:border-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 ">
            <h1 className="text-center dark:text-gray-900 text-4xl p-12 mb-2 font-extrabold">Disciplinas do Glossário </h1>
            {/* Lista de Glossário */}
            <ul role="list" className="divide-y divide-gray-100 mx-4">
              {disciplinies.length > 0 ? (
                disciplinies.map((discipline) => (
                  <li key={discipline.id} className="flex flex-1 justify-between gap-x-6 py-5">
                  <div className='flex ' >
                      <div className=''>
                        <Link href={`/TermsByDiscipline?disciplineId=${discipline.id}`} className='ml-4 text-lg font-semibold leading-6 text-gray-900 hover:text-blue-500'> {discipline.name}</Link>
                        <dd className="max-w-prose ml-4 mt-1 truncate text-sm leading-5 text-gray-500">{discipline.description}</dd>
                      </div>
                    </div>
                    <div className="mr-4 hidden shrink-0 sm:flex sm:justify-content sm:items-end space-x-4">
                      <span
                        className="cursor-pointer"
                        onClick={() => openModal(discipline)}
                      >
                        <button><Pencil/></button>
                        
                      </span>
                      <span className="">
                        <button className="" onClick={() => {handleDeleteDiscipline(discipline.id)}}><Trash2 color="#f10400" /></button>
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
                    Este glossário não possui nenhuma disciplina cadastrada! {' '}
                    <Link href="/CreateTerm" className="underline hover:text-blue-500">
                      Crie e associe 
                    </Link>
                    {' '}disciplinas aos seus termos!
                  </p>
                </div>
              )}
            </ul>
            {selectedDiscipline && (
            <EditGlossaryModal glossary={selectedDiscipline} onClose={closeModal} />
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