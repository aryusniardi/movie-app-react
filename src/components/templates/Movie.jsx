import React, {Component} from 'react';
import Title from './Title';
export default class Movie extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container text-center">
                    <Title title="Movie"></Title>
                </div>
            </React.Fragment>
        )
    }
}