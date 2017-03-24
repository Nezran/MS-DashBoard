//////////////////////////////////////
// Charts component
// Generate charts with data from trello and projects
/////////////////////////////////////

import React from 'react';
import {PieChart, Pie, Legend,Tooltip,Cell,BarChart,BarXAxis, YAxis, CartesianGrid,XAxis,Bar} from 'recharts';

export default class Charts extends React.Component{

    constructor(props){
        super(props);
        this.state.projects = this.props.projects;
        this.state.trelloProjects = this.props.trelloProjects;
    }

    componentWillReceiveProps(nextProps){
        this.setState({trelloProjects:nextProps.trelloProjects}, (then) => {
            var trelloData = [];
            if(nextProps.length != -1){
                this.state.trelloProjects.map((trello,i) => {
                    trelloData.push({name:trello.name, cards:trello.cards.length, lists:trello.lists.length});
                });
                this.setState({trelloChart:trelloData});
            }
        });
    }

    componentDidMount(){
        this.state.trelloProjects = this.props.trelloProjects;

        var tags = [];

        this.state.projects.map((project,i) => {
            project.tags.map((tag,i) =>{

                var counter = tags.findIndex(
                    (array) => {
                    return array.name === tag;
                });

                if(counter == -1){
                    tags.push({name:tag,value:1});
                }else{
                    tags[counter].value ++;
                }

            });
        });

        this.setState({tags:tags});
    }

    state={
        projects:[],
        tags:[],
        trelloProjects:[],
        trelloChart:[],
    };

    render(){

        const styleDiv={
            width: "33%",
            float: "left",
        };

        const styleDivContainer={
            width: "100%",
            float: "left",
        };

        return(
            <div style={styleDivContainer}>

                {
                    this.state.trelloChart >= 0 ? "" : <h1>Trello statistiques</h1>
                }

                {
                    this.state.trelloChart ?
                        <BarChart
                            width={1200}
                            height={300}
                            data={this.state.trelloChart}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="lists" fill="#8884d8" />
                            <Bar dataKey="cards" fill="#82ca9d" />
                        </BarChart>
                        : ""
                }

                <h1>Nombre de tags</h1>
                <div style={styleDiv}>
                <PieChart width={600} height={400}>
                    <Pie  isAnimationActive={false} startAngle={180} endAngle={0} innerRadius={40} data={this.state.tags} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
                        {
                            this.state.tags.map((entry, index) => <Cell key={index} fill={'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)}/>)
                        }
                    </Pie>
                    <Tooltip/>
                    <Legend />
                   </PieChart>
                </div>
            </div>
        )
    }
}