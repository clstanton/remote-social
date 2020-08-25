import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
// import SaveButton from './Buttons/SaveButton';
import DeleteButton from './Buttons/DeleteButton';

export class Toggle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        };
    };

    Toggle = () => {
        this.setState((currentState) => ({
            clicked: !currentState.clicked, 
        }));
    }
    
    render()     
    {
        const movie = this.props.movie;

        return (
            <div>
                <Card key={movie.movieId} md={12}  onClick={this.Toggle}>
                    {!this.state.clicked &&
                    <Card.Img src={movie.image} alt={`The cover for ${movie.name}`}  />
                    }
                    {this.state.clicked && 
                    <Card.Body>
                    <Card.Title>{movie.name}</Card.Title>
                    <p className='small'>Rating: {movie.vote} </p>
                    <p className='small'>Release Date: {movie.release} </p>
                    <div className="scrollbar overflow-auto movie-description">
                        <p className='small card-text'>Overview: {movie.overview} </p>
                    </div>
                    <Card.Text>{movie.description}</Card.Text>
                    {/* need to fix the delete/send to next component */}
                    <DeleteButton />
                    </Card.Body>
                    }
                </Card>
            </div>
        )
    }
}

export default Toggle;
