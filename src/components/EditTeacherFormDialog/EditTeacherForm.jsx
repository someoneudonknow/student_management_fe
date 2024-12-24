import { Box, Button, Paper } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import moment from "moment"
import FormTextInput from "../FormTextInput/FormTextInput"
import FormRadioGroup from "../FormRadioGroup/FormRadioGroup"
import FormDatePicker from "../FormDatePicker/FormDatePicker"
import { enqueueSnackbar } from "notistack"
import { NOT_EMAIL_REGEX, NOT_PHONE_NUMBER_REGEX, PHONE_NUMBER_REGEX } from "../../constants/regex"
import SubjectsSelectionBox from "../SubjectsSelectionBox/SubjectsSelectionBox"

const EditTeacherForm = ({ onCancel, onSubmit, initValue }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: initValue.first_name ?? "",
      lastName: initValue.last_name ?? "",
      gender: initValue.gender ?? "Male",
      birthday: initValue?.birthday ? moment(initValue.birthday) : moment(),
      email: initValue?.email ?? "",
      firstDayOfWork: initValue?.first_day_of_work ? moment(initValue.first_day_of_work) : null,
      phoneNumber: initValue?.phone_number,
      isRetired: initValue?.is_retired,
      subject: initValue?.Subject ?? null
    },
  })

  const handleCancel = () => {
    onCancel()
  }

  const onEdit = async (values) => {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
      gender: values.gender,
      birthday: values.birthday.toDate().toString(),
      first_day_of_work: values.firstDayOfWork.toDate().toString(),
      is_retired: values.isRetired,
      subject: values.subject?.id
    }

    try {
      onSubmit && (await onSubmit(initValue.id, data, values))
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" })
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onEdit)}
      p={2}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Grid container spacing={1} sx={{ width: "700px" }}>
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

        <Grid item="true" size={12}>
          <FormRadioGroup
            name="gender"
            control={control}
            orientation="row"
            sx={{ justifyContent: "start", gap: 1 }}
            radioOption={[
              { label: "Nam", value: "Male" },
              { label: "Nữ", value: "Female" },
            ]}
            defaultVal={"Male"}
          />
        </Grid>
        <Grid item size={12}>
          <FormTextInput
            name="phoneNumber"
            textFieldProps={{ label: "Số điện thoại", fullWidth: true }}
            control={control}
            rules={{
              required: "Vui lòng nhập số điện thoại",
              validate: {
                isPhoneNum: function (value) {
                  if (value && PHONE_NUMBER_REGEX.test(value)) {
                    return "Vui lòng nhập số điện thoại hợp lệ"
                  }
                  return true
                }
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
            name="isRetired"
            control={control}
            orientation="row"
            sx={{ justifyContent: "start", gap: 1 }}
            radioOption={[
              { label: "Đang dạy", value: false },
              { label: "Đã nghỉ hưu", value: true },
            ]}
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
                  value?.isBefore(moment().subtract(18, "years").startOf("year")) ||
                  "Giáo viên phải ít nhất trên 18 tuổi",
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
        <Grid size={12} sx={{ display: "flex", mt: 3 }} justifyContent="end">
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
        </Grid>
      </Grid>
    </Box>
  )
}

export default EditTeacherForm
