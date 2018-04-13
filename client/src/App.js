import React , {Component} from 'react';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import MyAwesomeReactComponent from './components/MyAwesomeReactComponent';

const styleI = {
  marginLeft: 20,
};
const styleF = {
  paddingTop: 20,
  paddingBottom: 20
};

const SO = moment.now();
const defaultDate = new Date();

class App extends Component {

  state = {
    response: [],
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: true,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: true,
    //height: '300px'
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.quotes }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/requirement');
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) throw Error(body.message);

    return body;
  };


render(){
    const rowsData = this.state.response;
    return (
      <div className="App">
	<MuiThemeProvider>
	<AppBar
	    title="Title"
	    iconClassNameRight="muidocs-icon-navigation-expand-more"
	/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
	<div>
	  <form action="/api/requirement" method="POST" style={styleF}>
	    <TextField
	      disabled={true}
	      name="service-order" id="service-order"
	      defaultValue={SO}
              floatingLabelText="Orden de servicio No."
	    />
	    <DatePicker disabled={true} defaultDate={defaultDate} floatingLabelText="Fecha" />
	    <TextField
	      hintText="Cliente"
	      name="cliente" id="cliente"
	      floatingLabelText="Cliente"
	      style={styleI}
	    /> 
            <TextField
              hintText="No. Caso"
	      name="no-caso" id="no-caso"
              floatingLabelText="No. Caso"
              style={styleI}
            /><br/>
            <TextField
              hintText="NIT o C.C."
              name="nit-cc" id="nit-cc"
              floatingLabelText="Nit o C.C."
              style={styleI}
            />
            <TextField
              hintText="Teléfono"
              name="telefono" id="telefono"
              floatingLabelText="Teléfono"
              style={styleI}
            /><br/>
	    <TextField
              name="desc" id="desc"
              floatingLabelText="Description"
              style={styleI}
	      fullWidth={true}
              multiLine={true}
       	      rows={5}
            />
	    <RaisedButton label="Submit" primary={true} style={styleI} type="submit" />
	  </form>
	  <Divider />
	</div>
	<div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                Company Requirements
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
	  if(rowsData.lenght > 0){
            rowsData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.quote}</TableRowColumn>
              </TableRow>
              ))
	  }
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
	</div>
	</MuiThemeProvider>
      </div>
    );
  }
}

export default App;
