import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import SourceModal from "./AddSourceModal";
import 'react-toastify/dist/ReactToastify.css';

export default function FormGlossary() {
  const [name, setName] = useState<string>();
  const [sourceId, setSourceId] = useState<string>(); 
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const router = useRouter(); 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const authorResponse = await api.post('/author', { name });
    
      if (authorResponse.status === 201) {
        const sourceAuthorship = await api.get(`source-authorship/source/${sourceId}`);
    
        if (sourceAuthorship.status === 200) {
          const updateSourceAuthorship = {
            authorId: authorResponse.data.authorId,
            sourceId: sourceId,
          };
    
          await api.put(`source-authorship/${sourceAuthorship.data}`, updateSourceAuthorship);
          
          toast.success('Cadastro realizado com sucesso!');
          setTimeout(() => {
            router.reload()
          }, 6000);
        } else {
          console.error('Erro ao buscar ID em source authorship');
        }
      } else {
        console.error('Erro ao cadastrar um novo autor antes de cadastrar no ternário');
        toast.error('Erro ao cadastrar. Tente Novamente');
      }
    } catch (error) {
      toast.error('Erro ao cadastrar. Tente Novamente');
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
  const [sources, setSource] = useState<any>([]);
  
  const getSource = async () => {
    await api.get('/source-def-trad').then((response) => setSource(response.data));
  };

  useEffect(() => {
    getSource();
  }, []);
  
  return (
    <form>
      <div className="py-4">
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Nome do Autor</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
        w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
        dark:focus:border-primary-500" 
        defaultValue={name}
        onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="py-4">
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Fonte do Autor</label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
          w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
          dark:focus:border-primary-500"
          defaultValue={sourceId}
          onChange={(e) => setSourceId(e.target.value)}
          >
          <option value=""> Selecione uma fonte </option>
          {Array.isArray(sources) ? (
            sources.map((source: any) => (
              <option key={source.sourceId} value={source.sourceId}> {source.publisher} </option>
            ))  
          ) : (
            <option value="">{sources.publisher}</option>
          )}
        </select>
      </div>
      <div>
        <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-600">Não possui nenhuma fonte cadastrada?</label>
          <button type="button" className="text-blue-600 hover:underline dark:text-blue-500 pl-1"
           onClick={OpenModal}>
            Cadastrar nova fonte
          </button> 
          <SourceModal isOpen={isModalOpen} onClose={CloseModal}/>
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