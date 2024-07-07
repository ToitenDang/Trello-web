
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { feachBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    //Tạm thời fix cứng boardId
    const boardId = '668512126e7384646e83b0ed'
    // Call API
    feachBoardDetailsAPI(boardId).then( board => {
      // Cần xử lý kéo thả vào một column rỗng sau F5 trang Web
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
      })
      setBoard(board)
    })
  }, [])

  // Func này có nhiệm vụ gọi API tạo mới Column và làm lại dữ liệu vào State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Cần xử lý kéo thả vào một column rỗng khi tạo mới
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    // Cập nhật state board
    // Phía front-end tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
    // Cách làm này phụ thuộc vào đặc thù dự án, có nơi thì BE sẽ hộc trợ trả về luôn toàn bộ Board đầy đủ
    // dù đây có là api tạo column và card đi nữa
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // Func này có nhiệm vụ gọi API tạo mới Card và làm lại dữ liệu vào State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cập nhật state board
    // Cập nhật state board
    // Phía front-end tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
    // Cách làm này phụ thuộc vào đặc thù dự án, có nơi thì BE sẽ hộc trợ trả về luôn toàn bộ Board đầy đủ
    // dù đây có là api tạo column và card đi nữa
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  // Gọi API sau khi kéo thả column xong xuôi
  const moveColumns = async (dndOrderedColumns) => {
    // Cập nhật lại cho chuẩn dữ liệu stateBoard
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API update Board
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  return (
    <Container disableGutters maxWidth = {false} sx={{ height:'100vh' }}>
      <AppBar/>
      {/*Optional chaining kiem tra neu co board thi di vao */}
      <BoardBar board = {board} />
      <BoardContent
        board = {board}
        createNewColumn = {createNewColumn}
        createNewCard = {createNewCard}
        moveColumns = {moveColumns}
      />
    </Container>
  )
}

export default Board
