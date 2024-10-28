import { ArrowBack, VolumeDown } from "@mui/icons-material";
import { Container, Stack, Typography, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { speech, translateWords } from "../utils/feature";
import { useDispatch, useSelector } from "react-redux";
import { getWordsRequest, getWordsFail, getWordsSuccess, clearState } from '../redux/slices'
import Loader from "./Loader";

const Learning = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, words, error } = useSelector(
    (state: { root: stateType }) => state.root)

  const [count, setCount] = useState<number>(0);
  const param = useSearchParams()[0].get("language") as LangType;

  const nextHandler = () => {
    if (count === words.length - 1) navigate("/quiz")
    setCount(prev => prev + 1)
  }

  useEffect(() => {
    dispatch(getWordsRequest());

    translateWords(param || "hi")
      .then((arr) => dispatch(getWordsSuccess(arr)))
      .catch((err) => dispatch(getWordsFail(err)))

    if (error) {
      alert("error");
      clearState();
    }
  }, [])

  const [audioSrc,setAudioSrc]=useState("");
  const audioRef=useRef(null);

  const audioHandler= async()=>{
    const data= await speech();
    setAudioSrc(data);
  }

  if (loading) return <Loader />

  return (
    <Container maxWidth={"sm"} sx={{ padding: "2rem" }}>
      {
        audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>
      }

      <Button onClick={
        count === 0 ?
          () => navigate("/") :
          () => setCount(prev => prev - 1)
      }>
        <ArrowBack />
      </Button>

      <Typography variant="h6">
        learn the words
      </Typography>

      <Stack alignItems={"center"} direction={"row"} spacing={"2rem"} padding={"2rem 0"}>

        <Typography variant="h5">
          {count + 1} - {words[count]?.name}
        </Typography>

        <Typography variant="h5" color="lightblue">
          : {words[count]?.meaning}
        </Typography>

        <Button
          sx={{ borderRadius: "20px" }}
          onClick={audioHandler}>
          <VolumeDown sx={{ fontSize: "2rem" }} />
        </Button>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        onClick={nextHandler}
        sx={{ margin: "3rem 0" }}
      >
        {
          count === words.length - 1 ? "go to quiz" : "Next"
        }
      </Button>
    </Container>
  )
}

export default Learning
