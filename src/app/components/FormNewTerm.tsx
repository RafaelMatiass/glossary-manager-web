import React from "react";
import { useState, useEffect} from "react";
import { useRouter } from 'next/router';
import { api } from "@/lib/api";
import { toast } from 'react-toastify';
import DisciplineModal from "./AddDisciplineModal";
import 'react-toastify/dist/ReactToastify.css';


export default function CreateTerm() {

  const [name, setName] = useState<string>();
  const [disciplineIdString, setDisciplineId] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [termIdString, setTermId] = useState<string | null>(null); 
  const router = useRouter();

  // conversao
  const termId = termIdString ? Number(termIdString) : null;
  const disciplineId = disciplineIdString ? Number(disciplineIdString) : null;

  const termExist = async () => {
    try {
      // Verifique se o retorno é um json com dados e se contém id
      const termResponse = await api.get(`/term/name/${name}`);
      if (termResponse.data && termResponse.data.id) {
        // Se a resposta contém dados
        setTermId(termResponse.data.id);
        console.log(termResponse.data.id);
      } else {
        // Se a resposta não contiver dados, defina o ID como nulo
        setTermId(null);
      }
    } catch (error) {
      console.error('Erro ao verificar o termo:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (!disciplineId || isNaN(disciplineId)) {
      toast.error('Por favor, selecione uma disciplina válida.');
      setIsSubmitting(false);
      return;
    }
  
    if (!name || name.trim() === '') {
      toast.error('O nome do termo não pode estar vazio.');
      setIsSubmitting(false);
      return;
    }
  
    try {
      // Verifique se a disciplina existe
      const disciplineResponse = await api.get(`/discipline/${disciplineId}`);
      if (!disciplineResponse.data) {
        throw new Error('Disciplina não encontrada');
      }
  
      // Verifique se o termo já existe ou crie um novo
      if (!termId) {
        const termResponse = await api.post('/term', { name });
        setTermId(termResponse.data.id);
  
        // Crie o relacionamento
        await api.post('/term-discipline-def', {
          termId: termResponse.data.id,
          disciplineId,
          definitionId: null,
        });
      } else {
        await api.post('/term-discipline-def', {
          termId,
          disciplineId,
          definitionId: null,
        });
      }
  
      toast.success('Cadastro realizado com sucesso!');
      router.push('/TermsList');
    } catch (error) {
      toast.error('Erro ao realizar o cadastro. Tente novamente.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setName('');
      setDisciplineId('');
      setTermId(null);
    }
  };  

  // Select Dinâmico
  const [disciplinies, setDiscipline] = useState<any>([]);
  
  const getDiscipline = async () => {
    await api.get('/discipline').then((response) => setDiscipline(response.data));
  };

  useEffect(() => {
    getDiscipline();
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
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Selecione a Disciplina</label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
                dark:focus:border-primary-500"
          value={disciplineIdString || ''}
          onChange={(e) => setDisciplineId(e.target.value)}
        >
          <option value="">Selecione uma disciplina</option>
          {Array.isArray(disciplinies) ? (
            disciplinies.map((discipline: any) => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name}
              </option>
            ))
          ) : (
            <option value="">{disciplinies.name}</option>
          )}
        </select>
      </div>
      <div>
        <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-600">Não possui nenhuma disciplina cadastrada?</label>
        <button type="button" className="text-blue-600 hover:underline dark:text-blue-500 pl-1"
          onClick={OpenModal}
          disabled={isModalOpen}
        >
          Cadastrar nova disciplina
        </button>
        <DisciplineModal isOpen={isModalOpen} onClose={CloseModal} />
      </div>
      <div className="py-4">
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Nome do Termo</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
          w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
          dark:focus:border-primary-500"
          value={name || ''}
          placeholder="Digite o nome do termo"
          onChange={(e) => setName(e.target.value)}
          onBlur={termExist}
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