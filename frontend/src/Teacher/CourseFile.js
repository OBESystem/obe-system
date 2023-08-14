import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

function CourseFile() {
    const location = useLocation();
    const data = location.state ? location.state.courseData : null;
  return (
    <div>
        <spna>{data.courseName}</spna>
    </div>
  )
}

export default CourseFile