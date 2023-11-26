
import  { useState } from 'react';
import { render } from 'react-dom';

import './style/tagStyle.css';
import { WithContext as ReactTags } from 'react-tag-input';

const emni = [
    { id:'mobile', text: 'mobile' },
    { id: 'ai', text: 'ai'},
    { id: 'electronics', text: 'electronics' },
      
  ]
  
  console.log(emni);

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


const Tagtest = () => {

    const [tags, setTags] = React.useState([]);
    console.log(tags);

    const handleDelete = (i) => {
      setTags(tags.filter((tag, index) => index !== i));
    };
  
    const handleAddition = (tag) => {
      setTags([...tags, tag]);
    };
  
    const handleDrag = (tag, currPos, newPos) => {
      const newTags = tags.slice();
  
      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);
  
      // re-render
      setTags(newTags);
    };
  
    const handleTagClick = (index) => {
      console.log('The tag at index ' + index + ' was clicked');
    };


    return (
        <div className="app">
      <h1> React Tags Example </h1>
      <div>
        <ReactTags
          tags={tags}
          
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
          editable
        />

      <div className='grid grid-cols-4 max-w-xl mx-auto'>
      {
            tags.map((data) => <div key={data}> <h4>{data?.text}</h4></div>) 
        }
      </div>
      </div>
    </div>
    );
};

export default Tagtest;