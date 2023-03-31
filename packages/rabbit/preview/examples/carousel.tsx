import React from 'react'
import { Carousel } from '../../../rabbit/src'

export default function ExampleCarousel() {
  const style = {
    width: 250,
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aqua',
  }

  return (
    <div>
      <Carousel>
        <div>
          <div style={style} >1</div>
        </div>
        <div>
          <div style={style} >2</div>
        </div>
        <div>
          <div style={style} >3</div>
        </div>
        <div>
          <div style={style} >4</div>
        </div>
        <div>
          <div style={style} >5</div>
        </div>
        <div>
          <div style={style} >6</div>
        </div>
        <div>
          <div style={style} >7</div>
        </div>
        <div>
          <div style={style} >8</div>
        </div>
        <div>
          <div style={style} >9</div>
        </div>
        <div>
          <div style={style} >10</div>
        </div>
        <div>
          <div style={style} >11</div>
        </div>
        <div>
          <div style={style} >12</div>
        </div>
      </Carousel>
      <br />
      <Carousel
        slidesToRows={2}
        slidesToColumns={2}
        duration={0}
      >
        <div>
          <div style={style} >1</div>
        </div>
        <div>
          <div style={style} >2</div>
        </div>
        <div>
          <div style={style} >3</div>
        </div>
        <div>
          <div style={style} >4</div>
        </div>
        <div>
          <div style={style} >5</div>
        </div>
        <div>
          <div style={style} >6</div>
        </div>
        <div>
          <div style={style} >7</div>
        </div>
        <div>
          <div style={style} >8</div>
        </div>
        <div>
          <div style={style} >9</div>
        </div>
        <div>
          <div style={style} >10</div>
        </div>
        <div>
          <div style={style} >11</div>
        </div>
        <div>
          <div style={style} >12</div>
        </div>
      </Carousel>
      <br />
      <Carousel
        slidesToRows={2}
        slidesToColumns={2}
        effect='fade'
      >
        <div>
          <div style={style} >1</div>
        </div>
        <div>
          <div style={style} >2</div>
        </div>
        <div>
          <div style={style} >3</div>
        </div>
        <div>
          <div style={style} >4</div>
        </div>
        <div>
          <div style={style} >5</div>
        </div>
        <div>
          <div style={style} >6</div>
        </div>
        <div>
          <div style={style} >7</div>
        </div>
        <div>
          <div style={style} >8</div>
        </div>
        <div>
          <div style={style} >9</div>
        </div>
        <div>
          <div style={style} >10</div>
        </div>
        <div>
          <div style={style} >11</div>
        </div>
        <div>
          <div style={style} >12</div>
        </div>
      </Carousel>
    </div>
  )
}