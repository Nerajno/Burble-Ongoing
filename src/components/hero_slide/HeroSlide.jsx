import React, { useEffect, useState, useRef} from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './hero-slide.scss';
import { useHistory } from 'react-router';
// import { Modal } from 'react-bootstrap';

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState([]);
  // console.log(movieItems);
  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {params});
        setMovieItems(response.results.slice(1, 4)); // gets the first 4 movies and is response.results.slice( 1,3) in the tutorial
        console.log(response);
      } catch (error) {
        console.log(error); // changed from 'error', this gives us
      }
    };
    getMovies();
  }, []);

  return (
    <div className='hero-slide'>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{delay: 4000}} delay is in milliseconds
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? 'active' : ''}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {
        movieItems.map((item,i) => <TrailerModal key={i} item={item}/>)
      }
    </div>
  );
};

const HeroSlideItem = props => {
  let history = useHistory();
  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
      const modal = document.querySelector(`#modal_${item.id}`);
      const videos = await tmdbApi.getVideos(category.movie, item.id);
      if(videos.results.length > 0) {
        const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
        // console.log(videSrc);
        modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
      }else{
        modal.querySelector('.modal__content').innerHTML = 'No Available Trailer';
      }
      modal.classList.toggle('active');
  }

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{backgroundImage: `url(${background})`}}
    >
      <div className='hero-slide__item__content container'>
        <div className='hero-slide__item__content__info'>
          <h2 className='title'>{item.title}</h2>
          <div className='overview'>{item.overview}</div>
          <div className='btns'>
                <Button onClick={() => history.push('/movie/' + item.id)}>
                    Watch Now
                </Button>
                <OutlineButton onClick={setModalActive}>
                    Watch Trailer
                </OutlineButton>
          </div>
        </div>
        <div className='hero-slide__item__content__poster'>
              <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = props => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src', '');

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe> 
      </ModalContent>
    </Modal>
  )
}

export default HeroSlide;