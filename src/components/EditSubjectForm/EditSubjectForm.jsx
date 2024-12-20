import { Box, Button, Stack, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import FormTextInput from "../FormTextInput/FormTextInput"
import { INTEGER_NUMBER_REGEX } from "../../constants/regex"
import { useForm } from "react-hook-form"

const EditSubjectForm = ({ onCancel, onSubmit, initValue, loading }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: initValue?.name ?? "",
      numberOfPeriod: initValue.number_of_period ?? "",
    },
  })

  return (
    <Box
      component="form"
      sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h6">Chỉnh sửa môn học</Typography>
        </Grid>
        <Grid size={12}>
          <FormTextInput
            name="name"
            control={control}
            textFieldProps={{ label: "Tên môn học ", fullWidth: true, size: "small" }}
            rules={{
              required: "Vui lòng nhập tên môn học",
            }}
          />
        </Grid>
        <Grid size={12}>
          <FormTextInput
            name="numberOfPeriod"
            control={control}
            textFieldProps={{ label: "Tổng số tiết", fullWidth: true, size: "small" }}
            rules={{
              required: "Vui lòng nhập tổng số tiết",
              pattern: {
                value: INTEGER_NUMBER_REGEX,
                message: "Sô tiết phải là giá trị số",
              },
            }}
          />
        </Grid>
        <Grid size={12}>
          <Stack direction="row" justifyContent="flex-end" component="div" gap={2}>
            <Button
              variant="outlined"
              sx={{ minWidth: "80px" }}
              disable={loading}
              onClick={onCancel}
            >
              Huỷ
            </Button>
            <Button variant="contained" type="submit" disable={loading} sx={{ minWidth: "120px" }}>
              Lưu
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EditSubjectForm
