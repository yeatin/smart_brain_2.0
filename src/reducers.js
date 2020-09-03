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

const initialStateInput = {
    input: ''
}
export const setImgUrl = (state = initialStateInput, action = {}) => {
    switch (action.type) {
        case CHANGE_SEARCH_FIELD:
            return Object.assign({}, state, { input: action.payload });
        default:
            return state;
    }
}

const initialStateImgUrl = {
    imageUrl: ''
}
export const changeImgUrl = (state = initialStateImgUrl, action = {}) => {
    switch (action.type) {
        case CHANGE_IMG_FIELD:
            return Object.assign({}, state, { imageUrl: action.payload });
        default:
            return state;
    }
}

const initialStateUrl = {
    isPending: false,
    error: '',
    boxes: []
}
export const searchImgBoxes = (state = initialStateUrl, action = {}) => {
    switch (action.type) {
        case REQUEST_IMG_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_IMG_SUCCESS:
            return Object.assign({}, state, { boxes: action.payload });
        case REQUEST_IMG_FAIL:
            return Object.assign({}, state, {
                error: action.payload,
                isPending: false
            })
        default:
            return state;
    }
}
const initialStateCount = {
    isPending: false,
    user: { entries: 0 },
    error :''
}
export const searchImgCount = (state = initialStateCount, action = {}) => {
    switch (action.type) {
        case REQUEST_COUNT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_COUNT_SUCCESS:
            return Object.assign({}, state.user, {
                entries: action.payload,
                isPending: false
            })
        case REQUEST_COUNT_FAIL:
            return Object.assign({}, state, {
                error: action.payload,
                isPending: false
            })
        default:
            return state;
    }
}

const initailStateRoute = {
    input: '',
    imageUrl: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}
export const changeRoute = (state = initailStateRoute, action = {}) => {
    switch (action.type) {
        case CHANGE_ROUTE:
            if (action.payload.route === 'signout') {
                return Object.assign({}, state, { initailStateRoute });
            } else if (action.payload.route === 'home') {
                return Object.assign({}, state, { isSignedIn: true });
            }
            return Object.assign({}, state, { route: action.payload });
        default:
            return state;
    }
}

const initailStateLoadUser = {
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}
export const changeUser = (state = initailStateLoadUser, action = {}) => {
    switch (action.type) {
        case LOAD_USER:
            return Object.assign({}, state, {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                entries: action.payload.entries,
                joined: action.payload.joined
            })
        default:
            return state;
    }
}

// for signin
const initialStateSignin = {
    signinEmail: '',
    signinPassword: '',
    isPending: false
}
export const changeSignin = (state = initialStateSignin, action = {}) => {
    switch (action.type) {
        case CHANGE_EMAIL:
            console.log('type', action.payload)
            return Object.assign({}, state, {
                signinEmail: action.payload
            });
        case CHANGE_PASSWORD:
            return Object.assign({}, state, {
                signinPassword: action.payload
            });
        default:
            return state;
    }
}

// for register
const initialStateRegister = {
    newEmail: '',
    newPassword: '',
    newName: ''
}
export const changeRegister = (state = initialStateRegister, action = {}) => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return Object.assign({}, state, {
                newEmail: action.payload
            });
        case CHANGE_PASSWORD:
            return Object.assign({}, state, {
                newPassword: action.payload
            });
        case CHANGE_NAME:
            return Object.assign({}, state, {
                newName: action.payload
            })
        default:
            return state;
    }
}

// for singin and register
const initialStateSubmitForm = {
    isPending: false,
    error: ''
}
export const submitForm = (state = initialStateSubmitForm, action = {}) => {
    switch (action.type) {
        case REQUEST_FORM_PENDING:
            return Object.assign({}, state, {
                isPending: true
            })
        case REQUEST_FORM_SUCCESS:
            return Object.assign({}, state, {
                isPending: false
            })
        case REQUEST_FORM_FAIL:
            return Object.assign({}, state, {
                isPending: false,
                error : action.payload
            })
        default:
            return state;
    }
}