import { createBrowserRouter } from 'react-router-dom';
import RouterRoot from './RouterRoot';
import Home from '../pages/Home/Home';
import WordsNew from '../pages/WordsNew/WordsNew';
import WordsMemorized from '../pages/WordsMemorized/WordsMemorized';
import WordsUnMemorized from '../pages/WordsUnMemorized/WordsUnMemorized';
import AppLayout from '../layouts/AppLayout/AppLayout';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <RouterRoot />,
    children: [
      {
        path: '',
        element: <AppLayout></AppLayout>,
        children: [
          {
            path: '',
            element: <Home></Home>,
          },
        ],
      },

      {
        path: 'words-new',
        element: <WordsNew></WordsNew>,
      },
      {
        path: 'words-memorized',
        element: <WordsMemorized></WordsMemorized>,
      },
      {
        path: 'words-unmemorized',
        element: <WordsUnMemorized></WordsUnMemorized>,
      },
    ],
  },
]);

export default routers;
