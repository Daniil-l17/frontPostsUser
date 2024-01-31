import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useNavigate } from 'react-router-dom';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from 'axios';
import { useGetAddPostNewMutation } from '../../redux/api/injest/addPost';

export const AddPost = () => {
  const [text, settext] = React.useState('');
  const [title, settitle] = React.useState('');
  const nav = useNavigate();
  const [tags, settags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputRefFile = useRef(null);
  const [addPost,result] = useGetAddPostNewMutation();

  const handleChangeFile = async e => {
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      const { data } = await axios.post('http://localhost:4777/upload', formData);
      setImageUrl(data.url);
    } 
    catch (e) {
      console.log(e);
    }
  };
  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onSumbit = async () => {

    try {
      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };
      addPost(fields);
    }
    catch (e) {
      console.log(e);
    }
  };

  if(result?.data?._id){
    nav(`/posts/${result?.data?._id}`)
  }

  const onChange = React.useCallback(value => {
    settext(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputRefFile.current.click()}
        onChange={handleChangeFile}
        variant="outlined"
        size="large">
        Загрузить превью
      </Button>
      <input ref={inputRefFile} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:4777${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => settitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        value={tags}
        onChange={e => settags(e.target.value)}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSumbit} size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
