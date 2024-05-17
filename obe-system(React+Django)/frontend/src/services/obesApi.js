// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const obesApi = createApi({
  reducerPath: 'obesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query:(user)=>{
        return{
          url: 'user/login/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getLoggedUser: builder.query({
      query:(access_token)=>{
        return{
          url: 'user/profile/',
          method: 'GET',
          headers: {
            'authorization' : `Bearer ${access_token}`,
          }
        }
      }
    }),
    getUser: builder.mutation({
      query:(access_token)=>{
        return{
          url: 'user/profile/',
          method: 'GET',
          headers: {
            'authorization' : `Bearer ${access_token}`,
          }
        }
      }
    }),
    changePassword: builder.mutation({
      query:({actualData, access_token})=>{
        return{
          url: 'user/changepassword/',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization' : `Bearer ${access_token}`,
          }
        }
      }
    }),
    sendPasswordResetEmail: builder.mutation({
      query:(user)=>{
        return{
          url: 'user/send-reset-password-email/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    resetPassword: builder.mutation({
      query:({actualData, id, token})=>{
        return{
          url: `user/reset-password/${id}/${token}/`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getUserByID: builder.mutation({
      query:({id})=>{
        return{
          url: `user/get-user/${id}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getTeacher: builder.mutation({
      query:({user_id})=>{
        return{
          url: `user/get-teacher/${user_id}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getTeacherListByDept: builder.mutation({
      query:({department})=>{
        return{
          url: `user/get-teachers-by-dept/${department}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    addCourse: builder.mutation({
      query:(actualData)=>{
        return{
          url: 'course/add-course/',
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getCourseList: builder.mutation({
      query:({teacher_id})=>{
        return{
          url: `course/get-courses/${teacher_id}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getCourseListByDept: builder.mutation({
      query:({department})=>{
        return{
          url: `course/get-courses-by-department/${department}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getCourseListByExam: builder.mutation({
      query:({exam_year,year,semester})=>{
        return{
          url: `course/get-courses-by-exam/${exam_year}/${year}/${semester}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    addAssignment: builder.mutation({
      query:(actualData)=>{
        return{
          url: 'course/add-assignment/',
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    addClassTest: builder.mutation({
      query:(actualData)=>{
        return{
          url: 'course/add-class-test/',
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getAssignmentList: builder.mutation({
      query:({course_code, exam_year})=>{
        return{
          url: `course/get-assignments/${course_code}/${exam_year}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getClassTestList: builder.mutation({
      query:({course_code, exam_year})=>{
        return{
          url: `course/get-class-tests/${course_code}/${exam_year}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getAssignment: builder.query({
      query:({id})=>{
        return{
          url: `course/get-assignment/${id}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getClassTest: builder.query({
      query:({id})=>{
        return{
          url: `course/get-class-test/${id}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getFinalExam: builder.query({
      query:({course_code, exam_year})=>{
        return{
          url: `course/get-final-exam/${course_code}/${exam_year}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getFinalExamInfo: builder.mutation({
      query:({course_code, exam_year})=>{
        return{
          url: `course/get-final-exam/${course_code}/${exam_year}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    createFinalExam: builder.mutation({
      query:(actualData)=>{
        return{
          url: 'course/create-final-exam/',
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    updateAssignment: builder.mutation({
      query:(actualData)=>{
        return{
          url: `course/update-assignment/`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    submitCourseFile: builder.mutation({
      query:(actualData)=>{
        return{
          url: `course/submit-course-file/`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    updateTeacherForCFS: builder.mutation({
      query:(actualData1)=>{
        return{
          url: `user/update-teacher-for-course-file-submission/`,
          method: 'POST',
          body: actualData1,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    updateTeacherForCA_add: builder.mutation({
      query:(actualData1)=>{
        return{
          url: `user/update-teacher-for-course-assignment-add/`,
          method: 'POST',
          body: actualData1,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getAcademicCalendar: builder.mutation({
      query:()=>{
        return{
          url: 'academiccalendar/get-academic-calendars/',
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    getUnapprovedTeachers: builder.mutation({
      query:({department, userType})=>{
        return{
          url: `user/get-unapproved-teachers/${department}/${userType}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    addTeacher: builder.mutation({
      query:(user)=>{
        return{
          url: 'user/add-teacher/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    approveUser: builder.mutation({
      query:(actualData)=>{
        return{
          url: `user/approve-user/`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    rejectUser: builder.mutation({
      query:(actualData)=>{
        return{
          url: `user/reject-user/`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    updateTeacherForCA_remove: builder.mutation({
      query:(actualData3)=>{
        return{
          url: `user/update-teacher-for-course-assignment-remove/`,
          method: 'POST',
          body: actualData3,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    filterCourses: builder.mutation({
      query:({department, exam_year, year, semester})=>{
        return{
          url: `course/filter-courses/${department}/${exam_year}/${year}/${semester}/`,
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    assignTeacher: builder.mutation({
      query:(actualData2)=>{
        return{
          url: `course/assign-teacher/`,
          method: 'POST',
          body: actualData2,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
  }),
})

export const { useLoginUserMutation, useGetLoggedUserQuery, useGetUserMutation, useChangePasswordMutation, useSendPasswordResetEmailMutation, useGetUserByIDMutation,
  useResetPasswordMutation, useAddCourseMutation, useGetCourseListMutation, useAddAssignmentMutation, useGetAssignmentListMutation, useGetAssignmentQuery, useUpdateAssignmentMutation, useAddClassTestMutation, 
  useGetClassTestListMutation, useGetClassTestQuery, useGetFinalExamQuery, useCreateFinalExamMutation, useGetFinalExamInfoMutation, useSubmitCourseFileMutation, 
  useFilterCoursesMutation, useGetAcademicCalendarMutation, useGetTeacherMutation, useGetTeacherListByDeptMutation,useUpdateTeacherForCFSMutation, useGetUnapprovedTeachersMutation, useAddTeacherMutation,
  useApproveUserMutation, useRejectUserMutation, useGetCourseListByDeptMutation, useUpdateTeacherForCA_addMutation, useAssignTeacherMutation, useUpdateTeacherForCA_removeMutation,
  useGetCourseListByExamMutation} = obesApi