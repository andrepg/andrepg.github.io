import { IApplicationConfig } from "@/interfaces";

export const UserConfig = Object.freeze({
    website: {
        name: "andrepg.dev",
        url: "https://andrepg.github.io",
        description: "Website pessoal de André Paul Grandsire"
    },
    author: {
        name: "André Paul Grandsire",
        avatar: "/avatar.png", // TODO Missing implementation
        biography: "Engenheiro de Software, apaixonado por tecnologia e desenvolvimento de software."
    }
} as IApplicationConfig);