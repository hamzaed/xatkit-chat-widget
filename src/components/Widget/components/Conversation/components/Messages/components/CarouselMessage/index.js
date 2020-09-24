import React, {Component} from 'react'
import {Carousel} from "primereact/carousel"
import PropTypes from "prop-types"
import ClampLines from 'react-clamp-lines';

import './styles.scss'


class CarouselMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.itemTemplate = this.itemTemplate.bind(this)

    }

    itemTemplate(item) {
        return (
          <div className="carousel-item-component">
              <div className="p-grid p-nogutter">
                  <div className="p-col-12">
              <img src={`${item.image}`} className="xatkit-card-image" />
                  </div>
              </div>
              <div className="p-col-12 xatkit-card-data">
                  <div className="xatkit-card-title">
                      <h4>Test</h4></div>

                      <ClampLines
                          text= "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum "
                          id="xatkit-card-description-id"
                          lines={2}
                          buttons={false}
                          ellipsis="..."
                          className="xatkit-card-description"
                          innerElement="p"
                      />
            </div>
          </div>
        );
    }

    render() {
        return (
            <div className="xatkit-carousel xatkit-response">

                <Carousel value={this.props.items} itemTemplate={this.itemTemplate} header={<h3>Header</h3>}>

                </Carousel>
            </div>
        )
    }


}

Carousel.propTypes = {
    items: PropTypes.array
}

export default CarouselMessage
