import React from 'react';
import Link from 'next/link';
import { Container, Nav, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const LoaderStyle = styled.div`
    margin-top: 200px;
    .container {
        display: flex;
        justify-content: center;
    }
    .spinner-border {
        border-top-color: #ffc907;
        border-bottom-color: #ffc907;
        border-left-color: #ffc907;
        border-right-color: transparent;
    }
`;
interface IProps {}
const Loader: React.FC<IProps> = (props) => {
    return (
        <LoaderStyle>
            <Container>
                <Spinner
                    animation="border"
                    variant={'red'}
                    role="status"
                ></Spinner>
            </Container>
        </LoaderStyle>
    );
};
export default Loader;
