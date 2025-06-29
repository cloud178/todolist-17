import { selectThemeMode } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { type LoginInputs, loginSchema } from "@/features/auth/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { loginTC, selectIsLoggedIn } from "../../model/auth-slice"
import { Navigate, useNavigate } from "react-router"
import { Path } from "@/common/routing"
import { useEffect } from "react"

export const Login = () => {
  debugger
  const themeMode = useAppSelector(selectThemeMode)
  // const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data)
    dispatch(loginTC(data))
    reset()
  }

  // в случае если мы залогинины, перекинуть приложение нас должно на главную страницу
  //1 способ, дока его рекомендует, а Валера рекомендует, т.к. писать меньше кода, в сравнении со вторым способом
  // if (isLoggedIn) {
  //   return <Navigate to={Path.Main} />
  // }
  // 2 вариант
  // если использовать просто такой вариант без юзэффекта, то будет падать ошибка, в консоли видно,
  // поэтому надо в юзэффекте этот второй способ использовать. Как понимаю это связано с тем что
  // компонента должна возвращать разметку, а мыв этом втором способе не возвращаем,
  // а редиректем на другую компоненту, до return tsx не доходим и видимо с этим связано
  // и на это ругается
  // if (isLoggedIn) {
  //   navigate(Path.Main)
  // }
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate(Path.Main)
  //   }
  // }, [isLoggedIn])

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.email}
              {...register("password")}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label={"Remember me"}
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                />
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
