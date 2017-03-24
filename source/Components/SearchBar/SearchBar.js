//////////////////////////////////////
// Searchbar component
// Search and filter the projects
/////////////////////////////////////

import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import areIntlLocalesSupported from 'intl-locales-supported';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {green300, red300} from 'material-ui/styles/colors';

export default  class SearchBar extends React.Component {
    nameField;

    constructor(props) {
        super(props);

        let tags = [];
        let tempTags = [];

        this.props.projects.forEach((project) => {
            project.tags.forEach((tag) => {
                tempTags.push(tag);
            });
        });

        tempTags = Array.from(new Set(tempTags));

        tempTags.sort();

        tempTags.forEach((tempTechno) => {
            let techno = {
                "name": tempTechno,
                "clicked": false
            };

            tags.push(techno);
        });

        this.state = {
            status: 'All',
            tags: tags,
            date: null
        };
    }

    handleStatusChange = (event, index, value) => {
        this.setState({
            status: value
        }, (e) => {
            this.searchProject();
        });
    };


    handleTouchTap = (index) => {

        let tags = this.state.tags;

        tags[index].clicked ? tags[index].clicked = false : tags[index].clicked = true;

        this.setState({
            tags: tags
        }, (e) => {
            this.searchProject();
        });
    };

    handleDateChange = (e, date) => {

        this.setState({
            date: date
        }, (e) => {
            this.searchProject();
        });

    };

    searchProject = () => {
        let projects = [];

        // Get the values of searchbar
        let searchTerm = this.nameField.input.value;

        let tags = [];

        //Get the clicked tags
        this.state.tags.forEach((tag) => {
            if (tag.clicked) {
                tags.push(tag.name);
            }
        });

        this.props.projects.forEach((project) => {

            let corresponding = true;

            // Filter by the search word (not case sensitive)
            if (searchTerm) {
                if (project.title.toLowerCase().search(searchTerm.toLowerCase()) == -1 && project.description.toLowerCase().search(searchTerm.toLowerCase()) == -1) {
                    corresponding = false;
                }
            }

            // Filter by the status
            if (this.state.status != "All") {
                if (this.state.status == "Open" && project.status != "Open") {
                    corresponding = false;
                }
                else if (this.state.status == "Close" && project.status != "Close") {
                    corresponding = false;
                }
            }

            // Filter by the tags
            if (tags.length > 0) {
                let correspondingTags = false;
                tags.forEach((techno) => {
                    if (project.tags.indexOf(techno) != -1) {
                        correspondingTags = true;
                    }
                });
                if (!correspondingTags) {
                    corresponding = false;
                }
            }

            // Filter by the date
            if (this.state.date) {
                let projectDate = new Date(project.startDate);

                if (this.state.date > projectDate) {
                    corresponding = false;
                }
            }

            if (corresponding) {
                projects.push(project);
            }
        });

        this.props.displaySearchedProject(projects);
    };

    cancelDate = () => {
        this.setState({
            date: null
        }, (e) => {
            this.searchProject();

        });
    };

    render() {
        const styles = {
            marginLeft: {
                marginLeft: 4,
            },
            chip: {
                margin: 4,
            },
        };

        let DateTimeFormat;

        /**
         * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
         */
        if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        }

        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle text="Contient le mot" style={styles.marginLeft}/>
                    <TextField id="searchWord" ref={input => this.nameField = input} onChange={this.searchProject}/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text="Statut"/>
                    <DropDownMenu value={this.state.value} onChange={this.handleStatusChange}>
                        <MenuItem value={'All'} primaryText="Indifférent"/>
                        <MenuItem value={'Open'} primaryText="En cours"/>
                        <MenuItem value={'Close'} primaryText="Terminé"/>
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text="Tags"/>
                    <DropDownMenu value={this.state.value}>
                        {this.state.tags.map((techno, index) => {
                            return <Chip key={index}
                                         backgroundColor={ techno.clicked ? green300 : red300 }
                                         onTouchTap={this.handleTouchTap.bind(this, index)}
                                         style={styles.chip}
                            >
                                {techno.name}
                            </Chip>
                        })}
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text="Projets après le"/>
                    <DatePicker id="date" value={this.state.date} DateTimeFormat={DateTimeFormat}
                                onDismiss={this.cancelDate} okLabel="OK" cancelLabel="Annuler" locale="fr"
                                container="inline" onChange={this.handleDateChange}/>
                </ToolbarGroup>
            </Toolbar>
        );
    }
};