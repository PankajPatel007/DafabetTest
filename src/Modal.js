import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

export default function ImageFormModal(props) {

    const handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        const name = target.files[0]?.name;

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            props.updateModalData({
                ...props.modalData,
                image: {
                    name,
                    base: e.target.result,
                },
            });
        };
    };

    const handleValue = ({ target }) => {
        props.updateModalData({
            ...props.modalData,
            [target.id]: target.value,
        });
    };


  return (
    <div>      
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>{props.type} Image</DialogTitle>
        <DialogContent>
          
        <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="contained" component="label">
                Upload
                <input hidden onChange={handleCapture} accept="image/*" multiple type="file" />
            </Button>
            { props.modalData.image?.name && <span> {props.modalData.image.name} </span>}     
        </Stack>
          
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={props.modalData?.title}
            onChange={handleValue}
          />
          <TextField
            autoFocus
            margin="dense"
            id="desc"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={props.modalData?.desc}
            onChange={handleValue}
          />          
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={() => {            
            props.updateImageList(props.modalData);
            // setData(initData);
          }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
