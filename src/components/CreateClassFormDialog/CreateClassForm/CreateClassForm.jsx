import { Grid2 as Grid, Box, Button, Stack, Typography, InputLabel } from "@mui/material"
import { useForm } from "react-hook-form"
import FormTextInput from "../../FormTextInput/FormTextInput"
import FormRadioGroup from "../../FormRadioGroup/FormRadioGroup"

const CreateClassForm = ({ onCancel, onSubmit, title = "Thêm môn học", loading }) => {
  const { control, handleSubmit } = useForm()

  return (
    <Box
      component="form"
      sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid size={12}>
          <FormTextInput
            name="className"
            control={control}
            textFieldProps={{ label: "Tên lớp học", fullWidth: true, size: "small" }}
            rules={{
              required: "Vui lòng nhập tên lớp học",
            }}
          />
        </Grid>
        <Grid size={12}>
          <InputLabel sx={{ fontSize: "17px", color: "black" }}>Khối</InputLabel>
          <FormRadioGroup
            name="grade"
            control={control}
            label="Khối"
            orientation="row"
            sx={{ justifyContent: "flex-start", gap: "10px" }}
            radioOption={[
              { value: "10", label: "10" },
              { value: "11", label: "11" },
              { value: "12", label: "12" },
            ]}
            defaultVal="10"
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
              Tạo
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateClassForm
