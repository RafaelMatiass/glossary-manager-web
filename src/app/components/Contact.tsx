import React from 'react';
import Image from 'next/image';
import ifsp from '../../assets/ifsp.png';

export default async function Contact() {
  return (
  <>
    <div id="contact" className='flex flex-col h-screen'>
      <div className="grid grid-cols-2 min-h-screen p-16 bg-gradient-to-r from-blue-300 to-cyan-200">
        <div className="flex flex-1 items-center justify-center">
          <Image
            className=""
            src={ifsp}
            alt="ifsp logo"
          />
        </div>
        <div className="">
        <h2 className="font-bold text-blue-700 text-6xl mb-4 py-4">Contato</h2>
        <h1 className="font-bold text-black text-6xl mb-4 py-4">INSTITUTO FEDERAL DE SÃO PAULO</h1>
        <p className="text-2xl mb-4 pb-10 text-gray-700">
          Endereço: Rua Doutor Aldo Benedito Pierri, 250 - Jardim Paulo Freire, Araraquara - SP, 14804-296
        </p>
        <p className="text-2xl mb-4 pb-10 text-gray-700">
          Telefone: (16) 3303-2330
          email: cex.arq@ifsp.edu.br
        </p>
        </div>
      </div>
    </div>
  </>
 )
}