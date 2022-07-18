import { NextPage } from 'next';
import MainLayout from '../../../components/MainLayout';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetShowQuery } from '../../../store/show/getShow';
import { includes, isEmpty } from 'lodash';
import Show from '../../../components/Show';
import ShowInfo from '../../../components/ShowInfo';
import Loader from '../../../components/Loader';
import MoreLikeThis from '../../../components/MoreLikeThis';
import Message from '../../../components/Message';

const ShowPage: NextPage = () => {
    const router = useRouter();
    let { id } = router.query;
    const show = useGetShowQuery(id?.toString() || '');

    useEffect(() => {
        if (id != undefined) {
            let showList: string[] = [];
            if (localStorage.showList != undefined) {
                showList = JSON.parse(localStorage.showList);
            }
            if (!includes(showList, id.toString())) {
                showList.push(id.toString());
                localStorage.showList = JSON.stringify(showList);
            }
        }
    }, [id]);
    return (
        <MainLayout title={'Dramatic | Show'}>
            {show.isLoading && <Loader />}
            {show.isError && <Message messageError={show.error} />}
            {!isEmpty(show.data) && show.data != undefined ? (
                <>
                    <Show show={show.data} />
                    <ShowInfo show={show.data} />
                    <MoreLikeThis genres={show.data.genres} />
                </>
            ) : (
                <Loader />
            )}
        </MainLayout>
    );
};

export default ShowPage;
