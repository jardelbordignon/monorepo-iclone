import {
  ErrorMapCtx,
  ZodErrorMap,
  ZodIssueCode,
  ZodIssueOptionalMessage,
  ZodParsedType,
  util,
} from 'zod'

const capitalized = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

export const pt: ZodErrorMap = (issue: ZodIssueOptionalMessage, _ctx: ErrorMapCtx) => {
  let message: string
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = 'Obrigatório'
      } else {
        message = `Esperado ${issue.expected}, recebido ${issue.received}`
      }
      break
    case ZodIssueCode.invalid_literal:
      message = `Valor literal inválido, esperado ${JSON.stringify(
        issue.expected,
        util.jsonStringifyReplacer
      )}`
      break
    case ZodIssueCode.unrecognized_keys:
      message = `Chave(s) não reconhecida(s) no objeto: ${util.joinValues(
        issue.keys,
        ', '
      )}`
      break
    case ZodIssueCode.invalid_union:
      message = 'Inválido'
      break
    case ZodIssueCode.invalid_union_discriminator:
      message = `Discriminador inválido. Esperado ${util.joinValues(issue.options)}`
      break
    case ZodIssueCode.invalid_enum_value:
      message = `Enum inválido. Esperado ${util.joinValues(issue.options)}, recebido '${
        issue.received
      }'`
      break
    case ZodIssueCode.invalid_arguments:
      message = 'Argumentos inválidos'
      break
    case ZodIssueCode.invalid_return_type:
      message = 'Retorno de tipo inválido'
      break
    case ZodIssueCode.invalid_date:
      message = 'Data inválida'
      break
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === 'object') {
        if ('startsWith' in issue.validation) {
          message = `Deve iniciar com "${issue.validation.startsWith}"`
        } else if ('endsWith' in issue.validation) {
          message = `Deve terminar com "${issue.validation.endsWith}"`
        } else {
          util.assertNever(issue.validation as never)
        }
      } else if (issue.validation !== 'regex') {
        message = `${capitalized(issue.validation)} inválido`
      } else {
        message = 'Inválido'
      }
      break
    case ZodIssueCode.too_small:
      if (issue.type === 'array') {
        message = `Deve conter ${
          issue.exact ? '' : issue.inclusive ? 'ao menos' : 'mais que'
        } ${issue.minimum} elemento${issue.minimum !== 1 ? 's' : ''}`
      } else if (issue.type === 'string') {
        message = `Deve conter ${
          issue.exact ? '' : issue.inclusive ? 'ao menos' : 'mais que'
        } ${issue.minimum} caracter${issue.minimum !== 1 ? 'es' : ''}`
      } else if (issue.type === 'number') {
        message = `Deve ser ${
          issue.exact ? 'igual a ' : issue.inclusive ? 'maior ou igual a ' : 'maior que '
        }${issue.minimum}`
      } else if (issue.type === 'date') {
        message = `Deve ser ${
          issue.exact ? 'igual a ' : issue.inclusive ? 'maior ou igual a ' : 'maior que '
        }${new Date(issue.minimum as never)}`
      } else {
        message = 'Inválido'
      }
      break
    case ZodIssueCode.too_big:
      if (issue.type === 'array') {
        message = `Deve conter ${
          issue.exact ? '' : issue.inclusive ? 'até' : 'menos que'
        } ${issue.maximum} element${issue.maximum !== 1 ? 's' : ''}`
      } else if (issue.type === 'string') {
        message = `Deve conter ${
          issue.exact ? '' : issue.inclusive ? 'até' : 'menos que'
        } ${issue.maximum} caracter${issue.maximum !== 1 ? 'es' : ''}`
      } else if (issue.type === 'number') {
        message = `Deve ser ${
          issue.exact ? '' : issue.inclusive ? 'menor ou igual a' : 'menor que'
        } ${issue.maximum}`
      } else if (issue.type === 'date') {
        message = `Deve ser ${
          issue.exact ? '' : issue.inclusive ? 'menor ou igual a' : 'menor que'
        } ${new Date(issue.maximum as never)}`
      } else {
        message = 'Inválido'
      }
      break
    case ZodIssueCode.custom:
      message = 'Inválido'
      if (issue.params) {
        const issueType = issue.params[0].type
        if (issueType === 'invalid_password_confirmation_match') {
          message = 'Senha e confirmação não coincidem'
        }
        if (issueType === 'required_current_password') {
          message = 'Necessário para alterar senha e/ou e-mail'
        }
      }
      break
    case ZodIssueCode.invalid_intersection_types:
      message = 'Não foi possível agrupar os resultados da interseção'
      break
    case ZodIssueCode.not_multiple_of:
      message = `Deve ser um múltiplo de ${issue.multipleOf}`
      break
    case ZodIssueCode.not_finite:
      message = 'Deve ser finito'
      break
    default:
      message = _ctx.defaultError
      util.assertNever(issue)
  }
  return { message }
}
