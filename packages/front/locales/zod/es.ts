import {
  ErrorMapCtx,
  ZodErrorMap,
  ZodIssueCode,
  ZodIssueOptionalMessage,
  ZodParsedType,
  util,
} from 'zod'

const capitalized = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

export const es: ZodErrorMap = (issue: ZodIssueOptionalMessage, _ctx: ErrorMapCtx) => {
  let message: string
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = 'Debe ser informado'
      } else {
        message = `Esperado ${issue.expected}, recibió ${issue.received}`
      }
      break
    case ZodIssueCode.invalid_literal:
      message = `Valor literal no válido, esperado ${JSON.stringify(
        issue.expected,
        util.jsonStringifyReplacer
      )}`
      break
    case ZodIssueCode.unrecognized_keys:
      message = `Clave(s) no reconocida(s) en el objeto: ${util.joinValues(
        issue.keys,
        ', '
      )}`
      break
    case ZodIssueCode.invalid_union:
      message = 'Entrada inválida'
      break
    case ZodIssueCode.invalid_union_discriminator:
      message = `Valor de discriminador no válido. Esperado ${util.joinValues(
        issue.options
      )}`
      break
    case ZodIssueCode.invalid_enum_value:
      message = `Valor de enum no válido. Esperado ${util.joinValues(
        issue.options
      )}, recibió '${issue.received}'`
      break
    case ZodIssueCode.invalid_arguments:
      message = 'Argumentos de función no válidos'
      break
    case ZodIssueCode.invalid_return_type:
      message = 'Tipo de retorno de función no válido'
      break
    case ZodIssueCode.invalid_date:
      message = 'Fecha invalida'
      break
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === 'object') {
        if ('startsWith' in issue.validation) {
          message = `Debe comenzar con "${issue.validation.startsWith}"`
        } else if ('endsWith' in issue.validation) {
          message = `debe terminar con "${issue.validation.endsWith}"`
        } else {
          util.assertNever(issue.validation as never)
        }
      } else if (issue.validation !== 'regex') {
        message = `${capitalized(issue.validation)} no válido`
      } else {
        message = 'No válido'
      }
      break
    case ZodIssueCode.too_small:
      if (issue.type === 'array') {
        message = `Debe contener ${
          issue.exact ? '' : issue.inclusive ? 'al menos' : 'más que'
        } ${issue.minimum} elemento${issue.minimum !== 1 ? 's' : ''}`
      } else if (issue.type === 'string') {
        message = `Debe contener ${
          issue.exact ? '' : issue.inclusive ? 'al menos' : 'más que'
        } ${issue.minimum} caracter${issue.minimum !== 1 ? 'es' : ''}`
      } else if (issue.type === 'number') {
        message = `Debe ser ${
          issue.exact ? 'igual a ' : issue.inclusive ? 'mayor o igual a ' : 'mayor qué '
        }${issue.minimum}`
      } else if (issue.type === 'date') {
        message = `Debe ser ${
          issue.exact ? 'igual a ' : issue.inclusive ? 'mayor o igual a ' : 'mayor qué '
        }${new Date(issue.minimum as never)}`
      } else {
        message = 'Entrada inválida'
      }
      break
    case ZodIssueCode.too_big:
      if (issue.type === 'array') {
        message = `Debe contener ${
          issue.exact ? '' : issue.inclusive ? 'en el máximo' : 'menos que'
        } ${issue.maximum} element(s)`
      } else if (issue.type === 'string') {
        message = `Debe contener ${
          issue.exact ? '' : issue.inclusive ? 'en el máximo' : 'menos que'
        } ${issue.maximum} caracter${issue.maximum ? 'es' : ''}`
      } else if (issue.type === 'number') {
        message = `Debe ser ${
          issue.exact ? '' : issue.inclusive ? 'menos o igual a ' : 'menos que'
        } ${issue.maximum}`
      } else if (issue.type === 'date') {
        message = `Debe ser ${
          issue.exact ? '' : issue.inclusive ? 'menos o igual a ' : 'menos que '
        } ${new Date(issue.maximum as never)}`
      } else {
        message = 'Entrada inválida'
      }
      break
    case ZodIssueCode.custom:
      message = 'Entrada inválida'
      if (issue.params) {
        const issueType = issue.params[0].type
        if (issueType === 'invalid_password_confirmation_match') {
          message = 'Contraseña y confirmación no coinciden'
        }
        if (issueType === 'required_current_password') {
          message = 'Requerido para cambiar contraseña y/o e-mail'
        }
      }
      break
    case ZodIssueCode.invalid_intersection_types:
      message = 'Los resultados de la intersección no se pudieron fusionar.'
      break
    case ZodIssueCode.not_multiple_of:
      message = `El número debe ser un múltiplo de ${issue.multipleOf}`
      break
    case ZodIssueCode.not_finite:
      message = 'El número debe ser finito.'
      break
    default:
      message = _ctx.defaultError
      util.assertNever(issue)
  }
  return { message }
}
