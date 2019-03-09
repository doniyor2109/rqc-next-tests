import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetchingMain: false,
  isFetchingSci: false,
  sciSlider: [],
  // newsTeaser: {}
};

function fetchMainSliderSuccess(state, action) {
  return {...state, isFetchingMain: false, ...action.response.results[0]}
}

function fetchMainSciSliderSuccess(state, action) {
  const sciSlider = action.response.results
  return {...state, isFetchingSci: false, sciSlider}
}

// function fetchNewsForMainSuccess(state, action) {
//   return {...state, newsTeaser:  {isFetching: false,
//                                   articles: action.response.results,
//                                   total_pages: action.response.total_pages,
//                                   total_results_size: action.response.total_results_size,
//                                   next_page: action.response.next_page,
//                                   prev_page: action.response.prev_page}}
// }

export const main = (state = initialState, action) => {
  switch (action.type) {

    // reducer for main slider
    case action_types.FETCH_MAIN_REQUEST:
      return {...state, isFetchingMain: true };

    case action_types.FETCH_MAIN_SUCCESS:
      return fetchMainSliderSuccess(state, action);

    case action_types.FETCH_MAIN_FAILURE:
      console.log("FETCH_MAIN_sFAILURE", action.error);
      return { ...state, isFetchingMain: false };

    // reducer for scientists slider
    case action_types.FETCH_MAIN_SCI_SLIDER_REQUEST:
      return {...state, isFetchingSci: true };

    case action_types.FETCH_MAIN_SCI_SLIDER_SUCCESS:
      return fetchMainSciSliderSuccess(state, action);

    case action_types.FETCH_MAIN_SCI_SLIDER_FAILURE:
      console.log("FETCH_MAIN_SCI_SLIDER_FAILURE", action.error);
      return { ...state, isFetchingSci: false };

    default:
      return state
  }
}
