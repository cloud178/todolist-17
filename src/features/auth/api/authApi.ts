import { instance } from "@/common/instance"
import { LoginInputs } from "@/features/auth/lib/schemas"
import { BaseResponse } from "@/common/types"

export const authApi = {
  login(args: LoginInputs) {
    return instance.post<BaseResponse<{ userId: string; token: string }>>("/auth/login", args)
  },
  logout() {
    return instance.delete<BaseResponse>("/auth/login")
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("/auth/me")
  },
}
