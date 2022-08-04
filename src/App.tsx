import { Box } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from './router';
import { navItems } from './shared/constants';
import DrawerAppBar from './shared/ui-material-components/nav/nav.components';

function App() {
  return (
    <BrowserRouter>
    <DrawerAppBar navItems={navItems} />
     <Box sx={{ width: '100vw', padding: '5rem 2rem 0 2rem' }}>
      <Routes>
        {
          routes.map((ob: any) => <Route path={ob.path} key={ob.path} element={ob.element} /> )
        }
      </Routes>
     </Box>
    </BrowserRouter>
  );
}

export default App;
