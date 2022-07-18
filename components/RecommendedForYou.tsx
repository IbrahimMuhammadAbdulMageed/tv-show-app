import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IShow } from '../models/IShow';
import MovieSlider from './MovieSlider';
import { useGetAllShowQuery } from '../store/show/getAllShow';
import { includes, isEmpty, sampleSize } from 'lodash';
import Loader from './Loader';
import Message from './Message';

const RecommendedForYouStyle = styled.section`
    position: relative;
    margin-top: -200px;
    z-index: 2;
    padding-top: 30px;
    padding-bottom: 30px;
    @media (max-width: 576px) {
        padding-left: 12px;
    }
    @media (min-width: 576px) {
        padding-left: calc((100vw - 540px + 12px) / 2);
    }
    @media (min-width: 768px) {
        padding-left: calc((100vw - 720px + 12px) / 2);
    }
    @media (min-width: 992px) {
        padding-left: calc((100vw - 960px + 12px) / 2);
    }
    @media (min-width: 1200px) {
        padding-left: calc((100vw - 1140px + 12px) / 2);
    }
    @media (min-width: 1400px) {
        padding-left: calc((100vw - 1320px + 12px) / 2);
    }
    .content {
        position: relative;
        z-index: 1;
        background-color: rgba(11, 15, 22, 0.47);
        box-shadow: 8px -8px 10px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(25px);
        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;
        padding: 30px;
        h3 {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 22px;
            color: #ffffff;
        }

        .filter {
            margin-bottom: 20px;
            button {
                background-color: #5c5c5c;
                border-radius: 30px;
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 20px;
                color: #ffffff;
                padding: 10px 25px;
                text-align: center;
                margin-right: 20px;
                &:last-of-type {
                    margin-right: 0;
                }
                &.active {
                    background-color: #e43109;
                }
            }
        }
    }
`;
const RecommendedForYou: React.FC = () => {
    const allShow = useGetAllShowQuery();
    const [showSlides, setShowSlides] = useState<IShow[]>([]);
    const [languages, setLanguages] = useState<string[]>(['English']);
    const [isProcess, setIsProcess] = useState<boolean>(false);

    const filter = () => {
        if (!isEmpty(allShow.data) && allShow.data != undefined) {
            setIsProcess(true);
            if (!isEmpty(languages)) {
                let arr = sampleSize(
                    allShow.data.filter((item) =>
                        includes(languages, item.language),
                    ),
                    10,
                );
                setShowSlides(arr);
            } else {
                setShowSlides(allShow.data);
            }
            setIsProcess(false);
        }
    };
    useEffect(() => {
        filter();
    }, [allShow.data]);
    const handleSelectLanguage = (value: string) => {
        if (includes(languages, value)) {
            setLanguages(languages.filter((item) => item != value));
        } else {
            setLanguages((prevState) => [...prevState, value]);
        }
    };

    useEffect(() => {
        filter();
    }, [languages]);

    const filterButton = (value: string) => {
        return (
            <button
                className={includes(languages, value) ? 'active' : ''}
                onClick={() => {
                    handleSelectLanguage(value);
                }}
            >
                {value}
            </button>
        );
    };
    return (
        <RecommendedForYouStyle>
            <div className="content">
                <h3>RECOMMENDED FOR YOU</h3>
                <div className={'filter'}>
                    {filterButton('English')}
                    {filterButton('Japanese')}
                </div>
                {allShow.isLoading && <Loader />}
                {allShow.isError && <Message messageError={allShow.error} />}
                {isEmpty(showSlides) && !allShow.isError && !isProcess && (
                    <Message message={'No data was found'} />
                )}
                <MovieSlider showList={showSlides} />
            </div>
        </RecommendedForYouStyle>
    );
};
export default RecommendedForYou;
