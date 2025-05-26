import { Main } from "@/app/Main"
import { PageNotFound } from "@/common/components"
import { Login } from "@/features/auth/ui/Login/Login"
import { Route, Routes } from "react-router"
import { ProtectedRoute } from "@/common/components/ProtectedRoute/ProtectedRoute.tsx"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"
import { useAppSelector } from "@/common/hooks"

export const Path = {
  Main: "/",
  Login: "/login",
  Faq: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Faq} element={<h1>Faq</h1>} />
      </Route>
      {/*Более громоздкая реализация, выше сделано элегантней через nested routes*/}
      {/*<Route*/}
      {/*  path={Path.Main}*/}
      {/*  element={*/}
      {/*    <ProtectedRoute isAllowed={isLoggedIn}>*/}
      {/*      <Main />*/}
      {/*    </ProtectedRoute>*/}
      {/*  }*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  path={Path.Faq}*/}
      {/*  element={*/}
      {/*    <ProtectedRoute isAllowed={isLoggedIn}>*/}
      {/*      <h1>Faq</h1>*/}
      {/*    </ProtectedRoute>*/}
      {/*  }*/}
      {/*/>*/}

      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
