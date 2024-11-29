import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { api } from "@/lib/api";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import CourseModal from "./AddCourseModal";
import 'react-toastify/dist/ReactToastify.css';

export default function FormGlossary() {
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [courseIdString, setCourseId] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const courseId = Number(courseIdString);

    try {
      await api.post('/glossary', { name, description, courseId})
      setName(''); 
      setDescription('');
      setCourseId('');
      toast.success('Cadastro realizado com sucesso');
      setTimeout(() => {
        router.push('/GlossaryList');
      }, 4000);
      
    } catch (error) {
      toast.error('Erro ao realizar cadastro. Tente Novamente');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  // Select Dinâmico
  const [courses, setCourse] = useState<any>([]);
  
  const getCourse = async () => {
    await api.get('/course').then((response) => setCourse(response.data));
  };

  useEffect(() => {
    getCourse();
  }, []);
  
  return (
    <form>
      <div className="py-4">
        <label className="block mb-4 text-base font-medium text-gray-900 dark:text-black">Curso Relacionado</label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
          w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
          dark:focus:border-primary-500"
          defaultValue={name}
          onChange={(e) => setCourseId(e.target.value)}
          >
          <option value=""> Selecione um curso </option>
          {Array.isArray(courses) ? (
            courses.map((course: any) => (
              <option key={course.id} value={course.id}> {course.name} </option>
            ))  
          ) : (
            <option value="">{courses.name}</option>
          )}
          
        </select>
      </div>
      <div className="pb-4">
        <label className="mb-2 text-base font-normal text-gray-900 dark:text-gray-600">Não possui nenhum curso cadastrado?</label>
          <button type="button" className="text-blue-600 hover:underline dark:text-blue-500 pl-1"
           onClick={OpenModal}>
            Cadastrar novo curso
          </button> 
          <ToastContainer />
          <CourseModal isOpen={isModalOpen} onClose={CloseModal}/>
      </div>
      <div className="py-4">
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Nome do Glossário</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
        w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
        dark:focus:border-primary-500" 
        value={name}
        onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="py-4">
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Descrição do Glossário</label>
        <textarea className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
        w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
        dark:focus:border-primary-500" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
          {isSubmitting ? 'Enviando...' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
}
  