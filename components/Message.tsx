import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const MessageStyle = styled.div`
    margin-top: 200px;
    .container {
        display: flex;
        justify-content: center;
    }
    .message,
    .messageError {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        margin-bottom: 0;
    }
    .message {
        color: #ffc907;
    }
    .messageError {
        color: red;
    }
`;
interface IProps {
    message?: string;
    messageError?: any;
}
const Message: React.FC<IProps> = (props) => {
    const { message, messageError } = props;
    return (
        <MessageStyle>
            <Container>
                {message && <p className={'message'}>{message}</p>}
                {messageError && (
                    <p className={'messageError'}>
                        {messageError.error.toString()}
                    </p>
                )}
            </Container>
        </MessageStyle>
    );
};
export default Message;
