import { NextPage } from 'next';
import MainLayout from '../../../components/MainLayout';
import React from 'react';
import Search from '../../../components/Search';

const SearchPage: NextPage = () => {
    return (
        <MainLayout title={'Dramatic | Search'}>
            <Search />
        </MainLayout>
    );
};

export default SearchPage;
