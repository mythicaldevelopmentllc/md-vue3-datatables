export type PaginationData = {
  total: number,
  perPage: number,
  page: number,
  search: string,
  sort: string,
}

export type TableQuery = {
  page: number,
  search: string,
  perPage: number,
  sort: string,
}