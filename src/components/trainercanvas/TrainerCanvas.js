import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { addNewObject } from '../../actions'
import './TrainerCanvas.css'

var objid = 1;
var objx = 0;
var objy = 0;

class TrainerCanvas extends Component {
  canvasState = {
    objects: []
  }

  drawImage(ctx, src, x, y) {
    var base_image = new Image();
    base_image.src = src;
    base_image.onload = function() {
      ctx.drawImage(base_image, x, y);
      ctx.restore();
    };
    return base_image;
  }

  drawGrid(ctx) {
    const {width, height} = ctx.canvas;
    ctx.beginPath();
    var i = 0;
    var boxsize = parseInt(this.props.boxsize,10);
    for (i = boxsize; i < width; i += boxsize) {
      ctx.moveTo(i,0)
      ctx.lineTo(i,height)
      ctx.stroke()
    }
    for (i = boxsize; i < height; i += boxsize) {
      ctx.moveTo(0,i)
      ctx.lineTo(width,i)
      ctx.stroke()
    }
    ctx.restore();
  }

  constructor(props) {
    super(props);
    this.state = {
      objects: [],
    };
    // This binding is necessary to make `this` work in the callback
    this.click = this.click.bind(this);
    this.drawIfRequired = this.drawIfRequired.bind(this);
  }

  componentDidMount() {
    var ctx = this.graphics_context;
    ctx.save();
    this.drawGrid(ctx);
  }

  drawIfRequired(v) {
    if (!v.hasOwnProperty('drawn')) {
      v.img = this.drawImage(this.graphics_context, v.src, v.x,v.y);
      v.drawn = true;
      this.graphics_context.restore();
    }
  }

  /*
   * Need this because the canvas should never update otherwise we will lose
   * the context
   */
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    const { board } = nextProps;

    if (!(board.dirty)) {
      return;
    }
    var newObjects = _.union(board.objects, this.canvasState, (obj1,obj2) => {
      if (obj1.id === obj2.id) {
          return true;
      }
      return false;
    });
    this.canvasState = {
      objects: newObjects
    };
    if (this.context) {
      _.forEach(newObjects,this.drawIfRequired);
    }
  }

  click() {
    objid++;
    objx+=parseInt(this.props.boxsize,10);
    if (objx >= this.props.width) {
      objy += parseInt(this.props.boxsize,10);
      objx = 0;
    }
    this.props.newObject({id: objid,x: objx, y: objy, src: "img/blue.png" });
  }

  render() {
    console.log("Render");
    return (
      <div>
        <div className="Canvas">
            <canvas id={this.props.name} className="CanvasPane" ref={(c) => this.graphics_context = c.getContext('2d')} width={this.props.width} height={this.props.height} />
        </div>
        <div>
          <button onClick={this.click}>New Object</button>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    board: state.board,
    messages: state.messages,
    moves: state.moves
  };
}

function actions(dispatch) {
  return {
    newObject: (obj)=>{dispatch(addNewObject(obj));}
  };
}

module.exports = connect(select, actions)(TrainerCanvas);
