declare global {
    const __IS_FRONT__: boolean;
    const __IS_BACK__: boolean;
    const __CONFIG__ : {
        [key : string ] : string
    } | undefined

}

export {};