import React from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';

interface IProps {
    href: string;
    text: string;
}
const ActiveLink: React.FC<IProps> = (props) => {
    const { href, text } = props;
    const router = useRouter();
    return (
        <Link href={href}>
            <Nav.Link
                as="a"
                className={router.pathname === href ? 'active' : ''}
            >
                {text}
            </Nav.Link>
        </Link>
    );
};
export default ActiveLink;
