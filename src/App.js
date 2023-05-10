import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from './layout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((router, index) => {
            // nếu ko có layout setting thì nó lấy luôn DefaultLayout

            let Layout = DefaultLayout;

            if (router.layout) {
              Layout = router.layout;
            } else if (router.layout === null) {
              Layout = Fragment;
            }

            const Page = router.component;
            // nó luôn mong muốn ghi hoa
            // và </>
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  //layout nó đẫ ôm thằng children
                  // nếu có layout là gì đó để nó thoát khỏi layout
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
