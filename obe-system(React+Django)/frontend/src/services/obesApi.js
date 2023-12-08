// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const obesApi = createApi({
  reducerPath: 'obesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query:(user)=>{
        return{
          url: 'user/register/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type' : 'application/json',
          }
        }
      }
    }),
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
  }),
  
})

export const { useRegisterUserMutation, useLoginUserMutation, useGetLoggedUserQuery, useGetUserMutation, useChangePasswordMutation, useSendPasswordResetEmailMutation, 
  useResetPasswordMutation, useGetCourseListMutation, useAddAssignmentMutation, useGetAssignmentListMutation, useGetAssignmentQuery, useUpdateAssignmentMutation, useAddClassTestMutation, 
  useGetClassTestListMutation, useGetClassTestQuery, useGetFinalExamQuery, useCreateFinalExamMutation, useGetFinalExamInfoMutation, useSubmitCourseFileMutation} = obesApi