import { IUserConfig } from "@/interfaces.ts";

export const UserConfig: IUserConfig = Object.freeze({
    website: {
        name: "André Paul Grandsire ",
        url: "https://andrepg.github.io",
        description: "Website pessoal de André Paul Grandsire",
        image: `${import.meta.env.VITE_BASE_URL ?? 'https://andrepg.github.io'}/android-chrome-512x512.png`
    },
    author: {
        name: "André Paul Grandsire",
        avatar: "https://github.com/andrepg.png",
        role: "Programador Full Stack",
        biography: "Mais de 15 anos trabalhando com tecnologia. Programador Full Stack e desenvolvedor Open Source. " +
          "\nDou consultorias, crio sites, estratégias digitais e serviços particulares. Especialista em processos ERP.",
        shortBiography: "Programador desde 2014, criando soluções mobile, web e desktop. Apaixonado por novas tecnologias."
    }
});