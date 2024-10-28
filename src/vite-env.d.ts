/// <reference types="vite/client" />

type LangType= "hi"|"es"|"fr"|"ja" ;

type WordType={
    name: string,
    meaning: string,
    option: string[],
}

type stateType={
    loading : boolean,
    words : WordType[],
    result : string[],
    error?: string,
}

type FetchedDataType={
    translations:{
        text:string
    }[]
}