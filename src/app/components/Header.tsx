import React from 'react';

export default function Header() {
  return (
    <div>
      <div className="relative flex w-full items-center justify-between bg-white py-4 text-gray-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-white-50 dark:text-black md:flex-wrap md:justify-start">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          {/* Navigation links  */}
          <div className='px-2.5'>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0a284f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-type"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M16 8V6H8v2"/><path d="M12 6v7"/><path d="M10 13h4"/></svg>
          </div>
          <div className="!visible hidden grow basis-[100%] items-center lg:!flex lg:basis-auto">
            <ul className="mr-auto flex flex-col lg:flex-row">
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <a className="block transition duration-150 ease-in-out hover:text-blue-700 focus:text-white disabled:text-black/30 dark:hover:text-gray-100 dark:focus:text-gray-400 lg:p-2 [&.active]:text-black/90"
                  href="/home">Home
                </a>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <a className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-gray-400 dark:focus:text-gray-400 lg:p-2 [&.active]:text-black/90"
                  href="#!">
                Sobre</a>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <a className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-gray-400 dark:focus:text-gray-400 lg:p-2 [&.active]:text-black/90"
                    href="#!">Contato
                  </a>
              </li>
              <li className="mb-2 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <a className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-gray-400 dark:focus:text-gray-400 lg:p-2 [&.active]:text-black/90"
                  href="#!">Sair
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
