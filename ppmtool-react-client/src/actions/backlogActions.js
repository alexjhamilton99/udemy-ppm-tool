import axios from 'axios';
import { GET_ERRORS } from './types';

export const addProjectTask =
  (backlogId, projectTask, history) => async (dispatch) => {
    try {
      await axios.post(`/api/backlog/${backlogId}`, projectTask);
      history.push(`/projectBoard/${backlogId}`);
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    } catch (ex) {
      dispatch({
        type: GET_ERRORS,
        payload: ex.response.data
      });
    }
  };