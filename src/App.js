import './App.css';
import { Button, IconButton, ImageList, ImageListItem, Stack, StyledEngineProvider } from '@mui/material';
import ImageFormModal from './Modal';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';

/**
 * 
 * Frontend Task
Create a personal image library where you can add, edit, view, and delete the images according
to the following instructions;
    1. The user should be able to add an image (.png, .jpg formats only) with these details
    a. Title (required)
    b. Description
    2. The user should be able to view a list of images in his/her library with 5 images per page
    3. The user should be able to search an image by title
    4. The user should be able to edit the image title and description
    5. The user should be able to delete an image added
Technologies to be used;
    1. React or Angular
    2. SCSS/SASS/LESS
    3. Use a component library such as material UI/ant design
Nice to have but not required;
    1. Typescript
    2. Unit testing
Upload the finished task to a public Github repository with a Readme file of the technologies you
used, and clear instructions to set up the project in a local machine.
 * 
 */

function App() {

  const [config, setConfig] = React.useState({
    open: false,
    type: '',
    idx: null,
  });

  const [imgList, setImgList] = React.useState([]);

  const initModalData = {
    title: '',
    desc: '',
    image: {
        name: '',
        base: ''
    },
  }
  const [modalData, setModalData] = React.useState(initModalData);
  const updateModalData = (data) => {
    setModalData({...data});
  }

  const updateImageList = (data) => {
    if (config.idx == undefined ) {
      setImgList([...imgList, data]);
    } else {
      imgList[config.idx] = data;
      setImgList([...imgList]);
    }    
    handleClose();
  }

  const addImageData = () => {    
    setConfig({
      open: true,
      type: 'Add',
    });
    updateModalData(initModalData);
  };

  const handleClose = () => {
    setConfig({
      open: false,
      type: '',
      idx: null,
    });    
  };
  
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <Button variant="outlined" onClick={addImageData}>
          Add Image
        </Button>
        <ImageFormModal modalData={modalData} updateModalData={updateModalData} updateImageList={updateImageList} open={config.open} type={config.type} handleClose={handleClose} />
        <div>
        <ImageList sx={{ width: 1024, height: 450 }} gap={10} cols={5} rowHeight={164}>
          {imgList.map((item, idx) => (
            <ImageListItem key={idx+1}>
              <img
                src={`${item.image.base}`}                
                alt={item.title}
                loading="lazy"
                onClick={() => {
                  setConfig({
                    open: true,
                    type: 'Edit',
                    idx,
                  });
                  setModalData(item);                  
                }}
              />                    
                <IconButton className='btn-del' aria-label="delete" onClick={() => {
                    imgList.splice(idx,1);
                    setImgList([...imgList]);                    
                  }} >
                  <CloseIcon />
                </IconButton>                              
            </ImageListItem>
          ))}
      </ImageList>
        </div>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
