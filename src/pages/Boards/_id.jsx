
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { feachBoardDetailsAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    //Tạm thời fix cứng boardId
    const boardId = '667e1f2250c5e53f94c459aa'
    // Call API
    feachBoardDetailsAPI(boardId).then( board => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth = {false} sx={{ height:'100vh' }}>
      <AppBar/>
      {/*Optional chaining kiem tra neu co board thi di vao */}
      <BoardBar board = {board} />
      <BoardContent board = {board}/>
    </Container>
  )
}

export default Board
