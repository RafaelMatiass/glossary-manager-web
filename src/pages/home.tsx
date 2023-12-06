'use client'

import { api } from '@/lib/api';
import '../app/globals.css';


import React, { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/app//components/Sidebar';
import Image_AZ from '../assets/image_AZ.png';

export default function Home() {
  const [glossaries, setGlossary] = useState<any[]>([]);

  const getGlossary = async () => {
    await api.get('/glossary').then((response) => setGlossary(response.data));
  };

  useEffect(() => {
    getGlossary();
  }, []);

  return (
    <div>
      <Header/>
      <div className='h-screen flex flex-col'>
        <div className='flex flex-1'> 
          {/* Menu lateral */} 
          <Sidebar/>
          {/* Conteúdo */}
          {/* retirar os pads para organizar dinamicamente */}
          <main className="flex flex-col grow shadow-sm bg-white">
            <div className="items-center justify-center border-blue-500 m-4">
              <div className="flex flex-1 items-center justify-center">
              <Image
                      src={Image_AZ}
                      width={200}
                      height={200}
                      alt="Letrário AZ"
                    />
              </div>
              <h1 className='text-3xl font-bold text-center text-blue-500 p-10'>Seja bem vindo(a) ao Gerenciador de Glossários!</h1>
              <div className='flex flex-col pb-4 my-4 mx-32 bg-gray-200  dark:border-gray-900 rounded-xl shadow-lg shadow-cyan-500/50'>
                <h3 className='text-center dark:text-gray-900 text-4xl p-12 mb-2 font-extrabold'>Glossários Cadastrados</h3>
                <ul role='list' className='divide-y divide-gray-100 mx-4'>
                {glossaries.length > 0 ? (
                    // Mostra a lista de glossários se houver registros
                    glossaries.map((glossary) => (
                      <li className="flex justify-center gap-x-6 py-5" key={glossary.id}>
                        <div className="flex min-w-0 gap-x-4">
                          <table >
                          <tbody className="min-w-0 flex-auto">
                            <tr className="border-b dark:border-neutral-500">
                              <td className="ml-4 text-lg font-semibold leading-6 text-gray-900">
                              <Link href={`/Disciplinies?glossaryId=${glossary.id}`} className='hover:text-blue-500'>
                              {glossary.name}
                              </Link>
                              </td>
                            </tr>
                          </tbody>
                          </table>
                        </div>
                      </li>
                    ))
                  ) : (
                    // Mostra a mensagem para cadastrar um novo glossário caso não haja registros
                    <p className="text-2xl text-center leading-relaxed py-24 text-gray-600">
                      Você ainda não possui nenhum glossário cadastrado! Comece a{' '}
                      <Link href="/CreateGlossary" className="underline hover:text-blue-800">
                        criar agora
                      </Link>
                      !
                    </p>
                  )}
                </ul>
              </div>
              <div className='flex flex-1 items-center justify-center p-4'>
                {/* <p className='flex flex-col py-4 text-2xl text-gray-600'>Cadastrar novo glossário</p> */}
                <Link
                    href='/CreateGlossary'
                    className='items-center font-bold px-5 py-2 rounded-xl bg-blue-500 text-white transition 
                    ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-800 
                    duration-100'
                    >
                      Novo
                  </Link>
              </div>
            </div>
          </main>
        </div>
      <Footer/>
      </div>
    </div>
  )
}