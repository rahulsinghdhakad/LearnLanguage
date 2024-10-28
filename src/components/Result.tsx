import { Button, Container, List, ListItem, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { clearState } from "../redux/slices";

const getCorrectAns = (words: WordType[], result: string[]) => {
  let ans = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].meaning === result[i]) ans++;
  }
  return ans;
}

const Result = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { words, result } = useSelector(
    (state: { root: stateType }) => state.root)

  const correctAns = getCorrectAns(words, result);
  const percentage = (correctAns / words.length) * 100;

  const resetHandler = () => {
    dispatch(clearState())
    navigate('/')
  }

  return (
    <Container maxWidth={"sm"} sx={{ padding: "3rem" }}>
      <Typography variant="h5" color="primary">
        Result
      </Typography>
      <Typography variant="h4" padding={"1rem 0"}>
        you got {correctAns} out of {words.length} answers correct
      </Typography>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-around"} >
        <Stack>
          <Typography variant="h5" m={"1rem 0"}>
            your answers
          </Typography>
          <List sx={{ fontSize: "1.2rem" }} >
            {
              result.map((i, idx) => (
                <ListItem key={idx}>
                  {idx + 1} - {i}
                </ListItem>
              ))
            }
          </List>
        </Stack>
        <Stack>
          <Typography variant="h5" m={"1rem 0"}>
            correct answers
          </Typography>
          <List sx={{ fontSize: "1.2rem" }}>
            {
              words.map((i, idx) => (
                <ListItem key={idx}>
                  {idx + 1} - {i.meaning}
                </ListItem>
              ))
            }
          </List>
        </Stack>
      </Stack>
      <Typography
        padding={"1rem"}
        variant="h5"
        color={ percentage>50 ? "green" : "red"}
      >
        {
          percentage > 50 ? "pass" : "fail"
        }
      </Typography>
      <Button
        onClick={resetHandler}
        variant="contained"
        sx={{ margin: "1rem" }}>
        Reset
      </Button>
    </Container>
  )
}

export default Result
