import { matrixApiRaw } from "./matrixApiRaw";
export * from "./matrixApiRaw";

export const matrixApi = matrixApiRaw.enhanceEndpoints({
  endpoints: {
    postMatrix: {
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          const { data: newMatrix } = await queryFulfilled;

          dispatch(
            matrixApi.util.updateQueryData(
              "getIndex",
              undefined,
              (draftMatrices) => {
                draftMatrices.push(newMatrix);
              }
            )
          );
        } catch (error) {
          console.error(error);
        }
      },
    },
    deleteMatrixById: {
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          dispatch(
            matrixApi.util.updateQueryData(
              "getIndex",
              undefined,
              (draftMatrices) =>
                draftMatrices.filter((matrix) => id !== matrix.id)
            )
          );

          dispatch(
            matrixApi.util.updateQueryData(
              "getMatrixById",
              { id },
              () => undefined
            )
          );
        } catch (error) {
          console.error(error);
        }
      },
    },
    putMatrixById: {
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: updateResult,
          } = await queryFulfilled;

          dispatch(
            matrixApi.util.updateQueryData(
              "getIndex",
              undefined,
              (draftMatrices) =>
                draftMatrices.map((matrix) =>
                  matrix.id === id ? { name: updateResult.name, id: updateResult.id } : matrix
                )
            )
          );

          dispatch(
            matrixApi.util.updateQueryData(
              "getMatrixById",
              { id },
              () => updateResult
            )
          );
        } catch (error) {
          console.error(error);
        }
      },
    },
  },
});
