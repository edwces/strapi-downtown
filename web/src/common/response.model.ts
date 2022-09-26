interface BaseResponseMetadata {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface BaseResponse<T> {
  data: T[];
  meta: BaseResponseMetadata;
}
