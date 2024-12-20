import { Alert, Box, Container, Paper, Typography } from "@mui/material"
import LoadingButton from "../../components/UI/LoadingButton"
import FormTextInput from "../../components/FormTextInput/FormTextInput"
import { useForm } from "react-hook-form"
import { NOT_EMAIL_REGEX } from "../../constants/regex"
import { useState } from "react"
import { Link } from "react-router-dom"
import AuthService from "../../services/AuthService"
import { useSnackbar } from "notistack"

const LoginLink = ({ sx }) => {
  return <Box sx={{ width: "100%", textAlign: "left", mb: 4, fontSize: "15px", mt: 1, ...sx }}>
    Đã có tài khoản? <Link to="/auth">đăng nhập</Link>
  </Box>
}


const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm()
  const { enqueueSnackbar } = useSnackbar()
  const [sentEmail, setSentEmail] = useState(null)

  const handleSendVerifyCode = async (values) => {
    const { emailVerification } = values

    try {
      setLoading(true)
      const authService = new AuthService()
      await authService.forgotPassword({ email: emailVerification })

      setSentEmail(emailVerification)
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      {!sentEmail && <Paper
        onSubmit={handleSubmit(handleSendVerifyCode)}
        component="form"
        sx={{
          width: "400px",
          p: 3,
          borderRadius: 1,
          border: theme => `1px solid ${theme.palette.text.primary}`
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>Xác nhận email</Typography>
        <FormTextInput
          name="emailVerification"
          control={control}
          textFieldProps={{
            size: "medium",
            fullWidth: true,
            label: "Email",
          }}
          rules={{
            required: "Vui lòng nhập địa chỉ email",
            pattern: {
              value: NOT_EMAIL_REGEX,
              message: "Địa chỉ email không hợp lệ"
            }
          }}
        />
        <LoginLink />
        <LoadingButton loading={loading} type="submit" variant="contained" fullWidth>
          Xác nhận
        </LoadingButton>
      </Paper>}
      {sentEmail && (
        <Box sx={{ maxWidth: "400px", fontSize: "20px" }}>
          <p>
            Nếu tài khoản cho email <strong>{sentEmail}</strong> có tồn tại, bạn sẽ nhận được một liên kết dẫn đến trang đặt lại mật khẩu thông qua email. Nếu bạn không tìm thấy liên kết hãy kiểm tra cả thư mục spam trong email.
          </p>
          <LoginLink sx={{ mt: 2 }} />
        </Box>
      )}
    </Box>
  )
}

export default ForgotPassword
