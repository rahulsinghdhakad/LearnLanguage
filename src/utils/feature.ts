import axios from "axios";
import _ from "lodash";
import { generate } from "random-words";

const generateMCQ = (word : { text : string} [] , idx: number)=>{

    const correctOption= word[idx].text;
    const newword= word.filter((i,index)=> index!==idx)

    const incorrectOption = _.sampleSize(newword,3).map((i)=> i.text)

    const options = _.shuffle([...incorrectOption, correctOption]);

     return options;
}

export const translateWords = async (language: LangType) => {
    try {
        const words = (generate(8) as string[]).map((i) => ({ text: i }))

        const response = await axios.post("https://microsoft-translator-text-api3.p.rapidapi.com/translate",
            words,
            {
                params: {
                    to: language,
                    from: 'en',
                    textType: 'plain'
                },
                headers: {
                    'x-rapidapi-key': '0cc0eb1484msh26cf76325cc1dedp1574d1jsn15e07a27880e',
                    'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            }
        )
        const data: FetchedDataType[] = response.data;

        const arr: WordType[] = data.map((i, idx) => {
            const option = generateMCQ(words, idx);

            return {
                name: i.translations[0].text,
                meaning: words[idx].text,
                option,
            }
        })
        return arr;

    } catch (error) {
        console.log(error)
        throw new Error("new error");
    }
}

export const speech = async ()=>{
    const data = new FormData();

    data.append('src', 'Hello, world!');
    data.append('hl', 'en-us');
    data.append('r', '0');
    data.append('c', 'mp3');
    data.append('f', '8khz_8bit_mono');
    data.append('b64', 'true')

    const options = {
    method: 'POST',
    url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
    params: {
        key: '5b51fcfbcaac4059a80b4db310815ab8'
    },
    headers: {
        'x-rapidapi-key': '0cc0eb1484msh26cf76325cc1dedp1574d1jsn15e07a27880e',
        'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com'
    },
    data: data
    };

    try {
        const {data}: { data: string} = await axios.request(options);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("errr")
    }
}