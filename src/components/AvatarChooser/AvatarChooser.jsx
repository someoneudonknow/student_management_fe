import { Box, Button, Paper } from "@mui/material"
import { useEffect, useId, useRef, useState } from "react"
import Image from "../UI/Image.jsx"
import default_avatar from "../../assets/images/default_avatar.png"
import { getFileDataURL } from "../../utils/index.js"
import FormFileInput from "../FormFileInput/FormFileInput.jsx"

const AvatarChooser = ({ onChange, name = "avatarInput", rules = {}, buttonText = "Chọn ảnh", control }) => {
  const id = useId()
  const inputId = `avatar-chooser-${id}`
  const fileInputRef = useRef()
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageURL, setSelectedImageURL] = useState(default_avatar)

  useEffect(() => {
    onChange && onChange(selectedImage)
  }, [selectedImage])

  const handleSelectionChanged = async (e) => {
    if (!e?.target?.files) return
    const file = e.target.files[0]

    if (file) {
      const imageURL = await getFileDataURL(file)

      setSelectedImage(file)
      setSelectedImageURL(imageURL)
    }

    e.target.files = undefined
  }

  return (
    <Paper sx={{ p: 2, width: "200px" }}>
      <FormFileInput
        name={name}
        rules={rules}
        control={control}
        ref={fileInputRef}
        onChange={handleSelectionChanged}
        id={inputId}
        accept="image/*"
        hidden
      />
      <Image sx={{ width: "100%", aspectRatio: 3 / 4 }} src={selectedImageURL} />
      <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={() => fileInputRef.current.click()}>
        {buttonText}
      </Button>
    </Paper>
  )
}

export default AvatarChooser
