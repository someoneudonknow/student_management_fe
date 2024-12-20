import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import PrimaryModal from "../PrimaryModal/PrimaryModal"
import { useEffect, useRef, useState } from "react"
import SchemaRuleList from "./SchemaRuleList"
import SchemaRuleService from "../../services/SchemaRuleService"
import RuleService from "../../services/RuleService"
import { enqueueSnackbar } from "notistack"

const RuleModal = ({ open, onClose }) => {
  const [schemaRules, setSchemaRules] = useState([])
  const schemaRuleServiceRef = useRef(new SchemaRuleService())
  const ruleServiceRef = useRef(new RuleService())
  const [needUpdates, setNeedUpdates] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      const schemaRuleRes = await schemaRuleServiceRef.current.getAll()
      const list = schemaRuleRes.data.metadata

      setSchemaRules(list)
    })()
  }, [])

  const handleSave = async () => {
    if (needUpdates.length === 0) return

    const ruleUpdate = Object.values(needUpdates).map((r) => ({
      id: r.id,
      compare_value: String(r.compare_value),
    }))

    setLoading(true)
    try {
      const result = await Promise.allSettled(
        ruleUpdate.map(
          async (update) =>
            await ruleServiceRef.current.update(update.id, { compare_value: update.compare_value }),
        ),
      )
      onClose()
      enqueueSnackbar("Sửa đổi chỉ số thành công", { variant: "success" })
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const handleRuleChange = (data) => {
    console.log(data)
    setNeedUpdates(data)
  }

  return (
    <PrimaryModal containerSx={{ width: "500px" }} onClose={onClose} open={open}>
      <Typography textAlign="center" mb={2} variant="h5">
        Điều chỉnh luật
      </Typography>
      {schemaRules.length > 0 && (
        <SchemaRuleList list={schemaRules} onRulesChange={handleRuleChange} />
      )}
      <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
        <Button disabled={loading} variant="outlined" onClick={onClose}>
          Huỷ
        </Button>
        <Button disabled={loading} onClick={handleSave} variant="contained" sx={{ width: 100 }}>
          Lưu
        </Button>
      </Stack>
    </PrimaryModal>
  )
}

export default RuleModal
