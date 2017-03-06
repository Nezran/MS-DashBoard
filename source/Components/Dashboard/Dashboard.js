import React from 'react';
import Axios from 'axios';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {green700, red500} from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';

export default  class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {projects: ''};
    }

    componentDidMount(){
        var self = this;
        Axios.defaults.baseURL = 'http://localhost:23000/api';
        Axios.get('/projects')
            .then(function (response) {
                self.setState({
                    projects: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    formatDeadline(deadline) {
        return new Date(deadline).toLocaleDateString();
    }

    setStatusChip(project, style) {

        if(project.status == "Open") {
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
            }
        };

        if(hasData) {
            return (
                <div className="home-page">
                    <h1>Dashboard</h1>
                    <span style={styles.wrapper}>
                        {this.state.projects.map((project) => {
                            return <Card key={project.id} style={styles.card}>
                                <CardHeader
                                    title={project.title}
                                    subtitle={'Fin le ' + this.formatDeadline(project.deadline)}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                />
                                <CardActions>
                                <span style={styles.wrapper}>
                                    {this.setStatusChip(project, styles.chip)}
                                    {project.tags.map(function(tag) {
                                        return <Chip key={tag} style={styles.chip}>
                                            {tag}
                                        </Chip>;
                                    })}
                                </span>
                                </CardActions>
                                <CardText expandable={true}>
                                    Responsable: {project.projectManager.lastname} {project.projectManager.firstname} <br />
                                    Participants : {project.nbWorker} <br />
                                    Description :  {project.description} <br />
                                </CardText>
                            </Card>
                        })}
                    </span>
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

        // return (
        //     {dashboardContent}
        // );
    }
};