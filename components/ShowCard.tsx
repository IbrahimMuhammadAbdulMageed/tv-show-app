import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IShow } from '../models/IShow';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { includes } from 'lodash';
import { motion } from 'framer-motion';
import TextTruncate from 'react-text-truncate';

const ShowCardStyle = styled.div`
    .image {
        display: block;
        height: 250px;
        box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.36);
        border-radius: 7px;
        margin-bottom: 10px;
        position: relative;
        overflow: hidden;
    }
    .info {
        position: relative;
        z-index: 1;
        padding: 10px;
        h3 {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
            color: #ffffff;
            margin-bottom: 5px;
            transition: color 0.5s;
        }
        .year {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 700;
            font-size: 11px;
            line-height: 13px;
            color: #afafaf;
            margin-bottom: 5px;
        }
        .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .imdb {
                line-height: 0;
                img {
                    margin-right: 5px;
                    width: 28px;
                    height: 14px;
                }
                span {
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 11px;
                    line-height: 13px;
                    color: #ffc907;
                }
            }
            .actions {
                display: flex;
                align-items: center;
                svg {
                    margin-right: 5px;
                }
                button {
                    background-color: transparent;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
    &:hover {
        .info {
            h3 {
                color: #ffc907;
            }
        }
    }
`;

interface IProps {
    show: IShow;
}
const ShowCard: React.FC<IProps> = (props) => {
    const { show } = props;
    const [isSeen, setIsSeen] = useState<boolean>(false);
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    useEffect(() => {
        let showList: string[] = [];
        if (localStorage.showList != undefined) {
            showList = JSON.parse(localStorage.showList);
            if (includes(showList, show.id.toString())) {
                setIsSeen(true);
            }
        }
        let favoriteList: string[] = [];
        if (localStorage.favoriteList != undefined) {
            favoriteList = JSON.parse(localStorage.favoriteList);
            if (includes(favoriteList, show.id.toString())) {
                setIsFavourite(true);
            }
        }
    }, []);
    const handleFavourite = () => {
        let favoriteList: string[] = [];
        if (localStorage.favoriteList != undefined) {
            favoriteList = JSON.parse(localStorage.favoriteList);
        }
        if (isFavourite) {
            localStorage.favoriteList = JSON.stringify(
                favoriteList.filter((item) => item != show.id.toString()),
            );
            setIsFavourite(false);
        } else {
            favoriteList.push(show.id.toString());
            localStorage.favoriteList = JSON.stringify(favoriteList);
            setIsFavourite(true);
        }
    };
    return (
        <ShowCardStyle>
            <motion.div
                whileHover={{
                    y: -5,
                    boxShadow: 'rgba(255, 255, 255, 0.24) 0px 3px 8px',
                    transition: {
                        duration: 0.25,
                    },
                }}
                style={{ borderRadius: '7px' }}
            >
                <Link href={'/show/' + show.id}>
                    <a className={'image'}>
                        <Image
                            src={show.image.medium}
                            layout={'fill'}
                            objectFit={'cover'}
                        />
                    </a>
                </Link>
                <div className="info">
                    <Link href={'/show/' + show.id}>
                        <a>
                            <TextTruncate
                                line={1}
                                element={'h3'}
                                truncateText="…"
                                text={show.name}
                                textElement={'h3'}
                            />
                        </a>
                    </Link>
                    <div className={'year'}>
                        {moment(show.premiered, 'YYYY-MM-DD').year()}
                    </div>
                    <div className={'bottom'}>
                        <div className="imdb">
                            <img src="/images/imdb.png" alt="imdb" />
                            <span>{show.rating.average}</span>
                        </div>
                        <div className="actions">
                            <svg
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.708344 7.99999C0.708344 7.99999 3.54168 2.66666 8.50001 2.66666C13.4583 2.66666 16.2917 7.99999 16.2917 7.99999C16.2917 7.99999 13.4583 13.3333 8.50001 13.3333C3.54168 13.3333 0.708344 7.99999 0.708344 7.99999Z"
                                    stroke={isSeen ? '#ffc907' : 'white'}
                                    strokeWidth="0.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.5 10C9.6736 10 10.625 9.10457 10.625 8C10.625 6.89543 9.6736 6 8.5 6C7.32639 6 6.375 6.89543 6.375 8C6.375 9.10457 7.32639 10 8.5 10Z"
                                    stroke={isSeen ? '#ffc907' : 'white'}
                                    strokeWidth="0.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <button
                                onClick={() => {
                                    handleFavourite();
                                }}
                            >
                                <img
                                    src={
                                        isFavourite
                                            ? '/images/heart-red.png'
                                            : '/images/heart-white.png'
                                    }
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </ShowCardStyle>
    );
};
export default ShowCard;
