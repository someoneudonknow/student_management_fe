import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import FormTextInput from "../FormTextInput/FormTextInput";
import FormRadioGroup from "../FormRadioGroup/FormRadioGroup";
import FormAutoComplete from "../FormAutoComplete/FormAutoComplete";
import FormDatePicker from "../FormDatePicker/FormDatePicker";
import { getDistricts, getProvinces, getWards } from "../../helpers/api";

const CreateStudentForm = () => {
  const { control, handleSubmit } = useForm();
  const [provinceAdd, setProvinceAdd] = useState(null);
  const [districtAdd, setDistrictAdd] = useState(null);
  const [wardAdd, setWardAdd] = useState(null);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  useEffect(() => {
    // fetch("https://esgoo.net/api-tinhthanh/1/0.htm", {
    //   method: "GET",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setProvinceAdd(data.data);
    //   });
    (async () => {
      const provinces = await getProvinces();
      console.log(provinces);
    })();
  }, []);
  const handleOpenDistrict = (e, val) => {
    setProvince(val.id);
    fetch(`https://esgoo.net/api-tinhthanh/2/${val.id}.htm`)
      .then((res) => res.json())
      .then((data) => setDistrictAdd(data.data));
  };

  const handleOpenWard = (e, val) => {
    setDistrict(val.id);
    fetch(`https://esgoo.net/api-tinhthanh/3/${val.id}.htm`)
      .then((res) => res.json())
      .then((data) => setWardAdd(data.data));
  };
  const onSubmit = (data) => console.log(data);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} offset={3} size={6}>
        <Grid item="true" size={12} container spacing={2}>
          <Grid item="true" size={6}>
            <FormTextInput
              control={control}
              name={"first_name"}
              textFieldProps={{ label: "Họ và tên đệm", fullWidth: true }}
              rules={{ required: "Vui lòng nhập họ và tên đệm" }}
            />
          </Grid>
          <Grid item="true" size={6}>
            <FormTextInput
              control={control}
              name={"last_name"}
              textFieldProps={{ label: "Tên", fullWidth: true }}
              rules={{ required: "Vui lòng nhập tên" }}
            />
          </Grid>
        </Grid>

        <Grid item="true" size={12}>
          <FormTextInput
            name={"email"}
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
        <Grid item="true" size={12} container spacing={2}>
          <Grid item="true" size={6}>
            <FormRadioGroup
              name={"gender"}
              control={control}
              orientation="row"
              sx={{ justifyContent: "space-around" }}
              radioOption={[
                { label: "Nam", value: "Male" },
                { label: "Nữ", value: "Female" },
              ]}
              defaultVal={"Male"}
              rules={{ required: "aa" }}
            />
          </Grid>
          <Grid item="true" size={6}>
            <FormDatePicker
              name="birthday"
              control={control}
              label={"Ngày sinh"}
              rules={{
                validate: {
                  required: (value) =>
                    value || "Vui lòng nhập thông tin ngày nhâp học",
                  isValidDate: (value) =>
                    value?.isBefore(moment()) || "Ngày không hợp lệ",
                  ageOver: (value) =>
                    value?.isBefore(
                      moment().subtract(10, "years").startOf("year") //must receiver params year
                    ) || "Học sinh ít nhất phải trên 10 tuổi",
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid item="true" size={12}>
          <FormAutoComplete
            name={"province"}
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
            name={"district"}
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
            name={"ward"}
            disabled={!district}
            control={control}
            rules={{ required: "Vui lòng chọn phường/ xã" }}
            options={districtAdd}
            label="full_name"
            displayLabel={"Phường/ xã"}
            handleSetState={(e, val) => handleOpenWard(e, val)}
          />
        </Grid>
        <Grid item="true" size={12} container>
          <Grid item="true" size={8}>
            <FormTextInput
              name={"street"}
              textFieldProps={{ label: "Đường", fullWidth: true }}
              control={control}
              rules={{ required: "Vui lòng nhập thông tin đường" }}
            />
          </Grid>
          <Grid item="true" size={4}>
            <FormTextInput
              name={"number"}
              textFieldProps={{ label: "Số nhà", fullWidth: true }}
              control={control}
            />
          </Grid>
        </Grid>
        <Grid item="true" size={12}>
          <FormAutoComplete
            name={"country"}
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
            name={"admission_date"}
            rules={{
              validate: {
                required: (value) =>
                  value || "Vui lòng nhập thông tin ngày nhâp học",
                isValidDate: (value) =>
                  value?.isBefore(moment()) || "Ngày không hợp lệ",
              },
            }}
            label={"Ngày nhập học"}
            control={control}
          />
        </Grid>
        <Grid container size={12} spacing={2} sx={{ justifyContent: "end" }}>
          <Button variant="outlined" size="large" sx={{ width: "120px" }}>
            Huỷ
          </Button>
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{ width: "120px" }}
          >
            Lưu
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateStudentForm;
