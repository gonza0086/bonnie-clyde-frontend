// Mui
import { Button } from '@mui/material';

export default function FileInput() {
    return (
        <div>
            <input id='image-upload' onInput={value => console.log(value)} multiple type='file' accept='image/*' hidden />
            <Button type='submit' variant='contained' color='cancel'>
                <label htmlFor='image-upload'>Choose File</label>
            </Button>
        </div>
    );
}
