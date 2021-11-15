import React from 'react';
import UserService from '../../services/user.service';
import {User} from '../../models/user';

import {Events} from "../../models/events";

class HomePage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            photos: [],
            errorMessage: '',
            infoMessage: '',
            currentUser: new User(),
        };
    }

    componentDidMount() {
        UserService.currentUser.subscribe(data =>{
            this.setState({
                currentUser: data
            })
        });

        this.setState({
            photos:{loading: true}
        });

        UserService.findAllPhotos()
            .then(photos => {
            this.setState({photos: photos.data});
        });
    }

    uploadPhotos(photos) {
        if(!this.state.currentUser){
            this.setState({errorMessage: "You should sign in to purchase a product"});
            return;
        }

        var events = new Events(this.state.currentUser, photos);
        UserService.uploadPhotos(events)
            .then(data => {
                this.setState({infoMessage: "Mission is completed."});
            },error => {
                this.setState({errorMessage: "Unexpected error occurred."});
            });
    }

    detail(photos) {
        localStorage.setItem('currentPhotos', JSON.stringify(photos));
        this.props.history.push('/detail/'+photos.id);
    }

    render() {
        const {photos, infoMessage, errorMessage} = this.state;
        return (
            <div className="col-md-12">
                {infoMessage &&
                <div className="alert alert-success">
                    <strong>Successful! </strong> {infoMessage}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                }
                {errorMessage &&
                <div className="alert alert-danger">
                    <strong>Error! </strong> {errorMessage}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                }
                {photos.loading && <em> Loading products...</em>}
                {photos.length &&
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Url</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {photos.map((photos, index) =>
                        <tr key={photos.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{photos.name}</td>
                            <td>{photos.url}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => this.detail(photos)}>Description</button>
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => this.uploadPhotos(photos)}>Upload</button>
                            </td>
                        </tr>
                    )
                    }
                    </tbody>
                </table>
                }
            </div>
        );
    }

}

export {HomePage};
