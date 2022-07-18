import type { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import HomeSlider from '../components/HomeSlider';
import React from 'react';
import YouMustShow from '../components/YouMustShow';
import RecommendedForYou from '../components/RecommendedForYou';

const HomePage: NextPage = () => {
    return (
        <MainLayout title={'Dramatic | Home'}>
            <HomeSlider />
            <YouMustShow />
            <RecommendedForYou />
        </MainLayout>
    );
};

export default HomePage;
