import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useKonami from 'use-konami';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import { Modal, Button } from 'react-bootstrap';
import Leaderboard from '../components/Leaderboard';
import { useInterval } from '../hooks/useInterval.js';
import { baseDataUrl } from '../global';

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Video } from '@splidejs/splide-extension-video';
import '@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css';
import { cleanup } from '@testing-library/react';

const Index = () => {
  useKonami({
    onUnlock: () => setShow(true),
    sequence: ['g', '0', 'a', 'l', 'z'],
  });

  const [show, setShow] = useState(false);

  const handleClose = (index) => {
    setShow(false);
  };

  const handleLocationChange = (location) => {
    dispatch({ type: 'SET_CURRENT_LOCATION', payload: location });
  };
  const handleCourseChange = (location) => {
    dispatch({ type: 'SET_CURRENT_COURSE', payload: location });
  };
  const handleOrientationChange = (index) => {
    dispatch({ type: 'SET_ORIENTIATION', payload: index });
  };

  const handleShow = () => {
    setShow(true);
  };

  const dispatch = React.useContext(GlobalDispatchContext);

  const state = React.useContext(GlobalStateContext);

  const navigate = useNavigate();

  const handleInputChange = (value) => {
    dispatch({ type: 'CHANGE_PDQ', payload: value });
    window.electron.store.set('PDQ', value);
  };

  const getAds = () => {
    fetch(`${baseDataUrl}`, {
      headers: {
        'content-type': 'text/json',
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.leaderboard != null) {
          dispatch({
            type: 'SET_LEADERBOARD',
            payload: responseJson.leaderboard,
          });
        }
        if (responseJson.ads != null) {
          dispatch({ type: 'SET_ADS', payload: responseJson.ads });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAds();
  }, []);

  useInterval(() => {
    getAds();
  }, 60000);

  const renderAds = () => {
    if (state.ads != null) {
      var slides = state.ads.map((value) => {
        if (value.type == 'image') {
          return (
            <>
              <SplideSlide data-splide-interval={value.duration * 1000}>
                <img src={value.url} />
              </SplideSlide>
              <SplideSlide data-splide-interval={value.duration * 1000}>
                <Leaderboard type="week" />
              </SplideSlide>
            </>
          );
        } else {
          return (
            <>
              <SplideSlide
                data-splide-html-video={value.url}
                data-splide-interval={value.duration * 1000}
              ></SplideSlide>
              <SplideSlide data-splide-interval={value.duration * 1000}>
                <Leaderboard type="month" />
              </SplideSlide>
            </>
          );
        }
      });

      return slides;
    }
  };
  return (
    <div>
      <Splide
        hasTrack={false}
        extensions={{ Video }}
        options={{
          rewind: true,
          type: 'fade',
          autoplay: true,
          resetProgress: false,
          pauseOnHover: false,
          video: { autoplay: true, mute: true, loop: false },
        }}
      >
        <SplideTrack>
          <SplideSlide data-splide-interval={5000}>
            <Leaderboard type="today" />
          </SplideSlide>
          {renderAds()}
          <SplideSlide data-splide-interval={5000}>
            <Leaderboard type="today" />
          </SplideSlide>
        </SplideTrack>

        <div className="splide__progress">
          <div className="splide__progress__bar" />
        </div>
      </Splide>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label>Location:</label>
              <br></br>
              <select
                value={state.location}
                onChange={(e) => handleLocationChange(e.target.value)}
              >
                {state.clubs.map((club, index) => (
                  <option key={club.id} value={index}>
                    {club.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label>Course:</label>
              <br></br>
              <select
                value={state.course}
                onChange={(e) => handleCourseChange(e.target.value)}
              >
                {state.clubs != null &&
                  state.clubs[state.location].courses.map((location, index) => (
                    <option key={location.id} value={index}>
                      {location.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-6">
              <label>Portrait</label>
              <br></br>
              <select
                value={state.portrait}
                onChange={(e) => handleOrientationChange(e.target.value)}
              >
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
              </select>
            </div>
          </div>
          <div className="row">
            <p>Version: 1</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Index;
