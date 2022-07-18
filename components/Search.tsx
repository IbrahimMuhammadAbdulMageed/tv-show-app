import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IShow } from '../models/IShow';
import { useGetAllShowQuery } from '../store/show/getAllShow';
import { includes, intersection, isEmpty } from 'lodash';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import { v4 as uuid4 } from 'uuid';
import ShowCard from './ShowCard';
import { useRouter } from 'next/router';
import Loader from './Loader';
import Message from './Message';

const SearchStyle = styled.section`
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

const Search: React.FC = () => {
    const router = useRouter();
    let { query } = router.query;
    const allShow = useGetAllShowQuery();
    const [searchResult, setSearchResult] = useState<IShow[]>([]);
    const [isProcess, setIsProcess] = useState<boolean>(false);

    useEffect(() => {
        if (!isEmpty(allShow.data) && allShow.data != undefined) {
            setIsProcess(true);
            setSearchResult(
                allShow.data.filter((item) =>
                    item.name
                        .toLowerCase()
                        .includes(query?.toString().toLowerCase() || ''),
                ),
            );
            setIsProcess(false);
        }
    }, [allShow.data, query]);

    return (
        <SearchStyle>
            <Container>
                <h2>Search result</h2>
                <Row>
                    {allShow.isLoading && <Loader />}
                    {allShow.isError && (
                        <Message messageError={allShow.error} />
                    )}
                    {isEmpty(searchResult) &&
                        !allShow.isError &&
                        !isProcess && <Message message={'No data was found'} />}
                    {!isEmpty(searchResult) &&
                        searchResult.map((item) => (
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
        </SearchStyle>
    );
};
export default Search;
