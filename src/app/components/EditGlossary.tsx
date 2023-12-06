'use client'

import React from 'react';
import { Transition } from '@headlessui/react'
import { Fragment, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { api } from '@/lib/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ModalProps = {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

type Glossary = {
  id: string;
  name: string;
  description: string;
  courseId: string;
};

type EditGlossaryModalProps = {
  glossary: Glossary;
  onClose: () => void;
};

export default function EditGlossaryModal({ glossary, onClose }: EditGlossaryModalProps) {
    
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [courseId, setCourseId] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      const updateGlossaryData = {
      id: glossary.id,
      name: name,
      description: description,
      courseId: courseId
      }

      await api.put(`glossary/${glossary.id}`, updateGlossaryData);
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
  
  const getGlossary = async () => {
    await api.get(`glossary/${glossary.id}`)
    .then((response) => {
      const { name, description, courseId } = response.data;
      setName(name);
      setDescription(description);
      setCourseId(courseId);
    });
  }
  // Select Dinâmico
  const [courses, setCourse] = useState<any>([]);
  
  const getCourse = async () => {
    await api.get('/course').then((response) => setCourse(response.data));
  };

  useEffect(() => { getCourse(); 
    if (glossary.id) { getGlossary(); } }, [glossary.id]);
  
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
                  Atualizar Glossário
                </div>

                <form>
                  <div className="py-4">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Nome do Glossário</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                    w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500" 
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="py-4">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Descrição do Glossário</label>
                    <textarea className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                    w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500" 
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="py-4">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Curso</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                      w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
                      dark:focus:border-primary-500"
                      defaultValue={name}
                      onChange={(e) => setCourseId(e.target.value)}
                      >
                      {/* <option value=""> Selecione um curso </option> */}
                      {Array.isArray(courses) ? (
                        courses.map((course: any) => (
                          <option key={course.id} value={course.id}> {course.name} </option>
                        ))
                      ) : (
                        <option value="">{courses.name}</option>
                      )}
                      
                    </select>
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
