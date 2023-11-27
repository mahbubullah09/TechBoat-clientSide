
import React, { useState } from 'react';
import { render } from 'react-dom';

import './style/tagStyle.css';
import { WithContext as ReactTags } from 'react-tag-input';


  


const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


const Tagtest = ({tags , setTags}) => {

    
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
      
      <div>
        <ReactTags
          tags={tags}
          
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="top"
          autocomplete
          editable
        />

      
      </div>
    </div>
    );
};

export default Tagtest;