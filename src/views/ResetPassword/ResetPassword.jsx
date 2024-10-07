import { Box, Paper, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import FormPasswordInput from "../../components/FormPasswordInput/FormPasswordInput"
import LoadingButton from "../../components/UI/LoadingButton"
import { useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import AuthService from "../../services/AuthService"

const ResetPassword = () => {
  const { handleSubmit, control } = useForm()
  const [searchParams, _] = useSearchParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const otp = searchParams.get("otp") ?? ""
  const uid = searchParams.get("uid") ?? ""

  useEffect(() => {
    if (!otp || !uid) {
      navigate("/auth")
    }
  }, [otp, uid])

  const handleResetPassword = async (values) => {
    const { password } = values
    const data = {
      newPassword: password,
      uid,
      otp
    }

    try {
      setLoading(true)
      const authService = new AuthService()
      console.log({ data })
      await authService.resetPassword(data)

      navigate("/auth")
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <Paper
        component="form"
        onSubmit={handleSubmit(handleResetPassword)}
        sx={{
          width: "400px",
          p: 3,
          borderRadius: 1,
          border: theme => `1px solid ${theme.palette.text.primary}`
        }}
      >
        <Typography variant="h4" textAlign="center" mb={4}>Đặt lại mật khẩu</Typography>
        <FormPasswordInput
          name="password"
          control={control}
          label="Mật khẩu mới"
          rules={{
            required: "Vui lòng nhập mật khẩu mới",
            minLength: {
              value: 6,
              message: "Mật khẩu mới phải lớn hơn 6 kí tự"
            }
          }}
        />
        <FormPasswordInput
          name="passwordConfirmation"
          textFieldProps={{ sx: { mt: 2 } }}
          control={control}
          label="Xác nhận mật khẩu"
          rules={{
            required: "Vui lòng không để trống trường này",
            minLength: {
              value: 6,
              message: "Mật khẩu mới phải lớn hơn 6 kí tự"
            }
          }}
        />
        <LoadingButton type="submit" wrapperSx={{ mt: 5 }} fullWidth loading={loading} variant="contained">
          Xác nhận
        </LoadingButton>
      </Paper>
    </Box>
  )
}

export default ResetPassword
