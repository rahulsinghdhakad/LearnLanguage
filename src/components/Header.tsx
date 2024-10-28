import { AppBar, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const style={
  textDecoration:"none",
  margin:"0.5rem",
  color:"white",
}

const Header = () => {
  return (
      <AppBar position="static">
        <Toolbar>
          <Typography mr={"auto"} variant="h6" textTransform={"uppercase"} >
            Learno
          </Typography>
          <Link to={"/"} style={style}>Home</Link>
          <Link to={"/login"} style={style}>Login</Link>
        </Toolbar>
      </AppBar>
  )
}

export default Header
