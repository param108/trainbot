import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { setOptions, addObject, deleteObject, boardUpdated } from '../../actions'
import './TrainerCanvas.css'
import { DEBUGGING } from '../globals'

var objid = 1;
var objx = 0;
var objy = 0;

function idsSame (obj1,obj2) {
  if (obj1.id === obj2.id) {
      return true;
  }
  return false;
}

function idsCoordsSame (obj1,obj2) {
  if (obj1.id === obj2.id && obj1.x === obj2.x && obj1.y === obj2.y && obj1.src === obj2.src) {
      return true;
  }
  return false;
}

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
      optionsSet: false,
    };
    // This binding is necessary to make `this` work in the callback
    this.click = this.click.bind(this);
    this.clickMove = this.clickMove.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.drawIfRequired = this.drawIfRequired.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.setOptions = this.setOptions.bind(this);

  }

  componentDidMount() {
    var ctx = this.graphics_context;
    ctx.save();
    this.drawGrid(ctx);
    if (this.state.optionsSet === false) {
      this.setOptions();
      this.setState({optionsSet: true});
    }
  }

  drawIfRequired(v) {
    if (!v.hasOwnProperty('drawn')) {
      this.drawImage(this.graphics_context, v.src, v.x,v.y);
      v.drawn = true;
    } else {
      if (v.hasOwnProperty('moved') && v.moved === true) {
        v.moved = false;
        this.drawImage(this.graphics_context, v.src, v.x,v.y);
      }
    }
  }

  drawBox(ctx,v) {
    const {width, height} = ctx.canvas;

    ctx.moveTo(v.x, v.y);
    ctx.lineTo(v.x + width, v.y);
    ctx.stroke();
    ctx.moveTo(v.x, v.y + height);
    ctx.lineTo(v.x + width, v.y + height);
    ctx.stroke();
    ctx.moveTo(v.x, v.y);
    ctx.lineTo(v.x, v.y + height);
    ctx.stroke();
    ctx.moveTo(v.x + width, v.y);
    ctx.lineTo(v.x + width, v.y + height);
    ctx.stroke();
    ctx.restore();
  }

  deleteImage(v) {
    this.drawImage(this.graphics_context, "img/white.png", v.x,v.y);
    this.drawBox(this.graphics_context, v);
  }
  /*
   * Need this because the canvas should never update otherwise we will lose
   * the context
   */
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  calculateUpdates(newlist, origlist) {
    // the set of objects that do not have same id
    // so they must be the new ones
    var retObj = {}
    retObj.newObjects = _.differenceWith(newlist, origlist, idsSame);

    // the set of objects that differ in id or coords = new + moved
    // so new + moved - new = moved
    retObj.movedObjects = _.differenceWith(_.differenceWith(newlist, origlist, idsCoordsSame),retObj.newObjects, idsSame);
    retObj.oldMovedObjects = _.differenceWith(origlist,newlist,idsCoordsSame);
    retObj.deletedObjects = _.differenceWith(origlist, newlist, idsSame);
    retObj.oldObjects = _.differenceWith(origlist, _.concat(retObj.deletedObjects, retObj.movedObjects), idsSame)

    return retObj;
  }

  componentWillReceiveProps(nextProps) {
    const { board } = nextProps;

    if (!(board.dirty)) {
      return;
    }
    var  { newObjects, movedObjects, deletedObjects, oldObjects, oldMovedObjects } = this.calculateUpdates(board.objects, this.canvasState.objects);
    console.log("board", board.objects, "\ncanvas", this.canvasState.objects,"\nnew", newObjects, "\nmoved", movedObjects, "\ndeleted", deletedObjects);
    var newObjectList = JSON.parse(JSON.stringify(_.concat(oldObjects, newObjects, movedObjects)))
    _.forEach(_.intersectionWith(newObjectList,movedObjects,idsSame),(v) => { v.drawn = true; v.moved = true;});
    this.canvasState = {
      objects: newObjectList
    };
    if (this.context) {
      _.forEach(oldMovedObjects, this.deleteImage);
      _.forEach(newObjectList,this.drawIfRequired);
    }
    this.props.boardUpdated();
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

  clickMove() {
    objx+=parseInt(this.props.boxsize,10);
    if (objx >= this.props.width) {
      objy += parseInt(this.props.boxsize,10);
      objx = 0;
    }
    this.props.newObject({id: objid,x: objx, y: objy, src: "img/blue.png" });
  }

  clickDelete() {
    this.props.deleteObject({id: objid});
  }

  setOptions() {
    this.props.setOptions({options: [{ src: 'img/left.png',
                                      value: 'LEFT',
                                    },
                                    { src: 'img/right.png',
                                      value: 'RIGHT',
                                    },
                                    { src: 'img/up.png',
                                      value: 'UP',
                                    },
                                    { src: 'img/down.png',
                                      value: 'DOWN',
                                    }]});
  }

  render() {
    console.log("Render");
    return (
      <div className='codepane'>
        <div className="Canvas">
            <canvas id={this.props.name} className="CanvasPane" ref={(c) => this.graphics_context = c.getContext('2d')} width={this.props.width} height={this.props.height} />
        </div>
        <div>
          {(() => { if (DEBUGGING) { return (
            <div>
            <button onClick={this.click}>New Object</button>
            <button onClick={this.clickMove}>Move Object</button>
            <button onClick={this.clickDelete}>Delete Object</button>
            <button onClick={this.setOptions}>Set Options</button>
            </div>
          );}})()}
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
    newObject: (obj)=>{dispatch(addObject(obj));},
    deleteObject: (obj)=>{dispatch(deleteObject(obj));},
    boardUpdated: ()=>{dispatch(boardUpdated());},
    setOptions: (obj)=> {dispatch(setOptions(obj));}
  };
}

module.exports = connect(select, actions)(TrainerCanvas);
