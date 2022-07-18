import { showApi } from './showApi';
import { ICast } from '../../models/ICast';

const getCastApi = showApi.injectEndpoints({
    endpoints: (build) => ({
        getCast: build.query<ICast[], string>({
            query: (id) => `shows/${id}/cast`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetCastQuery } = getCastApi;
