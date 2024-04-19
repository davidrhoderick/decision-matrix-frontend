import { matrixApiRaw } from "./matrixApiRaw";
export * from "./matrixApiRaw";

export const matrixApi = matrixApiRaw.enhanceEndpoints({
  addTagTypes: ["Matrix", "Matrices"],
  endpoints: {
    getIndex: {
      providesTags: ["Matrix"],
    },
    postMatrix: {
      invalidatesTags: ['Matrix']
    },
    deleteMatrixById: {
      invalidatesTags: ['Matrix']
    },
    getMatrixById: {
      providesTags: (_result, _error, arg) => [{ type: "Matrix", id: arg.id }],
    },
    putMatrixById: {
      invalidatesTags: (_result, _error, arg) => [
        { type: "Matrix", id: arg.id },
      ],
    },
  },
});
