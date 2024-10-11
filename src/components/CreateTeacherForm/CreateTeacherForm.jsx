import { Box, Button, Paper } from "@mui/material"
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

const CreateTeacher = () => {
  const { control, handleSubmit } = useForm()
  const [provinceAdd, setProvinceAdd] = useState(null)
  const [districtAdd, setDistrictAdd] = useState(null)
  const [wardAdd, setWardAdd] = useState(null)
  const [province, setProvince] = useState(null)
  const [district, setDistrict] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const provinces = await getProvinces()
      setProvinceAdd(provinces.data)
    })()
  }, [])

  const handleCancel = () => {
    navigate("..")
  }

  const handleOpenDistrict = async (_, val) => {
    const districts = await getDistricts(val.id)

    setProvince(val.id)
    setDistrictAdd(districts.data)
  }

  const handleOpenWard = async (_, val) => {
    const wards = await getWards(val.id)

    setDistrict(val.id)
    setWardAdd(wards.data)
  }

  const onSubmit = (values) => {
    //not include avatar
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
      gender: values.gender,
      birthday: values.birthday.toDate(),
      first_day_of_work: values.firstDayOfWork.toDate(),
      address: {
        province: values.province?.full_name,
        district: values.district?.full_name,
        ward: values.ward?.full_name,
        street: values.street,
        number: values.number,
      },
    }

    console.log({ data })
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      p={2}
      sx={{ pb: "74px", position: "relative" }}
    >
      <Grid container spacing={2}>
        <Grid
          size={{ xs: 12, md: 2 }}
          sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}
        >
          <AvatarChooser
            name="avatarChooser"
            control={control}
            rules={{ required: "Vui lòng chọn ảnh" }}
          />
        </Grid>
        <Grid container spacing={2} size={{ xs: 12, md: 10 }}>
          <Grid item size={6}>
            <FormTextInput
              control={control}
              name="firstName"
              textFieldProps={{ label: "Họ và tên đệm", fullWidth: true }}
              rules={{
                required: "Vui lòng nhập họ và tên đệm",
                pattern: {
                  value: NAME_NOT_INCLUDE_NUMBER_REGEX,
                  message: "Họ và tên đệm không bao gồm số",
                },
              }}
            />
          </Grid>
          <Grid item size={6}>
            <FormTextInput
              control={control}
              name="lastName"
              textFieldProps={{ label: "Tên", fullWidth: true }}
              rules={{
                required: "Vui lòng nhập tên",
                pattern: {
                  value: NAME_NOT_INCLUDE_NUMBER_REGEX,
                  message: "Tên không bao gồm số",
                },
              }}
            />
          </Grid>
          <Grid item size={6}>
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
          <Grid item size={6}>
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
          <Grid item="true" size={6}>
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
          <Grid item="true" size={6}>
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
            <FormAutoComplete
              name="province"
              control={control}
              rules={{ required: "Cần chọn thông tin tỉnh" }}
              label="full_name"
              options={provinceAdd}
              displayLabel={"Tỉnh/ thành phố"}
              handleSetState={(e, val) => handleOpenDistrict(e, val)}
            />
          </Grid>
          <Grid item="true" size={12}>
            <FormAutoComplete
              name="district"
              control={control}
              disabled={!province}
              rules={{ required: "Vui lòng chọn quận/ huyện/ thị trấn" }}
              options={districtAdd}
              label="full_name"
              displayLabel={"Quận/ huyện/ thị trấn"}
              handleSetState={(e, val) => handleOpenWard(e, val)}
            />
          </Grid>
          <Grid item="true" size={12}>
            <FormAutoComplete
              name="ward"
              disabled={!district}
              control={control}
              rules={{ required: "Vui lòng chọn phường/ xã" }}
              options={wardAdd}
              label="full_name"
              displayLabel={"Phường/ xã"}
              handleSetState={(e, val) => handleOpenWard(e, val)}
            />
          </Grid>
          <Grid item="true" size={6}>
            <FormTextInput
              name="street"
              textFieldProps={{ label: "Đường", fullWidth: true }}
              control={control}
              rules={{ required: "Vui lòng nhập thông tin đường" }}
            />
          </Grid>
          <Grid item="true" size={6}>
            <FormTextInput
              name="number"
              textFieldProps={{ label: "Số nhà", fullWidth: true }}
              control={control}
            />
          </Grid>
          <Grid item="true" size={6}>
            <FormAutoComplete
              name="country"
              label="full_name"
              displayLabel={"Quê quán"}
              control={control}
              options={provinceAdd}
              handleSetState={() => {}}
              rules={{ required: "Vui lòng nhập thông tin quê quán" }}
            />
          </Grid>
          <Grid item="true" size={6}>
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
