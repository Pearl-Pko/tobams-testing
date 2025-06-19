interface PaginatedResponse<T> {
    data: T[],
    message: string,
    pagination: {
        totalProducts: number,
        currentPage: number,
        pageSize: number,
        totalPages: number
    }
}