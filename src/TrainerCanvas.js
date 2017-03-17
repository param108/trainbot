import React, { Component } from 'react';
import './TrainerCanvas.css'

class TrainerCanvas extends Component {
  componentDidMount() {
    var ctx = this.context;
    const {width, height} = ctx.canvas;
    ctx.save();
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
  render() {
    return (
      <div className="Canvas">
          <canvas id={this.props.name} className="CanvasPane" ref={(c) => this.context = c.getContext('2d')} width={this.props.width} height={this.props.height} />
      </div>
    );
  }
}

export default TrainerCanvas;
