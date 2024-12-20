import { Box, Button, Paper } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import moment from "moment"
import FormTextInput from "../FormTextInput/FormTextInput"
import FormRadioGroup from "../FormRadioGroup/FormRadioGroup"
import FormAutoComplete from "../FormAutoComplete/FormAutoComplete"
import FormDatePicker from "../FormDatePicker/FormDatePicker"
import { getDistricts, getProvinces, getWards } from "../../helpers/api"
import AvatarChooser from "../AvatarChooser/AvatarChooser"
import { enqueueSnackbar } from "notistack"
import { upperCaseWords } from "../../utils"
import LoadingButton from "../UI/LoadingButton"

const EditStudentForm = ({ onCancel, onSubmit, initValue }) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      first_name: initValue.first_name ?? "",
      last_name: initValue.last_name ?? "",
      gender: initValue.gender ?? "Male",
      birthday: initValue?.birthday ? moment(initValue.birthday) : moment(),
      email: initValue?.email ?? "",
      country: null,
      province: null,
      district: null,
      ward: null,
      number: initValue?.Address?.number ?? "",
      street: initValue?.Address?.street ?? "",
      admission_date: initValue?.admission_day ? moment(initValue.admission_day) : null,
    }
  })
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [currentProvince, setCurrentProvince] = useState(null)
  const [currentDistrict, setCurrentDistrict] = useState(null)
  const [provinceLoading, setProvinceLoading] = useState(false)
  const [districtLoading, setDistrictLoading] = useState(false)
  const [wardLoading, setWardLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const provinceId = useMemo(() => {
    const initProvince = initValue?.Address?.province
    const currentProvinceId = currentProvince?.id

    if (currentProvinceId) {
      return currentProvinceId
    }

    if (!currentProvinceId && provinces && initProvince) {
      const initProvinceData = provinces.find(province => province.full_name === initProvince)
      setValue("province", initProvinceData)

      return initProvinceData?.id || null
    }

    return null
  }, [provinces, currentProvince, initValue])

  const districtId = useMemo(() => {
    const initDistrict = initValue?.Address?.district
    const currentDistrictId = currentDistrict?.id

    if (currentDistrictId) {
      return currentDistrictId
    }

    if (!currentDistrictId && districts && initDistrict) {
      const initDistrictData = districts.find(district => district.full_name === initDistrict)
      setValue("district", initDistrictData)

      return initDistrictData?.id || null
    }

    return null
  }, [districts, currentDistrict, initValue])

  useEffect(() => {
    ; (async () => {
      setProvinceLoading(true)
      try {
        const provinces = await getProvinces()
        setProvinces(provinces?.data || [])

        const initCountry = provinces.data.find(w => w.full_name === initValue?.country)
        if (initCountry) {
          setValue("country", initCountry)
        }
      } catch (err) {
        console.log("Error while fetching provinces", err)
      }
      setProvinceLoading(false)
    })()
  }, [])

  useEffect(() => {
    ; (async () => {
      setDistrictLoading(true)
      try {
        if (provinceId) {
          const districts = await getDistricts(provinceId)
          setDistricts(districts?.data || [])
        }
      } catch (err) {
        console.log("Error while fetching districts", err)
      }
      setDistrictLoading(false)
    })()
  }, [provinceId])

  useEffect(() => {
    ; (async () => {
      setWardLoading(true)
      try {
        if (districtId) {
          const wardResult = await getWards(districtId)
          setWards(wardResult?.data || [])

          const initWardData = wardResult.data.find(w => w.full_name === initValue?.Address?.ward)
          if (initWardData) {
            setValue("ward", initWardData)
          }
        }
      } catch (err) {
        console.log("Error while fetching wards", err)
      }
      setWardLoading(false)
    })()
  }, [districtId])

  const handleProvinceChange = async (_, val) => {
    setCurrentProvince(val)
  }

  const handleDistrictChange = async (_, val) => {
    setCurrentDistrict(val)
  }

  const handleEditSubmit = async (values) => {
    const data = {
      first_name: upperCaseWords(values.first_name),
      last_name: upperCaseWords(values.last_name),
      email: values.email,
      gender: values.gender,
      birthday: values.birthday.toDate().toString(),
      country: values.country?.full_name,
      admission_day: values.admission_date.toDate().toString(),
      address: {
        id: initValue?.Address?.id,
        province: values.province?.full_name,
        district: values.district?.full_name,
        ward: values.ward?.full_name,
        street: values.street,
        number: values.number,
      },
    }

    setLoading(true)
    try {
      await onSubmit(initValue.id, data)
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" })
    }
    setLoading(false)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleEditSubmit)} p={2}>
      <Grid container spacing={2} sx={{ pb: "70px" }}>
        <Grid
          size={12}
          sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}
        >
          {/* <AvatarChooser */}
          {/*   name="avatarChooser" */}
          {/*   control={control} */}
          {/*   rules={{ required: "Vui lòng chọn ảnh" }} */}
          {/* /> */}
        </Grid>
        <Grid container spacing={2} size={12}>
          <Grid item size={6}>
            <FormTextInput
              control={control}
              name="first_name"
              textFieldProps={{ label: "Họ và tên đệm", fullWidth: true }}
              rules={{ required: "Vui lòng nhập họ và tên đệm" }}
            />
          </Grid>
          <Grid item size={6}>
            <FormTextInput
              control={control}
              name="last_name"
              textFieldProps={{ label: "Tên", fullWidth: true }}
              rules={{ required: "Vui lòng nhập tên" }}
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
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Vui lòng nhập email hợp lệ",
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
            />
          </Grid>
          <Grid item="true" size={6}>
            <FormDatePicker
              name="birthday"
              control={control}
              label="Ngày sinh"
              rules={{
                validate: {
                  required: (value) => value || "Vui lòng nhập thông tin ngày nhâp học",
                  isValidDate: (value) => value?.isBefore(moment()) || "Ngày không hợp lệ",
                  ageOver: (value) =>
                    value?.isBefore(
                      moment().subtract(10, "years").startOf("year"), //must receiver params year
                    ) || "Học sinh ít nhất phải trên 10 tuổi",
                },
              }}
            />
          </Grid>
          <Grid item="true" size={12}>
            <FormAutoComplete
              loading={provinceLoading}
              disabled={provinceLoading}
              name="province"
              control={control}
              rules={{ required: "Cần chọn thông tin tỉnh" }}
              label="full_name"
              options={provinces}
              displayLabel={"Tỉnh/ thành phố"}
              handleSetState={(e, val) => handleProvinceChange(e, val)}
            />
          </Grid>
          <Grid item="true" size={12}>
            <FormAutoComplete
              loading={districtLoading}
              disabled={districts?.length === 0 || districtLoading}
              name="district"
              control={control}
              rules={{ required: "Vui lòng chọn quận/ huyện/ thị trấn" }}
              options={districts}
              label="full_name"
              displayLabel={"Quận/ huyện/ thị trấn"}
              handleSetState={(e, val) => handleDistrictChange(e, val)}
            />
          </Grid>
          <Grid item="true" size={12}>
            <FormAutoComplete
              loading={wardLoading}
              disabled={wards?.length === 0 || wardLoading}
              name="ward"
              control={control}
              rules={{ required: "Vui lòng chọn phường/ xã" }}
              options={wards}
              label="full_name"
              displayLabel={"Phường/ xã"}
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
              options={provinces}
              handleSetState={() => { }}
              rules={{ required: "Vui lòng nhập thông tin quê quán" }}
            />
          </Grid>
          <Grid item="true" size={6}>
            <FormDatePicker
              name="admission_date"
              rules={{
                validate: {
                  required: (value) => value || "Vui lòng nhập thông tin ngày nhâp học",
                  isValidDate: (value) => value?.isBefore(moment()) || "Ngày không hợp lệ",
                },
              }}
              label="Ngày nhập học"
              control={control}
            />
          </Grid>
        </Grid>
        <Paper
          sx={{
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
            position: "absolute",
          }}
        >
          <Button
            onClick={onCancel}
            variant="outlined"
            size="large"
            sx={{ minWidth: "120px", mx: 2 }}
          >
            Huỷ
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            size="large"
            type="submit"
            sx={{ minWidth: "120px" }}
          >
            Lưu
          </LoadingButton>
        </Paper>
      </Grid>
    </Box>
  )
}

export default EditStudentForm
