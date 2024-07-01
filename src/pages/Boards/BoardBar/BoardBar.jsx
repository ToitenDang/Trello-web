import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterIcon from '@mui/icons-material/Filter'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root':{
    color: 'white'
  },
  '& :hover':{
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board }) {
  return (
    <Box sx={{
      width: '100%',
      height:(theme) => theme.trello.boardBarHeight,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      '&::-webkit-scrollbar-track' : { m : 2 }
    }}>
      <Box sx={{ display:'flex', alignItems:'center', gap: 2 }}>
        <Tooltip title= {board?.description}>
          <Chip
            sx={MENU_STYLE}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<FilterIcon />}
          label="Filters"
          clickable
        />
      </Box>

      <Box sx={{ display:'flex', alignItems:'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon = {<PersonAddIcon/>}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup max={3}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root':{
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0de' }
            }
          }}
        >
          <Tooltip title= "Dang">
            <Avatar alt="Dang" src="https://th.bing.com/th/id/OIP.2Kxlf9jARk8yMWlLJQ00BwAAAA?w=256&h=256&rs=1&pid=ImgDetMain" />
          </Tooltip>

          <Tooltip title= "Dang">
            <Avatar alt="Dang" src="https://th.bing.com/th/id/OIP.2Kxlf9jARk8yMWlLJQ00BwAAAA?w=256&h=256&rs=1&pid=ImgDetMain" />
          </Tooltip>

          <Tooltip title= "Dang">
            <Avatar alt="Dang" src="https://th.bing.com/th/id/OIP.2Kxlf9jARk8yMWlLJQ00BwAAAA?w=256&h=256&rs=1&pid=ImgDetMain" />
          </Tooltip>

          <Tooltip title= "Dang">
            <Avatar alt="Dang" src="https://th.bing.com/th/id/OIP.2Kxlf9jARk8yMWlLJQ00BwAAAA?w=256&h=256&rs=1&pid=ImgDetMain" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
