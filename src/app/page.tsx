import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import Image_landing_page from '../assets/image_landing_page.png';
import Logo from '../assets/image_AZ.png';
import '../app/globals.css';

export default async function Home() {
  return (
  <>
    <div className="relative flex w-full items-center justify-between bg-white py-2 text-gray-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-white-50 dark:text-black md:flex-wrap md:justify-start">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className='px-2.5'>
          <Image 
            src={Logo}
            width={80}
            height={60}
            alt="Livro A-Z" />
        </div>
        <div className="!visible hidden grow basis-[100%] items-center lg:!flex lg:basis-auto">
          <ul className="mr-auto flex flex-col lg:flex-row">
            <li className="mb-4 lg:mb-0 lg:pr-2">
              <span className="block font-bold text-blue-600 hover:text-purple-700 p-2 ">
                Gerenciador de Glossários
              </span>
            </li>
            <li className="mb-4 lg:mb-0 lg:pr-2">
              <a className="block p-2 font-medium"
                href="#!">
              Sobre</a>
            </li>
            <li className="mb-4 lg:mb-0 lg:pr-2">
                <a className="block p-2 font-medium"
                  href="#!">Contato
                </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    {/* Landing Page */}
    <div className='flex flex-col h-screen'>
      <div className="grid min-h-screen grid-cols-2 p-16 bg-gradient-to-r from-blue-300 to-cyan-200">
        <div className="">
          <h4 className="font-bold text-3xl text-blue-700 pt-10">Bem-vindo ao Gerenciador de Glossários</h4>
          <h1 className="font-bold text-black text-6xl mb-4 py-4">Gerenciador de soluções para seu curso.</h1>
          <p className="text-2xl mb-4 pb-10 text-gray-700">Os glossários de cursos são gerenciados pelos administradores, que formalizam e organizam os termos, tornando o uso de termos técnicos conhecidos.</p>
          <Link href="/home"
            className="font-bold px-8 py-4 rounded-xl bg-blue-600 text-white transition 
            ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-800 
            duration-100"
          >
            COMEÇAR
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Image
            className=""
            src={Image_landing_page}
            alt="Pessoa com glossario"
          />
        </div>
      </div>
    <Footer />
    </div>
  </>
 )
}
