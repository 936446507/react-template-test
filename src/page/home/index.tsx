import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getHomeDataRequest,
  setIsGettingHomeData,
} from 'src/store/action/home';

import { StoreState } from 'src/store/type';
import Nav from 'src/components/nav';

function Index() {
  const dispatch = useDispatch();
  const { isGettingHomeData, home } = useSelector(
    (state: StoreState) => state.home
  );
  const homeDataRef = useRef(home);

  const getHomeRequest = useCallback(() => {
    getHomeDataRequest(homeDataRef.current)(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const setIsGettingHomeState = useCallback(
    (state: boolean) => dispatch(setIsGettingHomeData(state)),
    [dispatch]
  );

  useEffect(() => {
    isGettingHomeData && getHomeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGettingHomeData]);
  useEffect(() => {
    homeDataRef.current = home;
  }, [home]);

  return (
    <div
      className='home'
      style={{
        textAlign: 'center',
      }}>
      <Nav />
      <div
        className='home__count'
        style={{
          marginTop: '20px',
        }}>
        <span>count: {home.count}</span>
        <button
          className='home__count--btn'
          style={{
            marginLeft: '20px',
            cursor: 'pointer',
          }}
          onClick={() => setIsGettingHomeState(true)}>
          + 1
        </button>
      </div>
    </div>
  );
}

export default Index;
