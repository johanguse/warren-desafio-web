interface IResponseData<T> {
  code: number;
  count: number;
  data: T[];
  offset: number;
  status: string;
  total: number;
}
export default IResponseData;
