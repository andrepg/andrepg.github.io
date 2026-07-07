import { IUserConfig } from "@/interfaces";

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
        biography: "Programador desde 2014, criando soluções mobile, web e desktop. Apaixonado por novas tecnologias. Trabalho publicando em Open Source, criações e consultorias.",
        shortBiography: "Programador desde 2014, criando soluções mobile, web e desktop. Apaixonado por novas tecnologias."
    }
});