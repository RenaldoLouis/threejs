import './Index.css';
import Home from './pages/Home';
import CanvasModel from './canvas';
import Customizer from './pages/Customizer';
import ChairCanvas from './canvas/ChairCanvas';
import { useState } from 'react';
import { ObjectTypeThreeDimension } from './enum/3dObjectType';

function App() {
  const [showing3dObject, setShowing3dObject] = useState(ObjectTypeThreeDimension.MAC)

  return (
    <main className='app transition-all ease-in'>
      <Home setShowing3dObject={setShowing3dObject} />
      {showing3dObject === ObjectTypeThreeDimension.MAC ? (
        <ChairCanvas />
      ) : (
        <CanvasModel />
      )}
      <Customizer />
    </main>
  );
}

export default App;
