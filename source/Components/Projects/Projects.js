/**
 * Created by Stephane.MARTIGNIER on 17.03.2017.
 */
import React from 'react';
import AuthorizeComponent from '../Authorize/Authorize';
import Axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CardProjectActions from './CardProjectActions';
import CreateProject from './CreateProject';

export default  class Projects extends AuthorizeComponent {

    componentDidMount() {
        this.getDatas();
    }

    state={
        create:'',
        projects: [],
        open:false,
    };

    getDatas = () => {
        Axios.defaults.baseURL = 'http://localhost:23000/api';
        Axios.get('/projects')
            .then(response => {
                // Get only the projects where the project manager is the current user

                // Get the id of the current user
                let idUser = localStorage.getItem("id");

                let allProjects = response.data;
                let projects = [];

                allProjects.map(project => {
                    if(project.projectManager.id == idUser) {
                        projects.push(project);
                    }
                });

                this.setState({
                    projects: projects
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChangement = () => {
        console.log("call refresh");
        this.getDatas();
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false}, () =>{ });
    };

    render() {

        const iconStyles = {
            marginRight: 24,
        };


        const cardProject =
            this.state.projects.map(project => {
                return <CardProjectActions handleLoader={this.props.handleLoader} handleChangement={this.handleChangement} key={project.id} {...project}/>;
            });

        if(this.state.projects.length > 0) {
            return (
                <div className="home-page">

                    {console.log("open",this.state.open)}

                    <h1>Gestion des projets</h1>

                    {this.state.create}
                    {this.state.open ? <CreateProject  handleLoader={this.props.handleLoader}  handleChangement={this.handleChangement} open={this.state.open} handleClose={this.handleClose}/> : ""}
                    <RaisedButton label="Créer un projet" onTouchTap={this.handleOpen} primary={true}/>
                    {cardProject}

                </div>
            );
        }
        else {
            return (
                <div className="home-page">

                    {console.log("open",this.state.open)}

                    <h1>Gestion des projets</h1>

                    <RaisedButton label="Créer un projet" onTouchTap={this.handleOpen} primary={true}/>

                    {cardProject}

                </div>
            );
        }

    }
};