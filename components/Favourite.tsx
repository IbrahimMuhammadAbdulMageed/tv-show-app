import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IShow } from '../models/IShow';
import { useGetAllShowQuery } from '../store/show/getAllShow';
import { includes, isEmpty } from 'lodash';
import { Col, Container, Row } from 'react-bootstrap';
import { v4 as uuid4 } from 'uuid';
import ShowCard from './ShowCard';
import Message from './Message';
import Loader from './Loader';

const FavouriteStyle = styled.section`
    margin-top: 100px;
    h2 {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        text-transform: uppercase;
        color: #ffffff;
        margin-bottom: 20px;
    }

    .row {
        margin-top: -24px;
        & > div {
            margin-top: 24px;
        }
    }
`;

const Favourite: React.FC = () => {
    const allShow = useGetAllShowQuery();
    const [showFavourite, setShowFavourite] = useState<IShow[]>([]);
    const [isProcess, setIsProcess] = useState<boolean>(false);
    useEffect(() => {
        if (!isEmpty(allShow.data) && allShow.data != undefined) {
            setIsProcess(true);
            let favoriteList: string[] = [];
            if (localStorage.favoriteList != undefined) {
                favoriteList = JSON.parse(localStorage.favoriteList);
            }
            setShowFavourite(
                allShow.data.filter((item) =>
                    includes(favoriteList, item.id.toString()),
                ),
            );
            setIsProcess(false);
        }
    }, [allShow.data]);
    return (
        <FavouriteStyle>
            <Container>
                <h2>my favourites</h2>
                <Row>
                    {allShow.isLoading && <Loader />}
                    {allShow.isError && (
                        <Message messageError={allShow.error} />
                    )}
                    {isEmpty(showFavourite) &&
                        !allShow.isError &&
                        !isProcess && (
                            <Message
                                message={'You do not have any favourite show'}
                            />
                        )}

                    {!isEmpty(showFavourite) &&
                        showFavourite.map((item) => (
                            <Col
                                key={uuid4()}
                                xxl={2}
                                xl={3}
                                lg={4}
                                md={6}
                                sm={12}
                            >
                                <ShowCard show={item} />
                            </Col>
                        ))}
                </Row>
            </Container>
        </FavouriteStyle>
    );
};
export default Favourite;
