import { matrixApiRaw } from "./matrixApiRaw";
export * from "./matrixApiRaw";

export const matrixApi = matrixApiRaw.enhanceEndpoints({
  addTagTypes: ["Matrix"],
  endpoints: {
    getIndex: {
      providesTags: [{ type: "Matrix", id: "LIST" }],
    },
    postMatrix: {
      invalidatesTags: [{type:"Matrix", id: 'LIST' }],
    },
    deleteMatrixById: {
      invalidatesTags: [{type:"Matrix", id: 'LIST' }],
    },
    getMatrixById: {
      providesTags: (_result, _error, arg) => [{ type: "Matrix", id: arg.id }],
    },
    putMatrixById: {
      invalidatesTags: (_result, _error, arg) => [
        { type: "Matrix", id: arg.id },
        { type: "Matrix", id: "LIST" },
      ],
    },
  },
});
