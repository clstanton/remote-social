import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';

export class Toggle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        };
    };

    Toggle = () => {
        console.log('122ej3bejkbfroivhervr WOEKING WORKING');
        this.setState((currentState) => ({
            clicked: !currentState.clicked, 
        }));
    }
    
    render()     
    {
        const movie = this.props.movie;

        return (
            <div>
                <Card key={movie.movieId} md={12} border='dark' onClick={this.Toggle}>
                    {!this.state.clicked &&
                    <Card.Img src={movie.image} alt={`The cover for ${movie.name}`} variant='top' />
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
                    <Button className='btn-block btn-danger' >
                        Delete this Movie!
                    </Button>
                    </Card.Body>
                    }
                </Card>
            </div>
        )
    }
}

export default Toggle;
