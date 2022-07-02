declare const projects: {
    key: string;
    name: string;
    description: string;
    link: string;
    image?: string;
    software?: string[];
    show?: boolean;
    github?: string;
    logo?: string;
    favicon?: string;
    start: number;
}[];
declare const packages: {
    package: string;
    npmjs: string;
    github: string;
    description: string;
    internal?: boolean;
}[];

export { packages, projects };
