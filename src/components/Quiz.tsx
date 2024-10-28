import { Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, Button } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveResult } from "../redux/slices";

const Quiz = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { words } = useSelector(
    (state: { root: stateType }) => state.root)

  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");
  const [result, setResult] = useState<string[]>([]);


  const nextHandler = () => {
    setResult(prev => [...prev, ans])
    setCount(prev => prev + 1);
    setAns("");
  }

  useEffect(()=>{
    dispatch(saveResult(result));
    if (count === words.length) navigate("/result");
  },[result])

  return (
    <Container maxWidth="sm" sx={{ padding: "2rem" }}>
      <Typography variant="h4" m={"2rem 0"}>Quiz</Typography>

      <Typography variant="h5">
        {count + 1} - {words[count]?.name}
      </Typography>

      <FormControl
        sx={{
          mt: "15px",
          mb: "15px",
        }}>
        <FormLabel sx={{ fontSize: "1.4rem" }}>
          meaning
        </FormLabel>

        <RadioGroup value={ans} onChange={(e) => setAns(e.target.value)}>
          {
            words[count]?.option.map((i, idx) => (
              <FormControlLabel
                control={<Radio />}
                value={i}
                label={i}
                key={idx}
              />
            ))
          }
        </RadioGroup>

        <Button
          sx={{ margin: "2rem 0" }}
          onClick={nextHandler}
          variant="contained"
          disabled={ans === ""}
        >
          {count === words.length -1 ? "save" : "next"}
        </Button>

      </FormControl>
    </Container>
  )
}

export default Quiz
