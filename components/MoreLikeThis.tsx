import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IShow } from '../models/IShow';
import { useGetAllShowQuery } from '../store/show/getAllShow';
import { intersection, isEmpty, sampleSize } from 'lodash';
import { Col, Container, Row } from 'react-bootstrap';
import { v4 as uuid4 } from 'uuid';
import Loader from './Loader';
import Message from './Message';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MoreLikeThisStyle = styled.section`
    margin-top: 30px;
    h3 {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #ffffff;
        margin-bottom: 20px;
    }
    .row {
        margin-top: -24px;
        & > div {
            margin-top: 24px;
        }
    }
    .card {
        position: relative;
        border-radius: 7px;
        overflow: hidden;
        background-color: transparent;
        border: none;
        & > a {
            display: block;
            height: 172px;
        }
    }
`;
interface IProps {
    genres: string[];
}
const MoreLikeThis: React.FC<IProps> = (props) => {
    const { genres } = props;
    const allShow = useGetAllShowQuery();
    const [showSlides, setShowSlides] = useState<IShow[]>([]);

    useEffect(() => {
        if (!isEmpty(allShow.data) && allShow.data != undefined) {
            setShowSlides(
                sampleSize(
                    allShow.data.filter(
                        (item) => intersection(item.genres, genres).length > 0,
                    ),
                    4,
                ),
            );
        }
    }, [allShow.data]);

    return (
        <MoreLikeThisStyle>
            <div className="content">
                <Container>
                    {allShow.isLoading && <Loader />}
                    {allShow.isError && (
                        <Message messageError={allShow.error} />
                    )}
                    {!isEmpty(showSlides) && !allShow.isError && (
                        <>
                            <h3>MORE LIKE THIS</h3>
                            <Row>
                                {showSlides.map((item) => (
                                    <Col
                                        key={uuid4()}
                                        xl={3}
                                        lg={4}
                                        md={6}
                                        sm={12}
                                    >
                                        <motion.div
                                            whileHover={{
                                                y: -5,
                                                boxShadow:
                                                    'rgba(255, 255, 255, 0.24) 0px 3px 8px',
                                                transition: {
                                                    duration: 0.25,
                                                },
                                            }}
                                            className={'card'}
                                        >
                                            <Link href={'/show/' + item.id}>
                                                <a className={'image'}>
                                                    <Image
                                                        src={item.image.medium}
                                                        layout={'fill'}
                                                        objectFit={'cover'}
                                                    />
                                                </a>
                                            </Link>
                                        </motion.div>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
                </Container>
            </div>
        </MoreLikeThisStyle>
    );
};
export default MoreLikeThis;
