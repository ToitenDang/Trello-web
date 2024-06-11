import Board from "~/pages/Boards/_id"

/* Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// Fe tự tạo ra một Card đặc biệt không liên quan đến Be,
// Card này được ẩn ở giao diện người dùng
// Cấu trúc Id của card này để unique rất đơn giản không cần phải random
// Mỗi column chỉ có thể có một placeholderCard
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}