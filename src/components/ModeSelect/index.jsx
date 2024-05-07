import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightMode from '@mui/icons-material/LightMode'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectMode = event.target.value
    setMode(selectMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-dark-light-mode"
        id="dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <div style={{ display: 'flex', alignItems:'center', gap:'8px' }}>
            <LightMode fontSize='small' /> Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <div style={{ display: 'flex', alignItems:'center', gap:'8px' }}>
            <DarkModeOutlined fontSize='small' /> Dark
          </div>
        </MenuItem>
        <MenuItem value="system">
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <SettingsBrightnessIcon fontSize='small'/> System
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
