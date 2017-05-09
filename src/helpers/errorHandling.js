import { Errors } from '../db'

function getCorrectError (error, defaultMsg, docNotFoundMsg, invalidWriteMsg, validErrorMsg) {
  var resultMsg = defaultMsg
  if (error instanceof Errors.DocumentNotFound) {
    resultMsg = docNotFoundMsg || defaultMsg
  } else if (error instanceof Errors.InvalidWrite) {
    resultMsg = invalidWriteMsg || defaultMsg
  } else if (error instanceof Errors.ValidationError) {
    resultMsg = validErrorMsg || defaultMsg
  }

  return resultMsg
}

export { getCorrectError }
