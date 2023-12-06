import React from "react";
import SourceModal from "./AddSourceModal";
import Link from "next/link";
import { useState, useEffect} from "react";
import { useRouter } from 'next/router';
import { api } from "@/lib/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateTranslation() {

  const router = useRouter();
  const termId = router.query.id as string;
  const termName = router.query.name as string;

  const [selectedTermId, setSelectedTermId] = useState<any>();
  const [translation, setTranslation] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [page, setPage] = useState<string>();
  const [sourceId, setSourceId] = useState<string>(); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const [showSelect, setShowSelect] = useState<boolean>(false);

  const [terms, setTerms] = useState<any>([]);
  useEffect(() => {
    if (termId && termName) {
      setSelectedTermId(termId);
    }
    else {
      fetchTerms();
      setShowSelect(true)
    }
  }, [termId, termName]);

  const fetchTerms = () => {
    api.get('/term')
    .then(response => {
      setTerms(response.data);
    })
    .catch(error => {
      console.error('Erro ao buscar os termos:', error);
    });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post('/translation-term', {
        language,
        page,
        translation,
        sourceId,
        termId: selectedTermId,
      });
      toast.success('Cadastro realizado com sucesso!');
      setTimeout(() => {
        router.push('/TermsList');
      }, 4000);
    } catch (error) {
      toast.error('Erro ao realizar cadastro. Tente Novamente!')
    } finally {
      setIsSubmitting(false);
      setSelectedTermId(null);
      setTranslation('');
      setLanguage(undefined);
      setPage('');
      setSourceId(undefined);
    }
  };

  // Select Dinâmico
  const [sources, setSource] = useState<any>([]);
  
  const getSource = async () => {
    await api.get('/source-def-trad').then((response) => setSource(response.data));
  };

  useEffect(() => {
    getSource();
  }, []);

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <form>
      <div className="py-4">
      {termId && termName ? (
        <div className='flex flex-col pb-8'>
          <p className="block text-2xl font-semibold mb-2 text-gray-900 dark:text-black">Termo&nbsp;
            <span className=" text-blue-700 dark:text-blue-800">
              {termName}
            </span>
          </p>
        </div>
        ) : showSelect && terms.length > 0 ? (
          // Se nenhum termo foi fornecido, mostrar o seletor de termos
          <div className='flex flex-col pb-4'>
            <label htmlFor="termSelect" className="block mb-2 text-base font-medium text-gray-900 dark:text-black">
              Selecione um termo:
            </label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
            w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
            dark:focus:border-primary-500"
            defaultValue={selectedTermId}
            onChange={(e) => setSelectedTermId(e.target.value)}
            >
            <option value=""> Selecione um termo </option>
            {Array.isArray(terms) ? (
              terms.map((term: any) => (
                <option key={term.id} value={term.id}> {term.name} </option>
              ))
            ) : (
              <option value="">{terms.name}</option>
            )}
          </select>
          </div>
        ) : (
          // Se não há termos para exibir no seletor, pode mostrar uma mensagem ou lidar conforme necessário
          <div className='flex flex-col pb-8'>
            <p className="text-center leading-relaxed text-gray-600">
              Não há nenhum termo cadastrado! {' '}
              <Link href="/CreateTerm" className="underline hover:text-blue-500">
                Crie e associe 
              </Link>
              {' '}termos à disciplinas!
            </p>
          </div>
        )
      }
      <div className="py-4">
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Selecione o Idioma</label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
        w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
        dark:focus:border-primary-500" 
        defaultValue={language}
          onChange={(e) => setLanguage(e.target.value)}
          >
          <option value="pt">Português </option>
          <option value="en">Inglês </option>
          <option value="es">Espanhol</option>
        </select>
      </div>
      <div className="pb-4">
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Fonte da Tradução</label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
          w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
          dark:focus:border-primary-500"
          defaultValue={sourceId}
          onChange={(e) => setSourceId(e.target.value)}
        >
          <option value=""> Selecione uma fonte </option>
          {Array.isArray(sources) ? (
            sources.map((source: any) => (
              <option key={source.sourceId} value={source.sourceId}>
                {source.publisher}
              </option>
            ))
          ) : (
            <option value="">{sources.publisher}</option>
          )}
        </select>
      </div>
      <div className="pb-4">
        <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-600">Não possui nenhuma fonte cadastrada?</label>
          <button type="button" className="text-blue-600 hover:underline dark:text-blue-500 pl-1"
           onClick={OpenModal}>
            Cadastrar nova fonte
          </button> 
          <SourceModal isOpen={isModalOpen} onClose={CloseModal}/>
      </div>
      <div className="py-4">
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Página da Tradução</label>
        <input className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
        w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
        dark:focus:border-primary-500" 
        value={page}
        onChange={(e) => setPage(e.target.value)} />
      </div>
      <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Tradução do Termo</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
        w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
        dark:focus:border-primary-500" 
        value={translation}
        onChange={(e) => setTranslation(e.target.value)} 
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
 )
}