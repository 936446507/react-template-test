import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getHomeDataRequest,
  setIsGettingHomeData,
} from '../../store/action/home';

import { StoreState } from '../../store/type';

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
    <div>
      <p>home</p>
      <p>count: {home.count}</p>
      <button onClick={() => setIsGettingHomeState(true)}>+ 1</button>
    </div>
  );
}

export default Index;
