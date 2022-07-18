import React from 'react';
import styled from 'styled-components';
import { IShow } from '../models/IShow';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import { useGetCastQuery } from '../store/show/getCast';
import { isEmpty } from 'lodash';
import { v4 as uuid4 } from 'uuid';
import Loader from './Loader';
import Message from './Message';

const ShowInfoStyle = styled.section`
    margin-top: -100px;
    .content {
        background: rgba(11, 15, 22, 0.47);
        box-shadow: 8px -8px 10px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(15px);
        border-radius: 24px;
        padding: 20px 30px;
        h2 {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 22px;
            color: #ffffff;
            margin-bottom: 10px;
        }
        .trailer {
            position: relative;
            .image {
                position: relative;
                height: 170px;
                box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.36);
                border-radius: 7px;
                overflow: hidden;
            }
            .icon {
                width: 45px;
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: white;
                border-radius: 50%;
                position: absolute;
                bottom: 15px;
                right: 15px;
            }
        }
        .cast {
            .person {
                .image {
                    position: relative;
                    height: 145px;
                    border: 1px solid #ffffff;
                    border-radius: 9px;
                    overflow: hidden;
                    margin-bottom: 10px;
                }
                h3,
                p {
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-weight: 700;
                    margin-bottom: 0;
                }
                h3 {
                    font-size: 14px;
                    line-height: 17px;
                    color: #ffffff;
                }
                p {
                    font-size: 15px;
                    line-height: 18px;
                    color: #a9a9a9;
                }
            }
            .row {
                margin-top: -24px;
                & > div {
                    margin-top: 24px;
                }
            }
        }
    }
`;
interface IProps {
    show: IShow;
}
const ShowInfo: React.FC<IProps> = (props) => {
    const { show } = props;
    const cast = useGetCastQuery(show.id.toString());
    return (
        <ShowInfoStyle>
            <Container>
                <div className="content">
                    <Row>
                        <Col xl={3} lg={4} md={12}>
                            <div className={'trailer'}>
                                <h2>TRAILER</h2>
                                <div className="image">
                                    <Image
                                        src={show.image.medium}
                                        layout={'fill'}
                                    />
                                </div>
                                <div className="icon">
                                    <svg
                                        width="16"
                                        height="20"
                                        viewBox="0 0 16 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2 2L14 10L2 18V2Z"
                                            fill="#5436A9"
                                            stroke="#5436A9"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Col>
                        <Col xl={9} lg={8} md={12}>
                            <div className="cast">
                                <h2>CAST AND CREW INFO</h2>
                                <Row>
                                    {cast.isLoading && <Loader />}
                                    {cast.isError && (
                                        <Message messageError={cast.error} />
                                    )}
                                    {isEmpty(cast.data) && !cast.isError && (
                                        <Message
                                            message={'No data was found'}
                                        />
                                    )}
                                    {!isEmpty(cast.data) &&
                                        cast.data != undefined &&
                                        cast.data.map((item) => (
                                            <Col
                                                key={uuid4()}
                                                xl={2}
                                                lg={3}
                                                md={4}
                                                sm={6}
                                                xs={6}
                                            >
                                                <div className={'person'}>
                                                    <div className="image">
                                                        <Image
                                                            src={
                                                                item.person
                                                                    .image
                                                                    ? item
                                                                          .person
                                                                          .image
                                                                          .medium
                                                                    : '/images/no-image.png'
                                                            }
                                                            layout={'fill'}
                                                        />
                                                    </div>
                                                    <h3>{item.person.name}</h3>
                                                    <p>{item.character.name}</p>
                                                </div>
                                            </Col>
                                        ))}
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </ShowInfoStyle>
    );
};
export default ShowInfo;
