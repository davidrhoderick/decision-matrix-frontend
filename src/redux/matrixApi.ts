import { default as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getIndex: build.query<GetIndexApiResponse, GetIndexApiArg>({
      query: () => ({ url: `/` }),
    }),
    postMatrix: build.mutation<PostMatrixApiResponse, PostMatrixApiArg>({
      query: () => ({ url: `/matrix`, method: "POST" }),
    }),
    getMatrixById: build.query<GetMatrixByIdApiResponse, GetMatrixByIdApiArg>({
      query: (queryArg) => ({ url: `/matrix/${queryArg.id}` }),
    }),
    putMatrixById: build.mutation<
      PutMatrixByIdApiResponse,
      PutMatrixByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/matrix/${queryArg.id}`,
        method: "PUT",
        body: queryArg.matrix,
      }),
    }),
    deleteMatrixById: build.mutation<
      DeleteMatrixByIdApiResponse,
      DeleteMatrixByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/matrix/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as matrixApi };
export type GetIndexApiResponse = /** status 200 undefined */ Matrices;
export type GetIndexApiArg = void;
export type PostMatrixApiResponse = /** status 200 undefined */ Matrix;
export type PostMatrixApiArg = void;
export type GetMatrixByIdApiResponse = /** status 200 undefined */ Matrix;
export type GetMatrixByIdApiArg = {
  id: string;
};
export type PutMatrixByIdApiResponse = /** status 200 undefined */ Matrix;
export type PutMatrixByIdApiArg = {
  id: string;
  matrix: Matrix;
};
export type DeleteMatrixByIdApiResponse = /** status 200 undefined */ {
  id: string;
};
export type DeleteMatrixByIdApiArg = {
  id: string;
};
export type Matrices = {
  id: string;
  name: string;
}[];
export type Matrix = {
  id: string;
  name: string;
  choices: {
    list: string[];
  };
  factors: {
    list: string[];
  };
  factorsChoices: {
    matrix: number[][];
  };
  userId: string;
};
export const {
  useGetIndexQuery,
  useLazyGetIndexQuery,
  usePostMatrixMutation,
  useGetMatrixByIdQuery,
  useLazyGetMatrixByIdQuery,
  usePutMatrixByIdMutation,
  useDeleteMatrixByIdMutation,
} = injectedRtkApi;
