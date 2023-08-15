export const getRandomItems = (array, size) => {
  const items = []
  const allItems = [...array]

  for (let i = 0; i < size; i++) {
    const index = Math.floor(Math.random() * allItems.length)
    items.push(allItems[index])
    allItems.splice(index, 1)
  }

  return items
}

export const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val)