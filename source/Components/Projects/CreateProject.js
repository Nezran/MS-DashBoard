//////////////////////////////////////
// CreateProject component
// Modal for create a new project
/////////////////////////////////////

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {TextField, SelectField, MenuItem}from 'material-ui';
import Divider from 'material-ui/Divider';
import Axios from 'axios';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {grey100} from 'material-ui/styles/colors';
import Api from '../../Actions/Api';

export default class CreateProject extends React.Component {
    state = {
        status: null,
        startDate: null,
        endDate: null,
        deadline: null,
        tags: [],
        open: true,
        tagsValues: []
    };

    addTagField;

    componentWillReceiveProps() {
        this.setState({open: this.props.open});
    }

    componentDidMount() {
        this.setState({open: this.props.open});
        // Get all the existing tags
        Axios.get('http://localhost:23000/api/tags')
            .then((response) => {
                let tags = [];

                response.data.map(tag => {
                    tags.push(tag);
                });

                tags.sort();

                this.setState({
                    tags: tags
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleStatus = (event, index, value) => {
        this.setState({status: value});
    };

    handleSubmit = () => {

        this.props.handleLoader();

        if (document.getElementsByName('nbWorker')[0].value.length == -1) {
            console.log("vide");
        }

        Api.createProject(
            document.getElementsByName('title')[0].value,
            document.getElementsByName('description')[0].value,
            this.state.startDate,
            this.state.endDate,
            this.state.deadline,
            this.state.status,
            document.getElementsByName('nbWorker')[0].value,
            this.state.tagsValues
        ).then((r) => {
            this.props.handleLoader();
            this.props.handleClose();
            this.setState({open: false});
            this.props.handleChangement();
        }).catch((c) => {
            console.log("error create", c);
        });
    };

    handleClose = () => {
        this.props.handleClose;
        this.setState({open: false});
    };

    handleStartDate = (e, date) => {
        let startDate = new Date(date);
        this.setState({startDate: startDate});
    };

    handleEndDate = (e, date) => {
        let endDate = new Date(date);
        this.setState({endDate: endDate});
    };

    handleDeadline = (e, date) => {
        let deadline = new Date(date);
        this.setState({deadline: deadline});
    };

    handleTags = (e, index, value) => {
        let currentTags = this.state.tagsValues;
        let indexTag = currentTags.indexOf(value);

        // If in tags, remove it, if not add it
        if (indexTag != -1) {
            currentTags.splice(indexTag, 1);
        }
        else {
            currentTags.push(value);
        }

        this.setState({tagsValues: currentTags});
    };

    handleAddTag = () => {
        //Create a new tag
        let newTag = this.addTagField.input.value;
        let currentTags = this.state.tagsValues;
        let tags = this.state.tags;

        if (newTag != "") {
            tags.push(newTag);
            currentTags.push(newTag);
        }

        this.setState({tags: tags, tagsValues: currentTags}, (then) => {
            this.addTagField.input.value = "";
        });
    };

    render() {
        const actions = [
            <FlatButton
                label="Annuler !"
                primary={true}
                onTouchTap={this.handleClose}
            />,

            <FlatButton
                label="Créer !"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSubmit}
            />,
        ];

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

        let DateTimeFormat;

        /**
         * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
         */
        if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        }

        // Wait for the return of the call to the api for tags before generating view
        if (this.state.tags) {
            return (
                <div>
                    <Dialog
                        title="Créer un projet"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}
                    >
                        <form>
                            <TextField
                                name="title"
                                floatingLabelText="Titre"
                                type="text"
                                underlineShow={false}
                                floatingLabelFixed={true}

                            />
                            <Divider />
                            <SelectField
                                name="status"
                                floatingLabelText="Statut"
                                underlineShow={false}
                                floatingLabelFixed={true}
                                onChange={this.handleStatus}
                                ref="status"
                                value={this.state.status}
                            >
                                <MenuItem value={'Open'} primaryText="En cours"
                                          checked={this.state.status && this.state.status == "Open"}/>
                                <MenuItem value={'Close'} primaryText="Terminé"
                                          checked={this.state.status && this.state.status == "Close"}/>
                            </SelectField>
                            <Divider />
                            <DatePicker
                                ref="startDate"
                                name="startDate"
                                floatingLabelText="Date de début"
                                floatingLabelFixed={true}
                                underlineShow={false}
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
                                DateTimeFormat={DateTimeFormat}
                                locale="fr"
                                container="inline"
                                onChange={this.handleEndDate}
                            />
                            <Divider />
                            <DatePicker
                                ref="endDate"
                                name="endDate"
                                floatingLabelText="Date de fin"
                                floatingLabelFixed={true}
                                underlineShow={false}
                                DateTimeFormat={DateTimeFormat}
                                locale="fr"
                                container="inline"
                                onChange={this.handleDeadline}
                            />
                            <Divider />
                            <TextField
                                name="nbWorker"
                                floatingLabelText="Nombre de participants"
                                type="number"
                                underlineShow={false}
                                floatingLabelFixed={true}
                            />
                            <Divider />
                            <TextField
                                name="description"
                                floatingLabelText="Description"
                                type="text"
                                underlineShow={false}
                                floatingLabelFixed={true}
                            />
                            <Divider />
                            <SelectField
                                name="tags"
                                floatingLabelText="Tags"
                                multiple={true}
                                hintText="Selectionnez les tags"
                                underlineShow={false}
                                floatingLabelFixed={true}
                                onChange={this.handleTags}
                                value={this.state.tagsValues}
                            >
                                {
                                    this.state.tags.map((tag) => {
                                        return <MenuItem
                                            key={tag}
                                            insetChildren={true}
                                            value={tag}
                                            primaryText={tag}
                                            checked={this.state.tagsValues && this.state.tagsValues.includes(tag)}
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
                    </Dialog>
                </div>
            )
        }
        else {
            return null;
        }
    }
}