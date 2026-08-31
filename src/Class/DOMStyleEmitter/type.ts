export type UniversalEventMap = {
    [event : string] : {
        [key : string] : any
    }
}

export type DynamicEvent<
    Pattern extends string,
    Payload
> = {
    [K in Pattern]: Payload
}


export type DynamicEventPrefix<
    Prefix extends string,
    Pattern extends string,
    Payload
> = {
    [K in `${Prefix}${Pattern}`]: Payload
}



export type BackListener<Detail> = (detail: Detail) => void
export type FontListener<Detail> = (event: CustomEvent<Detail>) => void