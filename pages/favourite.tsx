import type { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import Favourite from '../components/Favourite';

const FavouritePage: NextPage = () => {
    return (
        <MainLayout title={'Dramatic | Favourite'}>
            <Favourite />
        </MainLayout>
    );
};

export default FavouritePage;
