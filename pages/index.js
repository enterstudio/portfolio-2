import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import Link from 'next/link'
import { fadeInFwd, fadeInUp } from '../components/animations'

const previews = {
  retail: '/static/retail-preview.jpg',
  dotcom: '/static/dotcom-preview.jpg',
  eqx: '/static/eqx-preview.jpg'
}

class HomePage extends Component {
  state = {
    swapped: false,
    overlay: ''
  }

  componentWillMount() {
    // preload images for hover effect
    Object.keys(previews).map(p => {
      let img = new Image()
      img.onload = console.log(`${p} loaded`)
      img.src = previews[p]
    })
  }

  swap = img => {
    console.log(`hi ${img}`)
    this.setState({
      swapped: true,
      overlay: img
    })
  }

  reset = () => {
    this.setState({
      swapped: false,
      overlay: ''
    })
  }

  render() {
    const eqxLink = (
      <Link href="#">
        <a
          onMouseEnter={() => this.swap(previews.eqx)}
          onMouseLeave={this.reset}
          children="personal training app"
          className="disabled"
        />
      </Link>
    )

    const retailLink = (
      <Link href="/project/samsung-retail">
        <a
          onMouseEnter={() => this.swap(previews.retail)}
          onMouseLeave={this.reset}
          children="retail experience"
        />
      </Link>
    )

    const dotcomLink = (
      <Link href="/project/samsung-dotcom">
        <a
          onMouseEnter={() => this.swap(previews.dotcom)}
          onMouseLeave={this.reset}
          children="ecommerce website"
        />
      </Link>
    )
    return (
      <Main>
        <Text>
          <p>John Meguerian is a product designer and developer in NYC.</p>
          <p>
            He’s recently made a {eqxLink} for Equinox and an interactive{' '}
            {retailLink} and {dotcomLink} for Samsung.
          </p>

          <p>
            He also works on development projects like{' '}
            <a href="https://github.com/jmegs/static-starter" className="out">
              Static Starter
            </a>,{' '}
            <a href="https://codepen.io/collection/XRKYmK/" className="out">
              CSS Posters
            </a>, and his{' '}
            <a href="https://github.com/jmegs/portfolio" className="out">
              personal website
            </a>.
          </p>

          <p>
            Find out more about him, check out more work on{' '}
            <a href="https://dribbble.com/jmegs" className="out">
              dribbble
            </a>{' '}
            and{' '}
            <a href="https://github.com/jmegs" className="out">
              github
            </a>, or say hi on{' '}
            <a href="https://twitter.com/jmegs" className="out">
              twitter
            </a>{' '}
            or{' '}
            <a href="https://instagram.com/jmegs_" className="out">
              instagram
            </a>.
          </p>
        </Text>
        <PhotoWrap>
          {this.state.swapped && (
            <OverlayImage src={this.state.overlay} alt="" />
          )}
          <BaseImage
            src="/static/john.jpg"
            alt="Photo of John"
            fade={this.state.swapped}
          />
        </PhotoWrap>
      </Main>
    )
  }
}

export default HomePage

const Main = styled.main`
  padding: 8.888888889vh 8.333333333vw;
  display: grid;
  grid-template-columns: 100%;
  grid-column-gap: 3vmax;

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
`
const Text = styled.article`
  font-family: halyard-text, system-ui;
  font-size: 4.8vw;
  line-height: 1.5;
  align-self: center;
  ${fadeInUp(600)};

  a {
    // do something cooler
    color: inherit;
  }

  a.disabled {
    cursor: not-allowed;
    text-decoration: none;
    border-bottom: 1px #0d0d0d dotted;
  }

  a.out {
    cursor: alias;
  }

  p {
    margin-bottom: 20px;
  }

  @media (min-width: 960px) {
    font-size: 1.8vw;
    max-width: 27.77777778vw;

    p {
      margin-bottom: 2.2222222vh;
    }
  }
`

const PhotoWrap = styled.div`
  align-self: center;
  display: grid;
  grid-template: 100% / 100%;
  ${fadeInUp(800)};
`

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`

const BaseImage = Image.extend`
  height: 80vh;
  object-position: center top;
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  opacity: ${props => (props.fade ? 0.2 : 1)};
  transition: opacity 125ms ease;
`

const OverlayImage = Image.extend`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  z-index: 2;
  align-self: center;
  justify-self: center;
  width: 128%;
`
