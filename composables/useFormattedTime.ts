export const useDateFormat = () => {
  const useFormattedTime = (rawDate: string) => {
    const dateObj = new Date(rawDate)

    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const hour = dateObj.getHours()
    const minute = dateObj.getMinutes()

    const formattedTime = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
      2,
      '0'
    )} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

    return formattedTime
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`
  }

  return { useFormattedTime, formatDate }
}
