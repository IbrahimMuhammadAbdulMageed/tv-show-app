import { showApi } from './showApi';
import { IShow } from '../../models/IShow';

const getAllShowApi = showApi.injectEndpoints({
    endpoints: (build) => ({
        getAllShow: build.query<IShow[], void>({
            query: () => 'shows',
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllShowQuery } = getAllShowApi;
