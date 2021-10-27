import { useEffect, useState, useRef } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';

function App() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const imageRef = useRef();

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (e) {
      console.warn(e);
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
  };

  if (isModelLoading) {
    return <h2>Model loading ...</h2>;
  }

  return (
    <div className='App'>
      <h1 className='header'>Image Identification</h1>
      <div className='inputHolder'>
        <input
          type='file'
          accept='image/*'
          capture='camera'
          className='uploadInput'
          onChange={uploadImage}
        />
      </div>
      <div className='mainWrapper'>
        <div className='mainContent'>
          <div className='imageHolder'>
            {imageUrl && (
              <img src={imageUrl} alt='Upload Prev' crossOrigin='anonymous' ref={imageRef} />
            )}
          </div>
        </div>
        {imageUrl && <button className='button'>Identify Image</button>}
      </div>
    </div>
  );
}

export default App;
