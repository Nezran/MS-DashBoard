//////////////////////////////////////
// CardProjectActions component
// Display a project in project management view
/////////////////////////////////////

import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {TextField, SelectField, MenuItem}from 'material-ui';
import Divider from 'material-ui/Divider';
import Axios from 'axios';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import Api from '../../Actions/Api';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {grey100} from 'material-ui/styles/colors';

export default class CardProjectActions extends React.Component {

    state = {
        expanded: false,
        picture: "",
        open: false,
        values: [],
    };

    addTagField;

    componentDidMount() {

        Axios.get('https://randomuser.me/api/?format=json&inc=picture&lego')
            .then((response) => {

                this.setState({
                    picture: response.data.results[0].picture.thumbnail
                })
            })
            .catch((error) => {
                console.log(error);
            });

        // Get all the existing tags
        Axios.get('http://localhost:23000/api/tags')
            .then((response) => {
                let tags = [];

                response.data.map(tag => {
                    tags.push(tag);
                });

                tags.sort();

                this.setState({
                    allTags: tags
                })
            })
            .catch((error) => {
                console.log(error);
            });

        // Put project values in state
        this.setState({
            id: this.props.id,
            title: this.props.title,
            status: this.props.status,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            deadline: this.props.deadline,
            projectTags: this.props.tags,
            nbWorker: this.props.nbWorker,
            description: this.props.description,
            projectManager: this.props.projectManager
        });

    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleExpand = () => {
        this.setState({expanded: this.state.expanded ? false : true});
    };

    handleSubmit = () => {

    };

    handleDelete = () => {
        Api.deleteProject(this.state.id);
        this.props.handleChangement();

    };

    callApi = () => {

        Api.updateProject(
            this.state.id,
            this.state.title,
            this.state.description,
            this.state.startDate,
            this.state.endDate,
            this.state.deadline,
            this.state.status,
            this.state.nbWorker,
            this.state.projectTags,
            this.state.projectManager.id,
            this.state.projectManager.username,
            this.state.projectManager.firstname,
            this.state.projectManager.lastname,
            this.state.projectManager.email,
            this.state.projectManager.password,
        ).then((r) => {
        }).catch((c) => {
            console.log("error create", c);
        });

    };

    handleTitle = (e) => {
        this.setState({title: e.target.value}, (then) => {
                this.callApi();
            }
        );
    };

    handleStatus = (e, index, value) => {
        this.setState({status: value}, (then) => {
                this.callApi();
            }
        );
    };

    handleStartDate = (e, date) => {
        this.setState({startDate: date}, (then) => {
                this.callApi();
            }
        );
    };

    handleEndDate = (e, date) => {
        this.setState({endDate: date}, (then) => {
                this.callApi();
            }
        );
    };

    handleDeadline = (e, date) => {
        this.setState({deadline: date}, (then) => {
                this.callApi();
            }
        );
    };

    handleNbWorker = (e) => {
        this.setState({nbWorker: e.target.value}, (then) => {
                this.callApi();
            }
        );
    };

    handleDescription = (e) => {
        this.setState({description: e.target.value}, (then) => {
                this.callApi();
            }
        );
    };

    handleTags = (e, index, value) => {
        let tags = this.state.projectTags;
        let indexTag = tags.indexOf(value);
        // If in tags, remove it, if not add it
        if (indexTag != -1) {
            tags.splice(indexTag, 1);
        }
        else {
            tags.push(value);
        }

        this.setState({projectTags: tags}, (then) => {
                this.callApi();
            }
        );
    };

    handleAddTag = () => {
        //Create a new tag
        let newTag = this.addTagField.input.value;
        let projectTags = this.state.projectTags;
        let allTags = this.state.allTags;

        if (newTag != "") {
            projectTags.push(newTag);
            allTags.push(newTag);
        }

        this.setState({projectTags: projectTags, allTags: allTags}, (then) => {
                this.callApi();
                this.addTagField.input.value = "";
            }
        );
    };

    formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    render() {
        const cardStyles = {
            margin: 20,
        };

        const styles = {
            toolbar: {
                width: 600,
                backgroundColor: grey100,
            },
            toolbarButton: {
                height: 30,
                marginTop: 10
            },
            marginLeft: {
                marginLeft: 4,
            },
        };

        const actions = [
            <FlatButton
                label="Non !"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Oui !"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleDelete}
            />,
        ];

        let DateTimeFormat;

        /**
         * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
         */
        if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        }

        // Wait for the return of the call to the api for tags before generating view
        if (this.state.allTags) {
            return (

                <div>

                    <div key={this.state.id} style={cardStyles}>
                        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                            <CardHeader
                                title={this.state.title}
                                subtitle={'Fin le ' + this.formatDate(this.state.endDate)}
                                actAsExpander={true}
                                showExpandableButton={true}
                                avatar={this.state.picture}
                            />
                            <CardText expandable={true}>


                                <form onSubmit={this.handleSubmit}>
                                    <TextField
                                        name="title"
                                        floatingLabelText="Titre"
                                        type="text"
                                        defaultValue={this.state.title}
                                        underlineShow={false}
                                        floatingLabelFixed={true}
                                        onChange={this.handleTitle}

                                    />
                                    <Divider />
                                    <SelectField
                                        name="status"
                                        floatingLabelText="Statut"
                                        value={this.state.status}
                                        underlineShow={false}
                                        floatingLabelFixed={true}
                                        onChange={this.handleStatus}
                                        ref="status"
                                    >
                                        <MenuItem value={'Open'} primaryText="En cours"
                                                  checked={this.state.status == "Open"}/>
                                        <MenuItem value={'Close'} primaryText="Terminé"
                                                  checked={this.state.status == "Close"}/>
                                    </SelectField>
                                    <Divider />
                                    <DatePicker
                                        ref="startDate"
                                        name="startDate"
                                        floatingLabelText="Date de début"
                                        floatingLabelFixed={true}
                                        underlineShow={false}
                                        value={new Date(this.state.startDate)}
                                        DateTimeFormat={DateTimeFormat}
                                        locale="fr"
                                        container="inline"
                                        onChange={this.handleStartDate}
                                    />
                                    <Divider />
                                    <DatePicker
                                        ref="deadline"
                                        name="deadline"
                                        floatingLabelText="Prochaine écheance"
                                        floatingLabelFixed={true}
                                        underlineShow={false}
                                        value={new Date(this.state.deadline)}
                                        DateTimeFormat={DateTimeFormat}
                                        locale="fr"
                                        container="inline"
                                        onChange={this.handleDeadline}
                                    />
                                    <Divider />
                                    <DatePicker
                                        ref="endDate"
                                        name="endDate"
                                        floatingLabelText="Date de fin"
                                        floatingLabelFixed={true}
                                        underlineShow={false}
                                        value={new Date(this.state.endDate)}
                                        DateTimeFormat={DateTimeFormat}
                                        locale="fr"
                                        container="inline"
                                        onChange={this.handleEndDate}
                                    />
                                    <Divider />
                                    <TextField
                                        name="nbWorker"
                                        floatingLabelText="Nombre de participants"
                                        type="number"
                                        defaultValue={this.state.nbWorker}
                                        underlineShow={false}
                                        floatingLabelFixed={true}
                                        onChange={this.handleNbWorker}

                                    />
                                    <Divider />
                                    <TextField
                                        name="description"
                                        floatingLabelText="Description"
                                        type="text"
                                        defaultValue={this.state.description}
                                        underlineShow={false}
                                        floatingLabelFixed={true}
                                        onChange={this.handleDescription}

                                    />
                                    <Divider />
                                    <SelectField
                                        name="tags"
                                        floatingLabelText="Tags"
                                        multiple={true}
                                        hintText="Selectionnez les tags"
                                        value={this.state.projectTags}
                                        underlineShow={false}
                                        floatingLabelFixed={true}
                                        onChange={this.handleTags}
                                    >
                                        {
                                            this.state.allTags.map((tag) => {
                                                return <MenuItem
                                                    key={tag}
                                                    insetChildren={true}
                                                    checked={this.state.projectTags && this.state.projectTags.includes(tag)}
                                                    value={tag}
                                                    primaryText={tag}
                                                />
                                            })

                                        }
                                    </SelectField>
                                    <Divider />
                                    <Toolbar style={styles.toolbar}>
                                        <ToolbarTitle text="Créez un tag"/>
                                        <TextField id="newTag" ref={input => this.addTagField = input}/>
                                        <RaisedButton label="Ajouter" primary={true} style={styles.toolbarButton}
                                                      onClick={this.handleAddTag}/>
                                    </Toolbar>
                                </form>

                            </CardText>
                            <CardActions>
                                <FlatButton label={this.state.expanded ? "Fermer" : "Modifier"}
                                            onTouchTap={this.handleExpand}/>
                                <FlatButton label="Supprimer" onTouchTap={this.handleOpen}
                                            disabled={this.state.expanded ? true : false} secondary={true}/>
                            </CardActions>

                        </Card>
                        <Dialog
                            title="Voulez vous vraiment supprimer ce projet ?"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                            Définitif
                        </Dialog>
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}