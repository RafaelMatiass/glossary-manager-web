'use client'

import React, { useEffect } from 'react';
import { Transition } from '@headlessui/react'
import { Fragment, ReactNode, useState } from 'react'
import { useRouter } from 'next/router';
import { api } from '@/lib/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ModalProps = {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

type Source = {
  sourceId: string;
  title: string;
  publisher: string;
  year: string;
  type_publication: string;
};

type EditSourceModalProps = {
  source: Source;
  onClose: () => void;
};

export default function EditGlossaryModal({ source, onClose }: EditSourceModalProps) {
    
  const [title, setTitle] = useState<string>();
  const [publisher, setPublisher] = useState<string>();
  const [year, setYear] = useState<string>();
  const [type, setTypePublication] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      const updateSourceData = {
      sourceId: source.sourceId,
      title: title,
      publisher: publisher,
      type_publication: type,
      year: year,
      
      }

      await api.put(`source-def-tard/${source.sourceId}`, updateSourceData);
      onClose() 
      toast.success('Edição realizada com sucesso!');
      toast.info('Aguarde alguns segundos!');
      setTimeout(() => {
        router.reload()
      }, 6000);
    } catch (error) {
      toast.error('Erro ao atualizar. Tente Novamente!')
    }
  }
  
  const getSource = async () => {
    await api.get(`source-def-trad/${source.sourceId}`)
    .then((response) => {
      const { 
        title,
        publisher,
        year,
        type_publication } = response.data;
      setTitle(title);
      setPublisher(publisher);
      setYear(year);
      setTypePublication(type_publication);
    });
  }
  
  useEffect(() => {
    getSource();
  }, []);
  
  return (
  <>
  <Transition appear show={true} as={Fragment}>
    <div className="relative z-10" >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className='text-right'>
                  <button
                      type="button"
                      className="transition 
                      ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100"
                      onClick={onClose}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2.0625" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>
                  </button>
                </div>
                <div className="text-center dark:text-gray-900 text-2xl font-bold">
                  Atualizar Fonte
                </div>

                <form>
                  <div className="py-4">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Título da Fonte</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                    w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500" 
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="py-4">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Editora</label>
                    <textarea className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                    w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500" 
                    defaultValue={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    />
                  </div>
                  <div className="py-4">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Ano da Publicação</label>
                    <input className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                    w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500" 
                    defaultValue={year}
                    onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                  <div className="py-4">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Tipo da Publicação</label>
                    <input className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                    w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500" 
                    defaultValue={type}
                    onChange={(e) => setTypePublication(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-center py-12">
                    <button className="items-center font-bold px-5 py-2 rounded-xl bg-blue-500 text-white transition 
                      ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-800 
                      duration-100"
                      type="submit" 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      >
                      {isSubmitting ? 'Atualizando...' : 'Salvar'}
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition>
  </>
  );
};