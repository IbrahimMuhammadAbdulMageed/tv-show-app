import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Nav, Navbar } from 'react-bootstrap';
import HRef from '../utilities/HRef';
import Link from 'next/link';
import ActiveLink from './ActiveLink';
import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { v4 as uuid4 } from 'uuid';
import { includes } from 'lodash';
import Breakpoints from '../utilities/Breakpoints';
import breakpoints from '../utilities/Breakpoints';
interface IHeaderStyle {
    navbarIsOpen: boolean;
}
const HeaderStyle = styled.header<IHeaderStyle>`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    ${(props) =>
        props.navbarIsOpen
            ? `
      background: linear-gradient(
        90.53deg,
        rgba(0, 0, 0, 1) 0.45%,
        rgba(102, 80, 165, 1) 105.51%
    );
  
  `
            : `

       background: linear-gradient(
        90.53deg,
        rgba(0, 0, 0, 0.75) 0.45%,
        rgba(102, 80, 165, 0.75) 105.51%
    );
  `}

    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
    .navbar-brand {
        font-family: 'Griffy';
        font-style: normal;
        font-weight: 400;
        font-size: 36px;
        line-height: 49px;
        color: #ffc907;
        &:hover {
            color: #ffc907;
        }
    }

    .nav-link {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        text-transform: uppercase;
        color: #a1b1cb !important;
        transition: color 0.25s;
        &.active,
        &:hover {
            color: #ffffff !important;
        }
        &.active {
            position: relative;
            &:after {
                content: '';
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: #38bbd8;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                border-radius: 50%;
                @media (max-width: ${breakpoints.LG}) {
                    position: relative;
                    left: unset;
                    bottom: unset;
                    right: -15px;
                    display: inline-block;
                }
            }
        }
    }
    form {
        position: relative;
        margin-right: 20px;
        @media (max-width: ${breakpoints.LG}) {
            width: 100%;
            input {
                width: 100%;
            }
        }
        svg {
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
        }
    }

    .avatar {
        border: 2px solid #ffffff;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        position: relative;
        flex-shrink: 0;
        &:after {
            position: absolute;
            content: '';
            background-color: #3b567d;
            border: 2px solid #ffffff;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            bottom: 0;
            right: 0;
        }
    }
    h1 {
        margin-bottom: 0;
    }
    .navbar-toggler {
        border-color: transparent;
        color: transparent;
        .bar {
            display: block;
            width: 30px;
            height: 2px;
            background-color: #ffc907;
            margin-bottom: 10px;
            transform-origin: left;
            transition: transform 0.5s;
            &:last-of-type {
                margin-bottom: 0;
            }
        }

        &:not(.collapsed) {
            .bar {
                &.bar1 {
                    transform: rotate(45deg) translateX(2px);
                    @media (max-width: $sm) {
                        transform: rotate(45deg) translate(0, -5px);
                    }
                }

                &.bar2 {
                    opacity: 0;
                }

                &.bar3 {
                    transform: rotate(-45deg) translateX(2px);
                    @media (max-width: $sm) {
                        transform: rotate(-45deg) translate(0, 5px);
                    }
                }
            }
        }
    }
`;
const Header: React.FC = () => {
    const router = useRouter();
    const [navbarIsOpen, setNavbarIsOpen] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();
    const handleSearch = (data: FieldValues) => {
        router.push('/search/' + data.search);
    };
    return (
        <HeaderStyle navbarIsOpen={navbarIsOpen}>
            <Navbar expand="lg">
                <Container fluid>
                    <h1>
                        <Link href={HRef.home}>
                            <Navbar.Brand as="a">DRAMATIC</Navbar.Brand>
                        </Link>
                    </h1>
                    <Navbar.Toggle
                        onClick={(event) => {
                            if (
                                includes(
                                    event.currentTarget.className,
                                    'collapsed',
                                )
                            ) {
                                setNavbarIsOpen(true);
                            } else {
                                setNavbarIsOpen(false);
                            }
                        }}
                    >
                        {[...Array(3)].map((x, i) => (
                            <span
                                key={uuid4()}
                                className={'bar ' + 'bar' + (i + 1)}
                            ></span>
                        ))}
                    </Navbar.Toggle>
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <ActiveLink href={HRef.home} text={'Home'} />
                            <ActiveLink
                                href={HRef.favourite}
                                text={'Favourite'}
                            />
                        </Nav>

                        <div className="d-flex align-items-center">
                            <form onSubmit={handleSubmit(handleSearch)}>
                                <input
                                    {...register('search')}
                                    type={'text'}
                                    placeholder={'Search'}
                                />
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.625 16.625C13.491 16.625 16.625 13.491 16.625 9.625C16.625 5.75901 13.491 2.625 9.625 2.625C5.75901 2.625 2.625 5.75901 2.625 9.625C2.625 13.491 5.75901 16.625 9.625 16.625Z"
                                        stroke="white"
                                        strokeWidth="2.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M18.375 18.375L14.5687 14.5688"
                                        stroke="white"
                                        strokeWidth="2.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </form>
                            <div
                                className="avatar cover"
                                style={{
                                    backgroundImage:
                                        'url("/images/avatar.jpg")',
                                }}
                            ></div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </HeaderStyle>
    );
};
export default Header;
