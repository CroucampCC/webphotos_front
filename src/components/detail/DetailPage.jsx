import React from 'react';

class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            product: JSON.parse(localStorage.getItem('currentPhotos'))
        };
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Photo: {this.state.photos.name}</h1>
                <h1 className="display-4">Photo Id: {this.state.id}</h1>
            </div>
        );
    }

}

export {DetailPage};