import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { createTodolistTC } from "@/features/todolists/model/todolists-slice"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"
import { Navigate, useNavigate } from "react-router"
import { Path } from "@/common/routing"
import { useEffect } from "react"

export const Main = () => {
  debugger
  const dispatch = useAppDispatch()

  // const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const navigate = useNavigate()

  const createTodolist = (title: string) => {
    dispatch(createTodolistTC(title))
  }

  // if (!isLoggedIn) {
  //   return <Navigate to={Path.Login} />
  // }
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate(Path.Login)
  //   }
  // }, [isLoggedIn])

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
