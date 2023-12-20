import React from 'react';
import Image from 'next/image';
import glossary from '../../assets/glossary.png';

export default async function About() {
  return (
  <>
    <div id="about" className='flex flex-col h-screen'>
      <div className="grid grid-cols-2 min-h-screen p-16 bg-gradient-to-r from-blue-300 to-cyan-200">
        <div className="">
        <h2 className="font-bold text-blue-700 text-6xl mb-4 py-4">Sobre</h2>
        <h1 className="font-bold text-black text-6xl mb-4 py-4">INSTITUTO FEDERAL DE SÃO PAULO</h1>
        <p className="text-2xl mb-4 pb-10 text-gray-700">
          O app gerenciador de glossários é o resultado de uma pesquisa conduzida no Instituto Federal de Araraquara. 
          Desenvolvido como parte de uma iniciação científica, o aplicativo visa facilitar a organização e o acesso 
          a glossários de forma eficiente e intuitiva para a integração e auxílio da comunidade IFSP.
        </p>
        <p className="text-2xl mb-4 pb-10 text-gray-700">Rafael Matias da Silva <br/>Cristiane Akemi Yaguinuma</p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Image
            className=""
            src={glossary}
            alt="ifsp logo"
          />
        </div>
      </div>
    </div>
  </>
 )
}
