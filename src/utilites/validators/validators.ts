export type ValidatorType = (values: string) => string | undefined

export const notEmpty: ValidatorType = values => values.length ? undefined : "Please, type something before submiting"

export const maxLengthCreator = (maxLength: number): ValidatorType => values => {
  return values.length > maxLength
    ? `Max length is ${ maxLength } symbols`
    : undefined
}