
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
  // PointerSensor
}
  from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVIE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVIE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVIE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  //Nếu dùng pointersensor thì phải thêm touch-action : none ở những phần tử kéo thả
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click vào chứ k di chuyển
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  //Nhấn dữ 250ms và dung sai cảm ứng 500px
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  // const nySensors = useSensors(pointerSensor)
  const mySensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // Cùng một thời điểm chỉ có một phần tử được kéo là column hoặc card
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns( mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  // Khi bắt đầu kéo 1 phần tử
  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ?
      ACTIVIE_DRAG_ITEM_TYPE.CARD :
      ACTIVIE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
  // Khi kết thúc hành động kéo 1 phần tử tức là khi thả phần tử ra vị trí mới
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event
    // Kiem tra neu khong co over thi return luon
    if (!over) return
    // Neu vi tri sau khi keo tha khac voi vi tri ban dau
    if (active.id !== over.id) {
      //Lấy vị trí cũ từ active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)

      //Lấy vị trí cũ từ active
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      // Dùng arrayMove của dnd-kit để sắp xếp lại Column ban đầu
      // Code của arrayMove ở đây: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
      const dndOrderesColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      //Dùng để sau này xử lý dữ liệu gọi từ api
      // const dndOrderesColumnsIds = dndOrderesColumns.map(c => c._id)
      // console.log('dndOrderesColumns', dndOrderesColumns)
      // console.log('dndOrderesColumnsIds', dndOrderesColumnsIds)

      // Cap nhat lai state sau khi da keo tha
      setOrderedColumns(dndOrderesColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  // Animation khi thả (Drop) phần tử: test bằng cách kéo và thả trực tiếp và nhìn phần giữ chỗ overlay
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }
  return (
    <DndContext
      sensors={mySensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height:(theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns = {orderedColumns}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVIE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVIE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
