import React from 'react';
import { isEmpty } from 'lodash';
import { Autoplay } from 'swiper';
import { v4 as uuid4 } from 'uuid';
import { useGetAllShowQuery } from '../store/show/getAllShow';
import { Swiper, SwiperSlide } from 'swiper/react';
import ShowSlide from './Show';
import Loader from './Loader';
import Message from './Message';
const HomeSlider: React.FC = () => {
    const allShow = useGetAllShowQuery();

    return (
        <section>
            {allShow.isLoading && <Loader />}
            {allShow.isError && <Message messageError={allShow.error} />}
            {isEmpty(allShow.data) && !allShow.isError && (
                <Message message={'No data was found'} />
            )}
            {!isEmpty(allShow.data) && allShow.data != undefined && (
                <Swiper
                    slidesPerView={1}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    modules={[Autoplay]}
                >
                    {allShow.data.map((item) => (
                        <SwiperSlide key={uuid4()}>
                            <ShowSlide show={item} isSlide={true} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
};
export default HomeSlider;
