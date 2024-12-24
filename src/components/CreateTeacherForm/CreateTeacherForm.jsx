import { Box, Button, Paper, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import moment from "moment"
import FormTextInput from "../FormTextInput/FormTextInput"
import FormRadioGroup from "../FormRadioGroup/FormRadioGroup"
import FormAutoComplete from "../FormAutoComplete/FormAutoComplete"
import { getDistricts, getProvinces, getWards } from "../../helpers/api"
import FormDatePicker from "../FormDatePicker/FormDatePicker"
import AvatarChooser from "../AvatarChooser/AvatarChooser"
import { useNavigate } from "react-router-dom"
import {
  NAME_NOT_INCLUDE_NUMBER_REGEX,
  NOT_EMAIL_REGEX,
  PHONE_NUMBER_REGEX,
} from "../../constants/regex"
import { enqueueSnackbar } from "notistack"
import TeacherService from "../../services/TeacherService"
import SubjectsSelectionBox from "../SubjectsSelectionBox/SubjectsSelectionBox"

const CreateTeacher = () => {
  const { control, handleSubmit } = useForm()
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate("/admin/teacher")
  }

  const onSubmit = async (values) => {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
      gender: values.gender,
      birthday: values.birthday.toDate().toString(),
      first_day_of_work: values.firstDayOfWork.toDate().toString(),
      subject: values.subject.id,
    }

    console.log(data)
    try {
      const teacherService = new TeacherService()
      await teacherService.createTeacher(data)

      navigate("/admin/teacher")
      enqueueSnackbar("Thêm giáo viên thành công", { variant: "success" })
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" })
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      p={2}
      sx={{ pb: "74px", position: "relative", display: "flex", justifyContent: "center" }}
    >
      <Grid container spacing={1} sx={{ width: "700px" }}>
        <Grid size={12} sx={{ pb: 5 }}>
          <Typography variant="h4">Thêm giáo viên</Typography>
        </Grid>
        <Grid size={6}>
          <FormTextInput
            control={control}
            name="firstName"
            textFieldProps={{ label: "Họ và tên đệm", fullWidth: true }}
            rules={{
              required: "Vui lòng nhập họ và tên đệm",
            }}
          />
        </Grid>
        <Grid size={6}>
          <FormTextInput
            control={control}
            name="lastName"
            textFieldProps={{ label: "Tên", fullWidth: true }}
            rules={{
              required: "Vui lòng nhập tên",
            }}
          />
        </Grid>
        <Grid item size={12}>
          <FormTextInput
            name="email"
            textFieldProps={{ label: "Email", fullWidth: true }}
            control={control}
            rules={{
              required: "Vui lòng nhập email",
              pattern: {
                value: NOT_EMAIL_REGEX,
                message: "Vui lòng nhập email hợp lệ",
              },
            }}
          />
        </Grid>
        <Grid item size={12}>
          <FormTextInput
            name="phoneNumber"
            textFieldProps={{ label: "Số điện thoại", fullWidth: true }}
            control={control}
            rules={{
              required: "Vui lòng nhập số điện thoại",
              pattern: {
                value: PHONE_NUMBER_REGEX,
                message: "Vui lòng nhập số điện thoại hợp lệ",
              },
            }}
          />
        </Grid>
        <Grid item size={12}>
          <SubjectsSelectionBox
            name="subject"
            control={control}
            rules={{
              required: "Vui lòng chọn môn học"
            }}
            label="Môn học phụ trách"
          />
        </Grid>
        <Grid item="true" size={12}>
          <FormRadioGroup
            name="gender"
            control={control}
            orientation="row"
            sx={{ justifyContent: "space-around" }}
            radioOption={[
              { label: "Nam", value: "Male" },
              { label: "Nữ", value: "Female" },
            ]}
            defaultVal={"Male"}
          />
        </Grid>
        <Grid size={12}>
          <FormDatePicker
            name="birthday"
            control={control}
            label="Ngày sinh"
            rules={{
              validate: {
                required: (value) => value || "Vui lòng nhập thông tin ngày sinh",
                isValidDate: (value) => value?.isBefore(moment()) || "Ngày không hợp lệ",
                ageOver: (value) =>
                  value?.isBefore(
                    moment().subtract(18, "years").startOf("year"), //must receiver params year
                  ) || "Giáo viên phải ít nhất trên 18 tuổi",
              },
            }}
          />
        </Grid>
        <Grid item="true" size={12}>
          <FormDatePicker
            name="firstDayOfWork"
            rules={{
              validate: {
                required: (value) => value || "Vui lòng nhập thông tin ngày vào làm",
                //   isValidDate: (value) => value?.isBefore(moment()) || "Ngày không hợp lệ",
              },
            }}
            label="Ngày vào làm"
            control={control}
          />
        </Grid>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            justifyContent: "end",
            display: "flex",
            width: "100%",
            alignItems: "center",
            zIndex: 100,
            height: "70px",
            boxShadow: 3,
            px: 2,
          }}
        >
          <Button
            onClick={handleCancel}
            variant="outlined"
            size="large"
            sx={{ minWidth: "120px", mx: 2 }}
          >
            Huỷ
          </Button>
          <Button variant="contained" size="large" type="submit" sx={{ minWidth: "120px" }}>
            Lưu
          </Button>
        </Paper>
      </Grid>
    </Box>
  )
}

export default CreateTeacher
