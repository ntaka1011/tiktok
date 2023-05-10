// layouts
import { HeaderOnly } from '~/layout';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import config from '~/config';

// ko cần dằng nhập vẫn xem đc
// neues mặc định mình không chỉ định layout thì nó defaultLayout
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: null },
];

//đăng nhập mới xem đc
const privateRoutes = [];

export { privateRoutes, publicRoutes };
