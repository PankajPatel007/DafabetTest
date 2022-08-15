import './App.css';
import { Button, IconButton, ImageList, ImageListItem, Stack, StyledEngineProvider, TextField } from '@mui/material';
import ImageFormModal from './Modal';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Pagination from '@mui/material/Pagination';

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
  // const [displayImgList, setDisplayImgList] = React.useState([]);

  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);

  const countRef = React.useRef(13);

  console.log(imgList);

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
    setModalData({ ...data });
  }

  const updateImageList = (data) => {
    if (config.idx == undefined) {
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

  const filteredImgList = imgList.filter((img) => img.title.includes(search));
  const totalPages = Math.ceil(filteredImgList.length / 5);

  console.log('totalPages: ', totalPages);
  console.log('filteredImgList: ', filteredImgList);

  const addSampleData = () => {
    const count = countRef.current.value;
    const sample = {
      image: (idx) => {
        return {
          "title": `Title ${idx}`,
          "desc": `Description ${idx}`,
          "image": {
            "name": `truck_image ${idx}.jpg`,
            "base": "data:image/jpeg;base64,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"
          },
        }
      },
    };
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(sample.image(i + 1));
    }
    setImgList([...arr]);
  }

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  let displayImgList = [];
  if (filteredImgList.length) {
    const mulArray = sliceIntoChunks(filteredImgList, 5);
    console.log('mulArray: ', mulArray[page]);
    // setDisplayImgList(mulArray[page]);
    displayImgList = mulArray[page];
  } else {
    // setDisplayImgList([]);
    displayImgList = [];
  }


  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <div className="input-field">
          <Button variant="outlined" onClick={addImageData}>
            Add Image
          </Button>
          <div className='add-sample-data'>
            <TextField
              type="number"
              inputRef={countRef}
              id="count"
              label="count"
              variant="standard"
              defaultValue={countRef.current}
            /> {'\u00A0'}{'\u00A0'}
            <Button variant="outlined" onClick={addSampleData}>
              Add Sample Data
            </Button>
          </div>
        </div>
        <ImageFormModal modalData={modalData} updateModalData={updateModalData} updateImageList={updateImageList} open={config.open} type={config.type} handleClose={handleClose} />
        <br />
        <TextField
          value={search}
          onChange={({ target }) => {
            setSearch(target.value);
          }}
          id="search"
          label="Search"
          variant="standard"
        />
        <div>
          <br />
          <ImageList gap={10} cols={5} rowHeight={180}>
            {displayImgList?.map((item, idx) => (
              <Card
                key={idx}
                sx={{ maxWidth: 345 }}
                onClick={() => {
                  setConfig({
                    open: true,
                    type: 'Edit',
                    idx,
                  });
                  setModalData(item);
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${item.image.base}`}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </CardContent>
                  {/* <IconButton className='btn-del' aria-label="delete" onClick={() => {
                    imgList.splice(idx, 1);
                    setImgList([...imgList]);
                  }} > */}
                  <CloseIcon className='btn-del' aria-label="delete" onClick={(e) => {
                    e.stopPropagation();
                    imgList.splice(idx, 1);
                    setImgList([...imgList]);
                  }} />
                  {/* </IconButton> */}
                </CardActionArea>
              </Card>
            ))}
          </ImageList>
          <br />
        </div>
        <br />
        <br />
        <Stack spacing={2}>
          <Pagination
            page={page + 1}
            count={totalPages}
            onChange={(event, page) => {
              console.log('onChange page: ', page - 1);
              setPage(page - 1);
            }}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </StyledEngineProvider >
    </div >
  );
}

export default App;
