import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { v4 as uuid4 } from 'uuid';
import ShowCard from './ShowCard';
import { IShow } from '../models/IShow';
import styled from 'styled-components';
import Loader from './Loader';
import Message from './Message';
import { isEmpty } from 'lodash';

const MovieSliderStyle = styled.div`
    .swiper {
        padding-top: 20px;
    }
`;
interface IProps {
    showList: IShow[];
}
const MovieSlider: React.FC<IProps> = (props) => {
    const { showList } = props;
    return (
        <MovieSliderStyle>
            <Swiper
                slidesPerView={1.5}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                spaceBetween={40}
                breakpoints={{
                    576: {
                        slidesPerView: 2.5,
                    },
                    768: {
                        slidesPerView: 3.5,
                    },
                    992: {
                        slidesPerView: 4.5,
                    },
                    1200: {
                        slidesPerView: 5.5,
                    },
                    1400: {
                        slidesPerView: 6.5,
                    },
                }}
                modules={[Autoplay]}
            >
                {isEmpty(showList) && <Message message={'No data was found'} />}
                {showList.map((item) => (
                    <SwiperSlide key={uuid4()}>
                        <ShowCard show={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </MovieSliderStyle>
    );
};

export default MovieSlider;
