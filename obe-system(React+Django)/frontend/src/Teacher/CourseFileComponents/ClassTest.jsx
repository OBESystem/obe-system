import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../stylesCourseFile.css';
import { useGetClassTestQuery} from '../../services/obesApi'

function ClassTest(props) {

    const [ctData, setCtData] = useState({
        ct_id: '',
        course_code: '',
        exam_year: '',
        question: '',
        question_name: '',
        compliance_form: '',
        compliance_form_name: '',
        best_answersheet: '',
        best_answersheet_name: '',
        average_answersheet: '',
        average_answersheet_name: '',
        worst_answersheet: '',
        worst_answersheet_name: '',
     })
    const [values, setValues] = useState({
        question: '',
        question_link: '',
        compliance_form_link: '',
        compliance_form: '',
        best_answersheet: '',
        best_answersheet_link: '',
        average_answersheet: '',
        average_answersheet_link: '',
        worst_answersheet: '',
        worst_answersheet_link: '',
    })
    const {data, isSuccess} = useGetClassTestQuery({id: props.id})
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

    const handleFileInput=(event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.files[0]]}));
    }

    useEffect(() => {
        if(data && isSuccess) {
            setCtData({
                ct_id: data.ct_id,
                course_code: data.course_code,
                exam_year: data.exam_year,
                question: data.question,
                question_name: extractFileName(data.question),
                compliance_form: data.compliance_form,
                compliance_form_name: extractFileName(data.compliance_form),
                best_answersheet: data.best_answersheet,
                best_answersheet_name: extractFileName(data.best_answersheet),
                average_answersheet: data.average_answersheet,
                average_answersheet_name: extractFileName(data.average_answersheet),
                worst_answersheet: data.worst_answersheet,
                worst_answersheet_name: extractFileName(data.worst_answersheet),
            })
        }
    }, [data, isSuccess])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', props.id);
        if(values.question[0])
        {
            formData.append('question', values.question[0]);
        }
        if(values.compliance_form[0])
        {
            formData.append('compliance_form', values.compliance_form[0]);
        }
        if(values.best_answersheet[0])
        {
            formData.append('best_answersheet', values.best_answersheet[0]);
        }
        if(values.average_answersheet[0])
        {
            formData.append('average_answersheet', values.average_answersheet[0]);
        }
        if(values.worst_answersheet[0])
        {
            formData.append('worst_answersheet', values.worst_answersheet[0]);
        }

        let axiosConfig = {
            headers: {
                'Content-Type': 'multpart/form-data'
            }
        }
        //console.log(formData)
        axios.post('http://127.0.0.1:8000/api/course/update-class-test/', formData, axiosConfig).then(
            response =>{
                alert("Change in Class test " + ctData.ct_id +" is saved successfully....")
                if(values.compliance_form[0])
                {
                    const str = formData.get('compliance_form').name
                    const filename = replaceSpacesWithUnderscores(str)
                    setCtData(prev => ({...prev, ['compliance_form_name']: [filename]}));
                    setCtData(prev => ({...prev, ['compliance_form']: ['/media/cts/compliance_forms/'+filename]}));
                }
                if(values.question[0])
                {
                    const str = formData.get('question').name
                    const filename = replaceSpacesWithUnderscores(str)
                    setCtData(prev => ({...prev, ['question_name']: [filename]}));
                    setCtData(prev => ({...prev, ['question']: ['/media/cts/questions/'+filename]}));
                }
                if(values.best_answersheet[0])
                {
                    const str = formData.get('best_answersheet').name
                    const filename = replaceSpacesWithUnderscores(str)
                    setCtData(prev => ({...prev, ['best_answersheet_name']: [filename]}));
                    setCtData(prev => ({...prev, ['best_answersheet']: ['/media/cts/best_answersheets/'+filename]}));
                }
                if(values.average_answersheet[0])
                {
                    const str = formData.get('average_answersheet').name
                    const filename = replaceSpacesWithUnderscores(str)
                    setCtData(prev => ({...prev, ['average_answersheet_name']: [filename]}));
                    setCtData(prev => ({...prev, ['average_answersheet']: ['/media/cts/average_answersheets/'+filename]}));
                }
                if(values.worst_answersheet[0])
                {
                    const str = formData.get('worst_answersheet').name
                    const filename = replaceSpacesWithUnderscores(str)
                    setCtData(prev => ({...prev, ['worst_answersheet_name']: [filename]}));
                    setCtData(prev => ({...prev, ['worst_answersheet']: ['/media/cts/worst_answersheets/'+filename]}));
                }
            }
        ).catch(error =>{
            console.log(error)
        })
    }

    return (
        <div>
            <div className="item">
                <div className="card card-body">
                <label id="courseFileClassTestTitle">Class Test {ctData.ct_id}:</label>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="ctQ" className="form-label infoFormTitle">Question:</label>
                        <input className="form-control" name="question" type="file" id="ctQ" onChange={handleFileInput}/>
                        <a href={`http://127.0.0.1:8000/${ctData.question}`} target="_blank">{ctData.question_name}</a>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ctCp" className="form-label infoFormTitle">Compliance Form:</label>
                        <input className="form-control" name="compliance_form" type="file" id="ctCp" onChange={handleFileInput}/>
                        <a href={`http://127.0.0.1:8000/${ctData.compliance_form}`} target="_blank">{ctData.compliance_form_name}</a>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ansB" className="form-label infoFormTitle">Answer Script which attained Highest Marks:</label>
                        <input className="form-control" name="best_answersheet" type="file" id="ansB" onChange={handleFileInput}/>
                        <a href={`http://127.0.0.1:8000/${ctData.best_answersheet}`} target="_blank">{ctData.best_answersheet_name}</a>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ansA" className="form-label infoFormTitle">Answer Script which attained Average Marks:</label>
                        <input className="form-control" name="average_answersheet" type="file" id="ansA" onChange={handleFileInput}/>
                        <a href={`http://127.0.0.1:8000/${ctData.average_answersheet}`} target="_blank">{ctData.average_answersheet_name}</a>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ansW" className="form-label infoFormTitle">Answer Script which attained Lowest Marks:</label>
                        <input className="form-control" name="worst_answersheet" type="file" id="ansW" onChange={handleFileInput}/>
                        <a href={`http://127.0.0.1:8000/${ctData.worst_answersheet}`} target="_blank">{ctData.worst_answersheet_name}</a>
                    </div>
                    <button type="reset" className="btn btn-secondary">Reset</button>
                    <button type="submit" className="btn btn-success btnSubmit">Save</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default ClassTest;