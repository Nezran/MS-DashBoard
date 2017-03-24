/**
 * Created by Stephane.MARTIGNIER on 23.03.2017.
 */
import React from 'react';
import Axios from 'axios';
import Chip from 'material-ui/Chip';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {green700, red500} from 'material-ui/styles/colors';

export default  class Project extends React.Component {

    state = {
        projectId: '',
        project: [],
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.setState({
            projectId: this.props.params.id
        }, () => {
            this.getDatas()
        });
    }

    getDatas = () => {
        Axios.defaults.baseURL = 'http://localhost:23000/api';

        Axios.get(`/projects/${this.state.projectId}`)
            .then(response => {
                this.setState({
                    project: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    setStatusChip(status, style) {

        if (status == "Open") {
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
        const styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            icons: {
                marginRight: 24,
            },
        };

        if (this.state.project.id != undefined) {
            return (
                <div className="home-page">
                    <Card>
                        <CardMedia>
                            <img src="https://www.feralinteractive.com/data/games/legolordoftherings/images/characters/main/gandalf.jpg" height={'100%'} />
                            {/*<img src="https://c1.staticflickr.com/4/3883/15374400311_8abe93652a_b.jpg" height={600} />*/}
                        </CardMedia>
                        <CardTitle title={this.state.project.title} subtitle={this.setStatusChip(this.state.project.status, styles.chip)} />
                        <CardText>
                            <hr />
                            <span style={styles.wrapper}>{this.state.project.tags.map(function(tag) {
                                return <Chip key={tag} style={styles.chip}>
                                    {tag}
                                </Chip>;
                            })}</span>
                            <hr />
                            {this.state.project.description}<br />
                            <b>Date de début :</b> {this.formatDate(this.state.project.startDate)}<br />
                            <b>Date de fin :</b> {this.formatDate(this.state.project.endDate)}<br />
                            <b>Prochaine echéance :</b> {this.formatDate(this.state.project.deadline)}<br />
                            <hr />
                            <b>Description du projet: </b><br />
                            <p style={styles.description}>{this.state.project.description}</p><br />
                            <hr />
                            <b>Responsable du projet:</b> {this.state.project.projectManager.firstname} {this.state.project.projectManager.lastname}<br />
                            <b>Nombre de participants:</b> {this.state.project.nbWorker}
                        </CardText>
                    </Card>
                </div>
            );
        }
        else {
            return (
                <div className="home-page">

                    <h1>Projet non trouvé</h1>

                </div>
            );
        }

    }
};