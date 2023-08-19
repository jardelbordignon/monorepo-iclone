import { View, Text, StyleSheet } from 'react-native'
import { PaginationItem } from './item'

type Props = {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  buttonsDelta?: number
  onPageChange: (page: number) => void
}

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  buttonsDelta = 5,
  onPageChange,
}: Props) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - buttonsDelta, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + buttonsDelta, lastPage)
        )
      : []

  let to = registersPerPage * currentPage
  const from = to - registersPerPage + 1
  if (to > totalCountOfRegisters) to = totalCountOfRegisters

  return (
    <View>
      <Text style={s.info}>
        {from} - {to} de {totalCountOfRegisters}
      </Text>

      {lastPage >= 2 && (
        <View style={s.wrapper}>
          {currentPage > buttonsDelta + 1 && (
            <>
              <PaginationItem onPageChange={onPageChange} number={1} />
              {currentPage > buttonsDelta + 2 &&
                (buttonsDelta > 0 && currentPage === buttonsDelta + 3 ? (
                  <PaginationItem onPageChange={onPageChange} number={2} />
                ) : (
                  <Text style={s.ellipsis}>...</Text>
                ))}
            </>
          )}

          {!!previousPages.length &&
            previousPages.map(page => (
              <PaginationItem onPageChange={onPageChange} number={page} key={page} />
            ))}

          <PaginationItem
            onPageChange={onPageChange}
            number={currentPage}
            isCurrent
          />

          {!!nextPages.length &&
            nextPages.map(page => (
              <PaginationItem onPageChange={onPageChange} number={page} key={page} />
            ))}

          {currentPage + buttonsDelta < lastPage && (
            <>
              {currentPage + buttonsDelta + 1 < lastPage &&
                (buttonsDelta > 0 && currentPage + buttonsDelta + 2 === lastPage ? (
                  <PaginationItem onPageChange={onPageChange} number={lastPage - 1} />
                ) : (
                  <Text style={s.ellipsis}>...</Text>
                ))}
              <PaginationItem onPageChange={onPageChange} number={lastPage} />
            </>
          )}
        </View>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 4,
  },
  info: {
    color: '#fff',
  },
  ellipsis: {
    color: '#fff',
    fontSize: 20,
    marginHorizontal: 2,
  },
})
