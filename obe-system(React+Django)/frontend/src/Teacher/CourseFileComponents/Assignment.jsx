import React, {useEffect, useState} from 'react';
import axios from 'axios'
import '../stylesCourseFile.css';
import { useUpdateAssignmentMutation, useGetAssignmentQuery} from '../../services/obesApi'

function Assignment(props) {

    const [agnData, setAgnData] = useState({
        agn_id: '',
        course_code: '',
        exam_year: '',
        title: '',
        compliance_form: '',
        compliance_form_name: '',
     })
    const [values, setValues] = useState({
        title: '',
        compliance_form_link: '',
        compliance_form: ''
    })
    const {data, isSuccess} = useGetAssignmentQuery({id: props.id})
    function extractFileName(filePath) {
        if(filePath)
        {
          const lastSlashIndex = filePath.lastIndexOf('/');
          return filePath.substring(lastSlashIndex + 1);
        }
        else
        {
          return '';
        }
    }
    function replaceSpacesWithUnderscores(str) 
    {
        return str.replace(/\s/g, '_');
    }

    const [updateAssignment] = useUpdateAssignmentMutation()
    const handleInput=(event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }
    const handleFileInput=(event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.files[0]]}));
    }
    const handleReset=() => {
        setValues(prev => ({...prev, ['title']: ['']}));
    }

    useEffect(() => {
        if(data && isSuccess) {
            setAgnData({
                agn_id: data.agn_id,
                course_code: data.course_code,
                exam_year: data.exam_year,
                title: data.title,
                compliance_form: data.compliance_form,
                compliance_form_name: extractFileName(data.compliance_form)
            })
            setValues(prev => ({...prev, ['title']: [data.title]}));
        }
     }, [data, isSuccess])

    const handleSubmit = async (event) => {
        event.preventDefault();
        let flag =0;
        if(values.compliance_form[0])
        {
            const formData = new FormData();
            formData.append('compliance_form', values.compliance_form[0]);
            formData.append('id', props.id);
            //console.log(formData.get('compliance_form').name)
            let axiosConfig = {
                headers: {
                    'Content-Type': 'multpart/form-data'
                }
            }
            //console.log(formData)
            axios.post('http://127.0.0.1:8000/api/course/update-assignment-pdf/', formData, axiosConfig).then(
                response =>{
                    flag++;
                    const str = formData.get('compliance_form').name
                    const filename = replaceSpacesWithUnderscores(str)
                    setAgnData(prev => ({...prev, ['compliance_form_name']: [filename]}));
                    setAgnData(prev => ({...prev, ['compliance_form']: ['/media/assignments/compliance_forms/'+filename]}));
                }
            ).catch(error =>{
                console.log(error)
            })
        }
        if(values.title[0])
        {
            const actualData = {
                id: props.id,
                title: values.title[0]
            };
            const res = await updateAssignment(actualData);
            if(res.error)
            {
                console.log(res.error)
            }
            else
            {
                flag++;
            }
        }
        if(flag > 0)
        {
            alert("Change in Assignment " + agnData.agn_id +" is saved successfully....")
        }
    }

    return (
        <div>
            <div className="item">
                <div className="card card-body">
                <label id="courseFileClassTestTitle">Assignment {agnData.agn_id}:</label>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="assignmentTitle" className="form-label infoFormTitle">Title:</label>
                        <input className="form-control" name="title" type="text" id="assignmentTitle" value={values.title} onChange={handleInput}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="assignmentCp" className="form-label infoFormTitle">Compliance Form:</label>
                        <input className="form-control" name="compliance_form" type="file" id="assignmentCp" onChange={handleFileInput}/>
                        <a href={`http://127.0.0.1:8000/${agnData.compliance_form}`} target="_blank">{agnData.compliance_form_name}</a>
                    </div>
                    <button type="reset" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                    <button type="submit" className="btn btn-success btnSubmit">Save</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Assignment;