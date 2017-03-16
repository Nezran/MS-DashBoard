/**
 * Created by Mickael.LACOMBE on 13.03.2017.
 */
/**
 * Created by micka on 11/03/2017.
 */
import React from 'react';
import {Card, CardActions, CardHeader,  CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { TextField, SelectField, MenuItem }from 'material-ui';
import Divider from 'material-ui/Divider';
import Axios from 'axios';
import Dialog from 'material-ui/Dialog';

import Api from '../../Actions/Api';

export default class CreateAccount extends React.Component{
    componentWillReceiveProps(){
        this.setState({open: this.props.open});
    }
    componentDidMount() {
        this.setState({open: this.props.open});
        Axios.get('http://localhost:23000/api/roles')
            .then((response) => {

                // console.log(response.data.results[0].picture);
                this.setState({
                    roles: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }



    state={
        roles: [],
        open:true,
        role: '',

    }

    handleRole = (event, index, value) => {
        this.setState({role:value}, (then) => { });
    }

    handleSubmit = () => {
        console.log();
        // document.getElementsByName('username')[0].value;

        this.props.handleLoader();

       Api.createUser(
            null,
            document.getElementsByName('username')[0].value,
            document.getElementsByName('firstname')[0].value,
            document.getElementsByName('lastname')[0].value,
            this.state.role,
            document.getElementsByName('email')[0].value,
            document.getElementsByName('password')[0].value

        ).then((r) => {

           console.log("succes calback de l'api ",r, this.props);

           this.props.handleLoader();
           this.props.handleClose();
           this.setState({open: false});
           this.props.handleChangement();


       }).catch((c) => {
           console.log("error create",c);
       });
    }

    handleOpen = () => {
        // this.props.handleClose;
        console.log("s");
        // this.setState({open: true});
    };

    handleClose = () => {
        this.props.handleClose;
        this.setState({open: false});
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

        return (
            <div>
                <Dialog
                    title="Créer un utilisateur"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <form>
                        <TextField
                            ref="username"
                            name="username"
                            floatingLabelText="Nom d'utilisateur"
                            underlineShow={false}
                            floatingLabelFixed={true}
                        />
                        <Divider />
                        <TextField
                            name="email"
                            floatingLabelText="Email"
                            type="email"
                            underlineShow={false}
                            floatingLabelFixed={true}
                        />
                        <Divider />
                        <TextField
                            name="lastname"
                            floatingLabelText="Nom de famille"
                            type="text"
                            underlineShow={false}
                            floatingLabelFixed={true}

                        />
                        <Divider />
                        <TextField
                            name="firstname"
                            floatingLabelText="Prénom"
                            type="text"
                            underlineShow={false}
                            floatingLabelFixed={true}

                        />
                        <Divider />
                        <TextField
                            name="password"
                            floatingLabelText="Mot de passe"
                            type="password"
                            underlineShow={false}
                            floatingLabelFixed={true}

                        />
                        <Divider />
                        <SelectField
                            floatingLabelText="Role"
                            ref="role"
                            value={this.state.role}
                            onChange={this.handleRole}
                        >
                            {
                                this.state.roles.map((role) => {
                                    return <MenuItem key={role} value={role} primaryText={role} />
                                })
                            }

                        </SelectField>
                    </form>
                </Dialog>
            </div>

        )

    }
}