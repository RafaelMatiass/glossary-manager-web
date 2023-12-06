'use client'

import React from 'react';
import { Transition } from '@headlessui/react'
import { Fragment, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { api } from '@/lib/api';

type ModalProps = {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

type Term = {
  id: string;
  name: string;
};

type EditTermModalProps = {
  term: Term;
  onClose: () => void;
};

export default function DetailsTerm({ term, onClose }: EditTermModalProps) {  
  const [name, setName] = useState<string>();
  const [translation, setTranslation] = useState<Array<any>>([])
  
  const getTerms = async () => {
    await api.get(`term/${term.id}`)
    .then((response) => {
      const { name } = response.data;
      setName(name);
    });
  }

  const getTranslationTerms = async () => {
    const response = await api.get(`translation-term/translationByTermId/${term.id}`)
    const translationData = response.data;
    setTranslation(translationData);
  }

  useEffect(() => { getTerms(); getTranslationTerms() }, [term.id]);
  
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
                <div className="text-center dark:text-gray-900 text-2xl font-bold pb-4">
                  Detalhes do Termo
                </div>
                <form>
                  <div className="py-4">
                    <label className="block mb-2 text-base font-medium text-blue-600 px-6 dark:text-black">Nome do Termo</label>
                    <p className="px-6">{name}</p>
                  </div>
                  <div className="py-4">
                  <label className="block mb-2 text-base font-medium text-blue-600 px-6 dark:text-black">Tradução</label>
                  {Array.isArray(translation) && translation.length > 0 ? (
                    translation.map((trad: any) => (
                    <p key={trad.translationId} className="px-6">
                      <strong>Tradução:</strong> {trad.translation} <br />
                      <strong>Idioma:</strong> {trad.language} <br />
                    </p>
                  ))
                  ) : (
                    <p className="px-6">Nenhuma tradução encontrada</p>
                  )}
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