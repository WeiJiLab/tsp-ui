import { useState } from 'react'

interface UsePagination {
  currentPage: number
  pageSize: number
  handleChangePagination: (page: number, pageSize: number) => void
  resetPagination: () => void
}

export const DEFAULT_PAGE = 0
export const DEFAULT_PAGE_SIZE = 10

export const usePagination = (): UsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE)
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE)

  const handleChangePagination = (page: number, pageSize: number): void => {
    setCurrentPage(page - 1)
    setPageSize(pageSize)
  }

  const resetPagination = (): void => {
    setCurrentPage(DEFAULT_PAGE)
  }

  return { currentPage, pageSize, handleChangePagination, resetPagination }
}
