import axios from 'axios';

const API_KEY = 'apikey=a2560a1e8bb98049e2506a3aa30edaf0';
const ROOT_URL = 'http://api.musixmatch.com/ws/1.1/';

/*const TOKEN = dajq9AwtWy_vuffymXP2VL7FhNIoMtfol7WqraNHIBNSGXo36kGmHNhtS7Hq7QCl*/

export const FETCH_TRACK = 'FETCH_TRACK';
export const FETCH_LYRIC = 'FETCH_LYRIC';

export function fetchTrack(artist) {
  var url = `${ROOT_URL}artist.search&q_artist=${artist}&page_size=20&` + API_KEY
  const request = axios.get(url)
  .then((response) => {
      return axios.get(`${ROOT_URL}track.search&page_size=100&f_artist_id=
        ${response.data.message.body.artist_list[0].artist.artist_id}` +
        '&s_track_rating=desc&' + API_KEY)
  });

  console.log('requesttrack', request);

  //Used for non asynchronized calls
  return {
    type: FETCH_TRACK,
    payload: request
  };
  /*
  .then((response) => {
    return (dispatch) => {
      console.log('response', response);
      dispatch({type: FETCH_TRACK, payload: response})
    };
  });
*/

  /*
  return (dispatch) => {
    request.then(({data}) => {

      console.log('data', data);
      dispatch ({ type: FETCH_TRACK, payload: data})
    });
  };
*/

}

export function fetchLyric(artist) {
  var url = `${ROOT_URL}artist.search&q_artist=${artist}&page_size=20&` + API_KEY
  const request = axios.get(url)
  .then((response) => {
      return axios.get(`${ROOT_URL}track.search&page_size=100&f_artist_id=
        ${response.data.message.body.artist_list[0].artist.artist_id}` +
        '&s_track_rating=desc&' + API_KEY)
  })
  .then((response) => {
      return axios.get(`${ROOT_URL}track.lyrics.get?&track_id=
        ${response.data.message.body.track_list[0].track.track_id}` +
        '&s_track_rating=desc&' + API_KEY)
  });

  console.log('requestlyric', request);

  //Used for non asynchronized calls
  return {
    type: FETCH_LYRIC,
    payload: request
  };

}