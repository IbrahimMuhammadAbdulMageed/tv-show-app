import React from 'react';
import styled from 'styled-components';
import { IShow } from '../models/IShow';
import { v4 as uuid4 } from 'uuid';
import { Col, Container, Row } from 'react-bootstrap';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const ShowStyle = styled.div`
    height: 900px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    position: relative;
    .overlay {
        background: linear-gradient(
            90deg,
            #000000 17.76%,
            rgba(0, 0, 0, 0.687449) 41.44%,
            rgba(196, 196, 196, 0) 100%
        );
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .row {
        position: relative;
        z-index: 1;

        .content {
            h2 {
                font-family: 'Griffy';
                font-style: normal;
                font-weight: 400;
                font-size: 36px;
                line-height: 49px;
                color: #ffc907;
                margin-bottom: 30px;
            }
            p {
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                color: #ffffff;
            }
            .genres {
                margin-bottom: 20px;
                h4,
                span {
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 18px;
                    line-height: 22px;
                }
                h4 {
                    color: #ff2e00;
                    margin-bottom: 0;
                }
                span {
                    color: white;
                }
            }
        }
        .actions {
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            & > * {
                border-radius: 30px;
                padding: 15px 25px;

                display: flex;
                align-items: center;
                border: none;
                cursor: default;
                margin-right: 20px;
                background-color: #5c5c5c;
                &:first-child {
                    background-color: #5436a9;
                }
                &:last-child {
                    margin-right: 0;
                }
                span,
                a {
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 20px;
                    line-height: 24px;
                    color: #ffffff;
                    display: block;
                    border-radius: 30px;
                    &:first-of-type {
                        margin-right: 15px;
                    }
                    &.addIcon {
                        font-size: 36px;
                    }
                }
                &.download {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    svg {
                        flex-shrink: 0;
                    }
                }
            }
            & > a {
                cursor: pointer;
                transition: transform 0.25s;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
        .info {
            display: flex;
            align-items: center;
            .imdb {
                display: flex;
                align-items: center;
                margin-right: 10px;
                img {
                    margin-right: 10px;
                }
                span {
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 24px;

                    color: #ffc907;
                }
            }
            .staticInfo {
                margin-right: 10px;
                span {
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 22px;
                    color: #ffffff;
                    border: 1px solid #ffffff;
                    border-radius: 5px;
                    padding: 0 5px;
                    &:first-of-type {
                        margin-right: 10px;
                    }
                }
            }
            .year {
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 700;
                font-size: 20px;
                line-height: 24px;
                color: #959595;
            }
        }
        .moreInfo {
            margin-top: 25px;
            h6,
            p {
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 20px;
            }
            h6 {
                color: #e43109;
                margin-bottom: 0;
            }
            p {
                color: white;
                margin-bottom: 0;
            }
            .audio {
                margin-bottom: 20px;
            }
        }
    }
`;
interface IProps {
    show: IShow;
    isSlide?: boolean;
}
const Show: React.FC<IProps> = (props) => {
    const { show, isSlide } = props;
    return (
        <ShowStyle>
            <Image
                src={show.image.original}
                layout={'fill'}
                objectFit={'cover'}
            />
            <div className="overlay"></div>
            <Container>
                <Row>
                    <Col lg={6} md={12}>
                        <div className={'content'}>
                            <h2>{show.name}</h2>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: show.summary,
                                }}
                            ></div>
                            <div className={'genres'}>
                                <h4>GENRES</h4>
                                {show.genres.map((item, index, array) => (
                                    <span key={uuid4()}>
                                        {index + 1 === array.length
                                            ? item
                                            : item + ', '}
                                    </span>
                                ))}
                            </div>
                            <div className="actions">
                                {isSlide ? (
                                    <Link href={'/show/' + show.id}>
                                        <a>
                                            <span>WATCH</span>
                                            <svg
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M2 2L14 8.6394L2 15.2788V2Z"
                                                    fill="white"
                                                    stroke="white"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </a>
                                    </Link>
                                ) : (
                                    <button>
                                        <span>WATCH</span>
                                        <svg
                                            width="16"
                                            height="17"
                                            viewBox="0 0 16 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M2 2L14 8.6394L2 15.2788V2Z"
                                                fill="white"
                                                stroke="white"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                )}

                                <button>
                                    <span>MY LIST</span>
                                    <span className={'addIcon'}>+</span>
                                </button>
                                {!isSlide && (
                                    <button className={'download'}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M7 10L12 15L17 10"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M12 15V3"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <div className="info">
                                <div className="imdb">
                                    <img src="/images/imdb.png" alt="imdb" />
                                    <span>{show.rating.average}</span>
                                </div>
                                <div className={'staticInfo'}>
                                    <span>
                                        {show.network != null &&
                                        show.network.country != null
                                            ? show.network.country.code
                                            : 'U/A'}
                                    </span>
                                    <span>4K</span>
                                </div>
                                <div className="year">
                                    {moment(
                                        show.premiered,
                                        'YYYY-MM-DD',
                                    ).year()}
                                </div>
                            </div>
                            {!isSlide && (
                                <div className="moreInfo">
                                    <div className="audio">
                                        <h6>AUDIO</h6>
                                        <p>
                                            English - Audio Description,English
                                            [Original]
                                        </p>
                                    </div>
                                    <div className="subtitle">
                                        <h6>SUBTITLES</h6>
                                        <p>English, Hindi</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </ShowStyle>
    );
};
export default Show;
