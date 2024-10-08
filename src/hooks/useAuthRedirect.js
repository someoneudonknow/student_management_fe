import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../contexts/UserProvider/UserProvider"
import { ADMIN } from "../constants/roles"

const useAuthRedirect = () => {
  const navigate = useNavigate()
  const { data } = useUser()

  useEffect(() => {
    if (!data.user || !data.tokens) {
      return navigate("/auth")
    }

    switch (data.user.role) {
      case ADMIN:
        return navigate("/admin")
      default: return navigate("/auth")
    }

  }, [data])
}

export default useAuthRedirect
