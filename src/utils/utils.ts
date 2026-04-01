export const IDToStandardSizedString = (id: number) => {
  return id.toString().padStart(3, '0')
}
