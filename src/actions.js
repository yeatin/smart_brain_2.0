import {
    CHANGE_SEARCH_FIELD,
    CHANGE_IMG_FIELD,
    REQUEST_IMG_PENDING,
    REQUEST_IMG_SUCCESS,
    REQUEST_IMG_FAIL,
    REQUEST_COUNT_PENDING,
    REQUEST_COUNT_SUCCESS,
    REQUEST_COUNT_FAIL,
    CHANGE_ROUTE,
    LOAD_USER,
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    CHANGE_NAME,
    REQUEST_FORM_PENDING,
    REQUEST_FORM_SUCCESS,
    REQUEST_FORM_FAIL
} from './constants';

export const setInput = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})

export const setImg = () => (dispatch, getstate) => {
    const state = getstate();
    dispatch({ type: CHANGE_IMG_FIELD, payload: state.setImgUrl.input });
    dispatch({ type: REQUEST_IMG_PENDING });
    fetch('https://safe-earth-86770.herokuapp.com/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: state.setImgUrl.input })
    })
        .then(response => response.json())
        .then(data => data.status ? setCalculation(data) : null)
        .then(data => {
            dispatch({
                type: REQUEST_IMG_SUCCESS,
                payload: data
            })
            return data
        })
        .then((boxes) => {
            dispatch({ type: REQUEST_COUNT_PENDING });
            fetch('https://safe-earth-86770.herokuapp.com/image', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: state.changeUser.id, boxesNum: boxes.length })
            })
                .then(data => data.json())
                .then(count => dispatch({
                    type: REQUEST_COUNT_SUCCESS,
                    payload: count
                }))
                .catch(err => dispatch({
                    type: REQUEST_COUNT_FAIL,
                    payload: err
                }))
        })
        .catch(err => {
            dispatch({
                type: REQUEST_IMG_FAIL,
                payload: err
            })
            alert('Did not detect any valid human face. Please try again.')
        });
}

export const setCalculation = (data) => {
    const faces = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return faces.map(face => {
        let clarifyFace = face.region_info.bounding_box;
        return {
            leftCol: clarifyFace.left_col * width,
            topRow: clarifyFace.top_row * height,
            rightCol: width * (1 - clarifyFace.right_col),
            bottomRow: height * (1 - clarifyFace.bottom_row)
        }
    })
}

export const setRoute = (route) => ({
    type: CHANGE_ROUTE,
    payload: route
})

export const setUser = (text) => ({
    type: LOAD_USER,
    payload: text
})

// for register and signin

export const setEmail = (text) => ({
    type: CHANGE_EMAIL,
    payload: text
})

export const setPassword = (text) => ({
    type: CHANGE_PASSWORD,
    payload: text
})

export const setName = (text) => ({
    type: CHANGE_NAME,
    payload: text
})

// for signin
export const submitSignin = () => (dispatch, getState) => {
    const state = getState();
    dispatch({ type: REQUEST_FORM_PENDING });
    fetch('https://safe-earth-86770.herokuapp.com/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: state.changeSignin.signinEmail,
            password: state.changeSignin.signinPassword
        })
    })
        .then(res => res.json())
        .then(user => {
            if (user.id) {
                dispatch({ type: REQUEST_FORM_SUCCESS });
                dispatch(setUser(user));
                dispatch(setRoute('home'));
            } else {
                alert('Wrong email and password combination.');
            }
        })
        .catch(err => {
            dispatch({ type: REQUEST_FORM_FAIL, payload: err })
        })
}

// for register
export const submitRegister = () => (dispatch, getState) => {
    const state = getState();
    dispatch({ type: REQUEST_FORM_PENDING });
    fetch(' https://safe-earth-86770.herokuapp.com/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: state.changeRegister.newEmail,
            password: state.changeRegister.newPassword,
            name: state.changeRegister.newName
        })
    })
        .then(res => res.json())
        .then(user => {
            if (user.id) {
                dispatch({ type: REQUEST_FORM_SUCCESS })
                dispatch(setUser(user));
                dispatch(setRoute('home'));
            } else {
                alert('Wrong email and password combination.');
            }
        })
        .catch(err => {
            dispatch({ type: REQUEST_FORM_FAIL, payload: err })
        })
}