import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../stylesCourseFile.css';
import { useGetFinalExamQuery, useCreateFinalExamMutation} from '../../services/obesApi'

function FinalExam(props) {

    const [feData, setFeData] = useState({
        id: '',
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
    const {data, isSuccess} = useGetFinalExamQuery({course_code: props.course_code, exam_year:props.exam_year})
    const [createFinalExam] = useCreateFinalExamMutation()
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
            if(Array.isArray(data) && data.length > 0)
            {
                //console.log(data)
                setFeData({
                    id: data[0].id,
                    course_code: data[0].course_code,
                    exam_year: data[0].exam_year,
                    question: data[0].question,
                    question_name: extractFileName(data[0].question),
                    compliance_form: data[0].compliance_form,
                    compliance_form_name: extractFileName(data[0].compliance_form),
                    best_answersheet: data[0].best_answersheet,
                    best_answersheet_name: extractFileName(data[0].best_answersheet),
                    average_answersheet: data[0].average_answersheet,
                    average_answersheet_name: extractFileName(data[0].average_answersheet),
                    worst_answersheet: data[0].worst_answersheet,
                    worst_answersheet_name: extractFileName(data[0].worst_answersheet),
                })
            }
            else
            {
                const actualData = {
                    course_code: props.course_code,
                    exam_year: props.exam_year,
                }
                const res = createFinalExam(actualData);
                console.log("Created Final Exam....")
            }
        }
    }, [data, isSuccess])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', feData.id);
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
        axios.post('http://127.0.0.1:8000/api/course/update-final-exam/', formData, axiosConfig).then(
            response =>{
                alert("Change in Final Exam is saved successfully....")
                if(values.compliance_form[0])
                {
                    const str = formData.get('compliance_form').name
                    const filename = replaceSpacesWithUnderscores(str)
                    setFeData(prev => ({...prev, ['compliance_form_name']: [filename]}));
                    setFeData(prev => ({...prev, ['compliance_form']: ['/media/final_exams/compliance_forms/'+filename]}));
                }
                if(values.question[0])
                {
                    const str = formData.get('question').name
                    const filename = replaceSpacesWithUnderscores(str)
                    setFeData(prev => ({...prev, ['question_name']: [filename]}));
                    setFeData(prev => ({...prev, ['question']: ['/media/final_exams/questions/'+filename]}));
                }
                if(values.best_answersheet[0])
                {
                    const str = formData.get('best_answersheet').name
                    const filename = replaceSpacesWithUnderscores(str)
                    setFeData(prev => ({...prev, ['best_answersheet_name']: [filename]}));
                    setFeData(prev => ({...prev, ['best_answersheet']: ['/media/final_exams/best_answersheets/'+filename]}));
                }
                if(values.average_answersheet[0])
                {
                    const str = formData.get('average_answersheet').name
                    const filename = replaceSpacesWithUnderscores(str)
                    setFeData(prev => ({...prev, ['average_answersheet_name']: [filename]}));
                    setFeData(prev => ({...prev, ['average_answersheet']: ['/media/final_exams/average_answersheets/'+filename]}));
                }
                if(values.worst_answersheet[0])
                {
                    const str = formData.get('worst_answersheet').name
                    const filename = replaceSpacesWithUnderscores(str)
                    setFeData(prev => ({...prev, ['worst_answersheet_name']: [filename]}));
                    setFeData(prev => ({...prev, ['worst_answersheet']: ['/media/final_exams/worst_answersheets/'+filename]}));
                }
            }
        ).catch(error =>{
            console.log(error)
        })
    }

    return (
        <div>
            <p>
              <label className="fs-2"><strong>Final exam:</strong></label>
            </p>
            <div>
            <div className="card card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="feQ" className="form-label infoFormTitle">Question:</label>
                        <input className="form-control" name="question" type="file" id="feQ" onChange={handleFileInput}/>
                        <a href={`http://127.0.0.1:8000/${feData.question}`} target="_blank">{feData.question_name}</a>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="feCp" className="form-label infoFormTitle">Compliance Form:</label>
                        <input className="form-control" name="compliance_form" type="file" id="feCp" onChange={handleFileInput}/>
                        <a href={`http://127.0.0.1:8000/${feData.compliance_form}`} target="_blank">{feData.compliance_form_name}</a>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ansB" className="form-label infoFormTitle">Answer Script which attained Highest Marks:</label>
                        <input className="form-control" name="best_answersheet" type="file" id="ansB" onChange={handleFileInput}/>
                        <a href={`http://127.0.0.1:8000/${feData.best_answersheet}`} target="_blank">{feData.best_answersheet_name}</a>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ansA" className="form-label infoFormTitle">Answer Script which attained Average Marks:</label>
                        <input className="form-control" name="average_answersheet" type="file" id="ansA" onChange={handleFileInput}/>
                        <a href={`http://127.0.0.1:8000/${feData.average_answersheet}`} target="_blank">{feData.average_answersheet_name}</a>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ansW" className="form-label infoFormTitle">Answer Script which attained Lowest Marks:</label>
                        <input className="form-control" name="worst_answersheet" type="file" id="ansW" onChange={handleFileInput}/>
                        <a href={`http://127.0.0.1:8000/${feData.worst_answersheet}`} target="_blank">{feData.worst_answersheet_name}</a>
                    </div>
                <button type="reset" className="btn btn-secondary">Reset</button>
                <button type="submit" className="btn btn-success btnSubmit">Save</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default FinalExam