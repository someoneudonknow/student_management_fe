import { Box, Button, Grid2 as Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import FormTextInput from '../FormTextInput/FormTextInput'
import { useForm } from 'react-hook-form'
import { INTEGER_NUMBER_REGEX } from '../../constants/regex'

const EditClassForm = ({defaultValues, onCancel, onSubmit, loading}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
        name: defaultValues?.name ?? "",
        grade: defaultValues?.grade ?? "",
    },
  })

  return (
    <Box
      component="form"
      sx={{ width: "300px", height: "100%", display: "grid", placeItems: "center" }}
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
            name="grade"
            control={control}
            textFieldProps={{ label: "Khối", fullWidth: true, size: "small" }}
            rules={{
              required: "Vui lòng nhập khối",
              pattern: {
                value: INTEGER_NUMBER_REGEX,
                message: "Khối phải là giá trị số",
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

export default EditClassForm