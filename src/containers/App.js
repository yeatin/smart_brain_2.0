import React, { Component } from 'react';
import { connect } from 'react-redux';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import './App.css';
import { setInput, setImg, setCalculation, setRoute, setUser } from '../actions';

const mapStateToProps = (state) => {
  return {
    input: state.setImgUrl.input,
    imageUrl: state.changeImgUrl.imageUrl,
    boxes: state.searchImgBoxes.boxes,
    route: state.changeRoute.route,
    isSignedIn: state.changeRoute.isSignedIn,
    user: {
      id: state.changeUser.id,
      name: state.changeUser.name,
      email: state.changeUser.email,
      entries: state.searchImgCount.entries > state.changeUser.entries
        ? state.searchImgCount.entries
        : state.changeUser.entries,
      joined: state.changeUser.joined
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (event) => dispatch(setInput(event.target.value)),
    onButtonSubmit: () => dispatch(setImg()),
    calculateFaceLocation: (data) => dispatch(setCalculation(data)),
    onRouteChange: (route) => dispatch(setRoute(route)),
    loadUser: (user) => dispatch(setUser(user))
  }
}

const ParticlesSetting = {

  particles: {
    collisions: {
      enable: true,
    },
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        speed: 3,
        size_min: 0.3
      }
    },
    move: {
      random: true,
      speed: 1,
      direction: "none",
      out_mode: "out"
    }
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: "push"
      },
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
}

class App extends Component {

  render() {
    const { imageUrl, boxes, route, isSignedIn, user, onInputChange, onButtonSubmit, onRouteChange } = this.props;
    return (
      <div className="App">
        <Particles className='particles' params={ParticlesSetting} />
        {
          route === 'home'
            ? <div>
              <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
              <Logo />
              <Rank name={user.name} entries={user.entries} boxes={boxes} />
              <ImageLinkForm
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit} />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
            : (
              route === 'signin'
                ? <div>
                  <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
                  <SignIn />
                </div>
                : <div>
                  <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
                  <Register />
                </div>
            )
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
