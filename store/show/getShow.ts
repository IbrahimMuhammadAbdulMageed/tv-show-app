import { showApi } from './showApi';
import { IShow } from '../../models/IShow';

const getShowApi = showApi.injectEndpoints({
    endpoints: (build) => ({
        getShow: build.query<IShow, string>({
            query: (id) => `shows/${id}`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetShowQuery } = getShowApi;
