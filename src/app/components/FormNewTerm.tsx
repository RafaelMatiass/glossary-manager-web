import React from "react";
import { useState, useEffect} from "react";
import { useRouter } from 'next/router';
import { api } from "@/lib/api";
import { toast } from 'react-toastify';
import DisciplineModal from "./AddDisciplineModal";
import 'react-toastify/dist/ReactToastify.css';


export default function CreateTerm() {

  const [name, setName] = useState<string>();
  const [disciplineId, setDisciplineId] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [termId, setTermId] = useState<string | null>(null); 
  const router = useRouter();

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Se termId for nulo, crie um novo termo no backend
      if (termId === null) {
        const termResponse = await api.post('/term', { name });
        setTermId(termResponse.data.id);

        // Relacione o novo termo com a disciplina
        await api.post('/term-discipline-def', {
          termId: termResponse.data.id,
          disciplineId: disciplineId,
          definitionId: null,
        });
      } else {
        // Se termId não for nulo, relacione o termo existente com a disciplina
        await api.post('/term-discipline-def', {
          termId: termId,
          disciplineId: disciplineId,
          definitionId: null,
        });
      }
      toast.success('Cadastro realizado com sucesso');
      router.push('/TermsList');
    } catch (error) {
      toast.error('Erro ao realizar cadastro. Tente Novamente')
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
        defaultValue={name}
          onChange={(e) => setDisciplineId(e.target.value)}
          >
          <option value=""> Selecione uma disciplina </option>
          {Array.isArray(disciplinies) ? (
            disciplinies.map((discipline: any) => (
              <option key={discipline.id} value={discipline.id}> {discipline.name} </option>
            ))
          ) : (
            <option value="">{disciplinies.name}</option>
          )}
        </select>
      </div>
      <div>
        <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-600">Não possui nenhuma disciplina cadastrada?</label>
          <button type="button" className="text-blue-600 hover:underline dark:text-blue-500 pl-1"
           onClick={OpenModal}>
            Cadastrar nova disciplina
          </button> 
          <DisciplineModal isOpen={isModalOpen} onClose={CloseModal}/>
      </div>
      <div className="py-4">
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Nome do Termo</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
        w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 
        dark:focus:border-primary-500" 
        value={name}
        onChange={(e) => setName(e.target.value)} 
        onBlur={termExist} />
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