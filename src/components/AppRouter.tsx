import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import PostContainer from "../pages/post/PostContainer";
// import PostContainerOld from "./components/PostContainerOld";
import UserContainer from "../pages/user/UserContainer";
import ErrorContainer from "../pages/error/ErrorContainer";

export enum RouteNames {
  HOME = '/',
  POSTS = '/posts',
  USERS = '/users',
  USERDETAILS = '/users/:id',
  ANYPATH = '*'
}

const router = createBrowserRouter([
  {
    path: RouteNames.HOME,
    element: <App />,
    errorElement: <ErrorContainer />,
    children: [
      {
        index: true,
        element: <PostContainer />
      },
      {
        path: RouteNames.POSTS,
        element: <PostContainer />
      },
      {
        path: RouteNames.USERS,
        element: <UserContainer />
      },
    ],
  }
]);
  
const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  );
}
 
export default AppRouter;