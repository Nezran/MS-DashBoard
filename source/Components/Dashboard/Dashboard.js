//////////////////////////////////////
// Dashboard component
// Home page of the application
// Display all the projects and some charts
/////////////////////////////////////

import React from 'react';
import {Link} from 'react-router';
import Axios from 'axios';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {green700, red500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import SearchBar from './../SearchBar/SearchBar';
import TrelloComponent from '../TrelloComponent/TrelloComponent';
import Charts from '../Charts/Charts';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: '',
            displayedProjects: '',
            trelloProjects: [],
        };
    }

    componentDidMount() {
        Axios.defaults.baseURL = 'http://localhost:23000/api';
        Axios.get('/projects')
            .then(response => {
                this.setState({
                    projects: response.data,
                    displayedProjects: response.data
                })
            })
            .catch((e) => {
                console.log(e);
            });
    }

    getTrelloProjects = (data) => {
        this.setState({trelloProjects: data});

    }

    displaySearchedProject(projects) {
        this.setState({
            displayedProjects: projects
        })
    }

    formatDeadline(deadline) {
        return new Date(deadline).toLocaleDateString();
    }

    setStatusChip(project, style) {

        if (project.status == "Open") {
            return <Chip backgroundColor={green700} style={style}>
                En cours
            </Chip>;
        } else {
            return <Chip backgroundColor={red500} style={style}>
                Terminé
            </Chip>;
        }
    }

    render() {
        const hasData = this.state.projects[0] ? true : false;
        const styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            card: {
                width: 500,
                margin: 4,
            },
            icons: {
                marginRight: 24,
            },
            button: {
                margin: 12
            }
        };

        if (hasData) {
            return (
                <div className="home-page">
                    <SearchBar projects={this.state.projects}
                               displaySearchedProject={this.displaySearchedProject.bind(this)}/>
                    <h1>Dashboard</h1>
                    <Charts projects={this.state.projects} trelloProjects={this.state.trelloProjects}/>
                    <h3>{this.state.displayedProjects.length > 0 ? "Il y a " + this.state.displayedProjects.length + " projet(s)" : "Il n'y a aucun projet"}</h3>
                    <span style={styles.wrapper}>
                        {this.state.displayedProjects.map((project) => {
                            return <Card key={project.id} style={styles.card}>
                                <CardHeader
                                    title={project.title}
                                    subtitle={'Fin le ' + this.formatDeadline(project.endDate)}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                />
                                <CardActions>
                                <span style={styles.wrapper}>
                                    {this.setStatusChip(project, styles.chip)}
                                    {project.tags.map(function (tag) {
                                        return <Chip key={tag} style={styles.chip}>
                                            {tag}
                                        </Chip>;
                                    })}
                                </span>
                                </CardActions>
                                <CardText expandable={true}>
                                    Date de début : {this.formatDeadline(project.startDate)}<br />
                                    Prochaine echéance : {this.formatDeadline(project.deadline)}<br />
                                    Date de fin : {this.formatDeadline(project.endDate)}<br />
                                    Responsable: {project.projectManager.lastname} {project.projectManager.firstname}
                                    <br />
                                    Participants : {project.nbWorker} <br />
                                    Description : {project.description} <br />
                                    <Link to={`/projects/${project.id}`}><RaisedButton label="Détails"
                                                                                       style={styles.button}/></Link>
                                </CardText>
                            </Card>
                        })}
                    </span>
                    <TrelloComponent getTrelloProjects={this.getTrelloProjects}/>
                </div>
            );
        }
        else {
            return (
                <div className="home-page">
                    <h1>Dashboard</h1>
                    <h3>Erreur</h3>
                    <p>
                        Pas de données. Veuillez recharger la page.
                    </p>
                </div>
            );
        }
    }
};
