import { Box, Collapse, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useCallback, useEffect, useRef, useState } from "react"
import Rule from "./Rule"
import RuleService from "../../services/RuleService"
import { ExpandLess, ExpandMore, Inbox } from "@mui/icons-material"

const SchemaRuleList = ({ list, onRulesChange }) => {
  const [open, setOpen] = useState(
    list.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: false,
      }),
      {},
    ),
  )
  const [rules, setRules] = useState({})
  const ruleServiceRef = useRef(new RuleService())
  const [loading, setLoading] = useState(false)
  const [modifiedRule, setModifiedRule] = useState({})

  useEffect(() => {
    onRulesChange && onRulesChange(modifiedRule)

    //eslint-disable-next-line
  }, [modifiedRule])

  const fetchRules = useCallback(
    async (schemaId) => {
      if (rules?.[schemaId]) return

      const ruleRes = await ruleServiceRef.current.getAll(schemaId)
      const list = ruleRes.data.metadata

      setRules((prev) => {
        return {
          ...prev,
          [schemaId]: list,
        }
      })
    },
    [rules],
  )

  const handleRulesChange = (_, rule) => {
    setModifiedRule((prev) => ({ ...prev, [rule.id]: rule }))
  }

  const handleFetchRuleClick = async (schemaId) => {
    setLoading(true)

    try {
      await fetchRules(schemaId)
      setOpen((prev) => ({ ...prev, [schemaId]: !prev[schemaId] }))
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <Box>
      {list.map((smr) => (
        <>
          <Divider />
          <List p={0} key={smr.id} dense>
            <ListItem>
              <ListItemText primary={smr.name} secondary={smr.description} />
            </ListItem>
            <ListItemButton onClick={() => handleFetchRuleClick(smr.id)}>
              <ListItemText primary="Luật áp dụng" />
              {open[smr.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[smr.id]} timeout="auto" unmountOnExit>
              <ListItem component="div" sx={{ flexDirection: "column", rowGap: 1 }}>
                {!loading && rules?.[smr.id]?.length === 0 && <p>Không có dữ liệu</p>}
                {!loading &&
                  rules?.[smr.id]?.length > 0 &&
                  rules[smr.id].map((r) => (
                    <Rule
                      onChange={(rule) => handleRulesChange(smr.id, rule)}
                      key={r.id}
                      rule={r}
                    />
                  ))}
              </ListItem>
            </Collapse>
          </List>
        </>
      ))}
    </Box>
  )
}

export default SchemaRuleList
