import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

class MovesList extends Component {
  componentDidMount() {

  }

  constructor(props) {
    super(props);
    let {options}= props;
    if (options == null) {
	options = [];
    }
    this.state = {
      options: options,
      moves: [],
      playing: false,
      move_index: 1
    };
  }
  componentWillReceiveProps(nextProps) {
    var { options } = nextProps;
    console.log('options',options);
    this.setState({options: options.options});
  }

  imageClick(value) {
    console.log(value);
  }

  deleteClick(value) {

  }

  render() {
    console.log(this.state);
    var isPlaying = this.state.playing;
    var moveIndex = this.state.move_index;
    var OPTIONS = _.map(this.state.options,
      (v,k) => {
        return (
          <img key={k} src={v.src} onClick={this.imageClick.bind(this, v.value)} alt=''/>
        );
      }
    );
    var MOVES = _.map(this.state.moves,
      (v,k) => {
        return (
          <div>
            <span>{k}.<img key={k} src={v.src} alt=''/>
              {
                (()=>{
                  if (isPlaying) {
                    if (moveIndex === k) {
                      return (<img key={k} src='img/arrow.png' alt=''/>);
                    }
                  } else {
                    return (
                      <img key={k} src='img/delete.png' onClick={this.deleteClick.bind(this, v.id)} alt=''/>
                    );
                  }
                })()
              }
            </span>
          </div>
        );
      });

    return (
      <div className='codepane'>
      <div>
        {OPTIONS}
      </div>
      <div>
        {MOVES}
      </div>
      </div>
    );
  }
}


function select(state) {
  return {
    moves: state.moves,
    options: state.options
  };
}

function actions(dispatch) {
  return {};
}

module.exports = connect(select, actions)(MovesList);
