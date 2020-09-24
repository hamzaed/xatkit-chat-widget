import React, {Component} from 'react'
import {Card} from "primereact/card"
import PropTypes from "prop-types"
import ClampLines from 'react-clamp-lines';

import './styles.scss'


class CardMessage extends Component {
    constructor(props) {
        super(props);


    }


    render() {
        const header = this.props.image;
        const title = this.props.title
        const subTitle = this.props.subTitle
        const content = this.props.content &&  <ClampLines
            text= {this.props.content}
            id="xatkit-card-scription-id"
            lines={2}
            buttons={false}
            ellipsis="..."
            className="xatkit-card-description"
            innerElement="p"
        />
        return (
            <div className="xatkit-card-message xatkit-response p-component" >
                <div className="p-grid p-nogutter">
                    <div className="p-col-12">
                        <img alt="Card" src={`${header}`} className="xatkit-card-image"/>
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
        )
    }


}

CardMessage.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    content: PropTypes.string
}

export default CardMessage
