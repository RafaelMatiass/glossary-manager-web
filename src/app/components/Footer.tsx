import React from "react";
// import logo_image from "../images/logo_image.png";

export default function Footer () {
    return (
        <div className="bg-white bottom-0 w-full py-8 shadow-2xl border-black">
            <div className="text-center">
                {/* <img src={logo_image} class="h-10 mr-8 text-center"  alt="Gerenciador Logo" /> */}
                <span className="self-center text-2xl p-2 font-semibold whitespace-nowrap dark:text-gray-500">Gerenciador Glossários</span>
            </div>
            <div className="bg-white text-center text-neutral-700 dark:text-gray-900">
                © 2023 Copyright
                <br/>
                <a className="dark:text-neutral-400 hover:underline hover:text-neutral-800"
                href="https://www.arq.ifsp.edu.br/">IFSP - CAMPUS ARARAQUARA</a>
            </div>
        </div>
    )
}