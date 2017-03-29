import React, { Component } from 'react';
import './TrainerCanvas.css'

class TrainerCanvas extends Component {

  drawImage(context, src, x, y) {
    var base_image = new Image();
    base_image.src = src;
    base_image.onload = function() {
      context.drawImage(base_image, x, y);
    }
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

  componentDidMount() {
    var ctx = this.context;
    ctx.save();

    this.drawGrid(ctx);
    this.drawImage(ctx, "img/blue.png",0,0);
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
