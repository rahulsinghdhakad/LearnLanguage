import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const languages = [
  {
    language: "hindi",
    code: "hi"
  },
  {
    language: "spanish",
    code: "es"

  },
  {
    language: "french",
    code: "fr"
  },
  {
    language: "japanese",
    code: "ja"
  }
]

const Home = () => {
  const navigate = useNavigate();

  const languageSelectHandler = (code: string) => {
    navigate(`learn?language=${code}`)
  }

  // useEffect(()=>{
  //   const fetch=async ()=>{
  //     const res= await axios.get("http://api.voicerss.org/?key=5b51fcfbcaac4059a80b4db310815ab8&hl=en-us&src=Hello, world!")
  //     setAudioSrc(res.data)
  //   }
  //   fetch();
  // },[])

  // const [audioSrc,setAudioSrc]=useState("");
  // const audioRef=useRef(null);

  // const audioHandler= async()=>{
  //   const data= await speech();
  //   setAudioSrc(data);
  // }

  return (
    <Container maxWidth="sm">
      {/* {
        audioSrc && <audio src={audioSrc} autoPlay ref={audioRef} controls></audio>
      } */}
      {/* <Button onClick={audioHandler}>audio</Button> */}
      <Typography variant="h2" p={"1rem"} textAlign={"center"}>
        welcome,to your coding journey
      </Typography>

      <Stack spacing={"1rem"} justifyContent={"center"} alignItems={"center"} direction={"row"}>
        {
          languages.map((i) => (
            <Button key={i.code} onClick={() => languageSelectHandler(i.code)} variant="contained">
              {i.language}
            </Button>
          ))
        }
      </Stack>

    </Container>
  )
}

export default Home
