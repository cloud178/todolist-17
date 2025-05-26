import { selectThemeMode } from "@/app/app-slice"
import { ErrorSnackbar, Header } from "@/common/components"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { Routing } from "@/common/routing"
import { getTheme } from "@/common/theme"
import { meTC } from "@/features/auth/model/auth-slice"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import styles from "./App.module.css"

export const App = () => {
  debugger
  const themeMode = useAppSelector(selectThemeMode)
  const [isInitialized, setIsInitialized] = useState(false)

  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // диспатч санки возвращает санку
    dispatch(meTC()).finally(() => {
      // тут нюанс есть, санка сгенерированнная через createAsyncThunk (речь естественно про RTK)
      // всегда будет возвращать зарезолвленный промис,
      // даже если у нас реджектнулась ошибка. Поставь мы тут catch, мы в него не попадём.
      // Хотим обрабатывать ошибку - до .then напиши .unwrap(). Смотри доку
      // Использоуем finally, так как даже если упадёт ошибка,
      // мы всё равно долджны проинициализировать приложение чтобы отключить вечную в таком случае крутилку
      setIsInitialized(true)
    })
  }, [])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
