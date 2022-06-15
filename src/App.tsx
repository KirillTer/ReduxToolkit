import React, { useEffect } from 'react';
import './App.css';
import { fetchUsers } from './store/reducers/ActionCreators';
import { useAppDispatch, useAppSelector } from './hooks/redux'
import PostContainer from "./components/PostContainer";
import PostContainerOld from "./components/PostContainerOld";

function App() {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector(state => state.userReducer);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="App">
      {/* {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <h3>{JSON.stringify(users, null, 2)}</h3> */}
      <div style={{ display: 'flex' }}>
        <PostContainer />
        {/* <PostContainerOld /> */}
      </div>
    </div>
  );
}

export default App;
