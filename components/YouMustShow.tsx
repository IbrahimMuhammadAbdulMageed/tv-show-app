import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IShow } from '../models/IShow';
import MovieSlider from './MovieSlider';
import { useGetAllShowQuery } from '../store/show/getAllShow';
import { intersection, isEmpty, transform } from 'lodash';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import { v4 as uuid4 } from 'uuid';
import { useForm } from 'react-hook-form';
import Breakpoints from '../utilities/Breakpoints';
import Loader from './Loader';
import Message from './Message';

const YouMustShowStyle = styled.section`
    position: relative;
    margin-top: -200px;
    margin-bottom: 220px;
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
        .top-part {
            display: flex;
            align-items: center;
            justify-content: space-between;
            h3 {
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 700;
                font-size: 18px;
                line-height: 22px;
                color: #ffffff;
                margin-bottom: 0;
            }
            .dropdown {
                position: relative;
                z-index: 10;
                & > button {
                    background-color: #5c5c5c;
                    border-radius: 30px;
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 20px;
                    color: #ffffff;
                    border: none;
                    padding: 10px 30px;
                    &:focus {
                        box-shadow: none;
                    }
                }
                &.show {
                    & > button {
                        background-color: #5c5c5c;
                        border: none;
                        box-shadow: none !important;
                        &:focus {
                            box-shadow: none;
                        }
                    }
                }
                .dropdown-menu {
                    padding: 10px;
                    background-color: #5c5c5c;
                    min-width: 600px;
                    @media (max-width: ${Breakpoints.LG}) {
                        min-width: 350px;
                    }
                    @media (max-width: ${Breakpoints.SM}) {
                        min-width: 10rem;
                    }
                    .checkbox {
                        display: flex;
                        align-items: center;
                        input {
                            margin-right: 5px;
                        }
                        label {
                            font-family: 'Montserrat';
                            font-style: normal;
                            font-weight: 600;
                            font-size: 16px;
                            line-height: 20px;
                            color: white;
                        }
                    }
                }
            }
        }
    }
`;

export const allGenres = [
    'Drama',
    'Science-Fiction',
    'Thriller',
    'Action',
    'Crime',
    'Horror',
    'Romance',
    'Adventure',
    'Espionage',
    'Music',
    'Mystery',
    'Supernatural',
    'Fantasy',
    'Family',
    'Anime',
    'Comedy',
    'History',
    'Medical',
    'Legal',
    'Western',
    'War',
    'Sports',
];

export interface IGenres {
    genres: string;
    value: boolean;
}
const YouMustShow: React.FC = () => {
    const allShow = useGetAllShowQuery();
    const [showSlides, setShowSlides] = useState<IShow[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const { register, getValues } = useForm();
    const [isProcess, setIsProcess] = useState<boolean>(false);

    useEffect(() => {
        if (!isEmpty(allShow.data) && allShow.data != undefined) {
            setIsProcess(true);
            setShowSlides(allShow.data);
            setIsProcess(false);
        }
    }, [allShow.data]);
    useEffect(() => {
        if (!isEmpty(allShow.data) && allShow.data != undefined) {
            setIsProcess(true);
            if (!isEmpty(genres)) {
                setShowSlides(
                    allShow.data.filter(
                        (item) => intersection(item.genres, genres).length > 0,
                    ),
                );
            } else {
                setShowSlides(allShow.data);
            }
            setIsProcess(false);
        }
    }, [genres]);
    const handleSelectGenres = () => {
        setGenres([]);

        let arr = transform(
            getValues(),
            function (result: IGenres[], value, key) {
                result.push({ genres: key, value: value });
            },
            [],
        );
        arr.filter((item) => item.value).map((item) => {
            setGenres((prevState) => [...prevState, item.genres]);
        });
    };

    return (
        <YouMustShowStyle>
            <div className="content">
                <Container className={'mx-0 ps-0'}>
                    <div className="top-part">
                        <h3>MOVIES YOU MUST WATCH</h3>
                        <Dropdown>
                            <Dropdown.Toggle>FILTERS</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <form
                                    onChange={() => {
                                        handleSelectGenres();
                                    }}
                                >
                                    <Row>
                                        {allGenres.sort().map((item) => (
                                            <Col
                                                key={uuid4()}
                                                lg={4}
                                                md={6}
                                                sm={6}
                                            >
                                                <div className={'checkbox'}>
                                                    <input
                                                        {...register(item)}
                                                        type={'checkbox'}
                                                        id={item}
                                                    />
                                                    <label htmlFor={item}>
                                                        {item}
                                                    </label>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </form>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Container>
                {allShow.isLoading && <Loader />}
                {allShow.isError && <Message messageError={allShow.error} />}
                {isEmpty(showSlides) && !allShow.isError && !isProcess && (
                    <Message message={'No data was found'} />
                )}{' '}
                <MovieSlider showList={showSlides} />
            </div>
        </YouMustShowStyle>
    );
};
export default YouMustShow;
