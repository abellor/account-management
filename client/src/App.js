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
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styleI = {
  marginLeft: 0,
};
const styleF = {
  paddingTop: 20,
  paddingBottom: 20
};
const customContentStyle = {
  width: '100%',
  maxWidth: '1280px',
};
const styleB = {
  position: "absolute",
  top: "1em",
  right: "1.5em",
  zIndex: 1
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
    valueF: 1,
    valueS: 1,
    open: false,
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

  handleChangeF = (event, index, value) => this.setState({valueF:value});
  handleChangeS = (event, index, value) => this.setState({valueS:value});
  handleOpen = () => {this.setState({open: true});};
  handleClose = () => {this.setState({open: false});};
  submitForm = () => {
    console.log("dssd");
    document.reqForm.submit();
    this.handleClose();};


render(){
    const rowsData = this.state.response;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.submitForm}
      />,
    ];
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
            <Grid fluid>
              <Row center="xs">
                <Col xs={12} md={10}>
                <Paper style={{padding: "2em", marginTop: "2em", marginBottom: "2em", position: "relative"}} zDepth={2}>
                <FloatingActionButton style={styleB} onClick={this.handleOpen}>
                    <ContentAdd />
                </FloatingActionButton>
                <Table
                  height={this.state.height}
                  fixedHeader={this.state.fixedHeader}
                  fixedFooter={this.state.fixedFooter}
                  selectable={this.state.selectable}
                  multiSelectable={this.state.multiSelectable}>
                  <TableHeader
                    displaySelectAll={this.state.showCheckboxes}
                    adjustForCheckbox={this.state.showCheckboxes}
                    enableSelectAll={this.state.enableSelectAll}>
                    <TableRow>
                      <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center'}}>
                        Company Requirements
                      </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                      <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Orden de Servicio">Orden</TableHeaderColumn>
                      <TableHeaderColumn tooltip="No. Caso">No. Caso</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Cliente">Cliente</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Equipo">Equipo</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={this.state.showCheckboxes}
                    deselectOnClickaway={this.state.deselectOnClickaway}
                    showRowHover={this.state.showRowHover}
                    stripedRows={this.state.stripedRows}>
                    if(rowsData.lenght > 0){
                      rowsData.map( (row, index) => (
                        <TableRow key={index}>
                          <TableRowColumn>{index+1}</TableRowColumn>
                          <TableRowColumn>{row.serviceorder}</TableRowColumn>
                          <TableRowColumn>{row.nocaso}</TableRowColumn>
                          <TableRowColumn>{row.nitcc}</TableRowColumn>
                          <TableRowColumn>{row.marca}</TableRowColumn>                          
                        </TableRow>
                      ))
                    }
                  </TableBody>
                  <TableFooter adjustForCheckbox={this.state.showCheckboxes}>
                    <TableRow>
                      <TableRowColumn>ID</TableRowColumn>
                      <TableRowColumn>Orden</TableRowColumn>
                      <TableRowColumn>No. Caso</TableRowColumn>
                      <TableRowColumn>Cliente</TableRowColumn>
                      <TableRowColumn>Equipo</TableRowColumn>                      
                    </TableRow>
                  </TableFooter>
                </Table>
                </Paper>
                </Col>
              </Row>
            </Grid>
          </div>
          <Dialog
                  title="New Requirement"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  contentStyle={customContentStyle}
                  autoScrollBodyContent={true}
                  onRequestClose={this.handleClose}
                >
            <Grid fluid>
              <Row center="xs">
                <Col xs={12} md={12}>
                  <form action="/api/requirement" method="POST" style={styleF} name="reqForm">
                  <Row end="xs">
                    <Col xs={12} md={6}>
                      <TextField
                        disabled={false}
                        name="serviceorder" id="service-order"
                        defaultValue={SO}
                              floatingLabelText="Orden de servicio No."
                      />
                      <DatePicker style={{display:'inline', marginLeft:'20px'}} disabled={false} defaultDate={defaultDate} floatingLabelText="Fecha" />
                    </Col>
                  </Row>
                  <Row start="xs">
                    <Col xs={12} md={6}>
                      <TextField
                        hintText="Cliente"
                        name="cliente" id="cliente"
                        floatingLabelText="Cliente"
                        fullWidth={true}
                        style={styleI}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        hintText="No. Caso"
                        name="nocaso" id="no-caso"
                        floatingLabelText="No. Caso"
                        fullWidth={true}
                        style={styleI}
                      />
                    </Col>
                  </Row>
                  <Row start="xs">
                    <Col xs={12} md={6}>
                      <TextField
                        hintText="NIT o C.C."
                        name="nitcc" id="nit-cc"
                        floatingLabelText="Nit o C.C."
                        fullWidth={true}
                        style={styleI}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        hintText="Teléfono"
                        name="telefono" id="telefono"
                        floatingLabelText="Teléfono"
                        fullWidth={true}
                        style={styleI}
                      />
                    </Col>
                  </Row>
                  <Row start="xs">
                    <Col xs={12} md={6}>
                      <TextField
                        hintText="Contacto"
                        name="contacto" id="contacto"
                        floatingLabelText="Contacto"
                        fullWidth={true}
                        style={styleI}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        hintText="E-mail"
                        name="mail" id="mail"
                        floatingLabelText="E-mail"
                        fullWidth={true}
                        style={styleI}
                      />
                    </Col>
                  </Row>
                  <Row start="xs">
                    <Col xs={12} md={12}>
                      <TextField
                        hintText="Dirección"
                        name="direccion" id="direccion"
                        floatingLabelText="Dirección"
                        fullWidth={true}
                        style={styleI}
                      />
                    </Col>
                  </Row>
                  <Row start="xs">
                    <Col xs={12} md={3}>
                      <SelectField
                          name="equipo"
                          floatingLabelText="Equipo"
                          value={this.state.valueF}
                          onChange={this.handleChangeF}
                        >
                          <MenuItem value={1} primaryText="Escritorio" />
                          <MenuItem value={2} primaryText="Portatil" />
                          <MenuItem value={3} primaryText="Todo en uno" />
                          <Divider />
                          <MenuItem value={4} primaryText="Impresora" />
                          <MenuItem value={5} primaryText="Samrtphone" />
                          <MenuItem value={6} primaryText="Tableta" />
                          <Divider />
                          <MenuItem value={7} primaryText="Otro" />
                      </SelectField>
                    </Col>
                    <Col xs={12} md={3}>
                      <SelectField
                          name="servicio"
                          floatingLabelText="Servicio"
                          value={this.state.valueS}
                          onChange={this.handleChangeS}
                        >
                          <MenuItem value={1} primaryText="Facturación" />
                          <MenuItem value={2} primaryText="Instalación" />
                          <MenuItem value={3} primaryText="Garantía" />
                          <MenuItem value={4} primaryText="Contrato" />
                      </SelectField><br/>
                    </Col>
                  </Row>
                  <Row start="xs">
                    <Col xs={12} md={3}>
                    <TextField
                      hintText="Marca"
                      name="marca" id="marca"
                      floatingLabelText="Marca"
                      fullWidth={true}
                      style={styleI}
                    />
                    </Col>
                    <Col xs={12} md={3}>
                    <TextField
                      hintText="Modelo"
                      name="modelo" id="modelo"
                      floatingLabelText="Modelo"
                      fullWidth={true}
                      style={styleI}
                    />
                    </Col>
                    <Col xs={12} md={3}>
                    <TextField
                      hintText="No. Producto"
                      name="noproducto" id="no-producto"
                      floatingLabelText="No. Producto"
                      fullWidth={true}
                      style={styleI}
                    />
                    </Col>
                    <Col xs={12} md={3}>
                    <TextField
                      hintText="No. Serial"
                      name="noserial" id="no-serial"
                      floatingLabelText="No. Serial"
                      fullWidth={true}
                      style={styleI}
                    />
                    </Col>
                  </Row>
                  <Row start="xs">
                    <Col xs={12} md={12}>
                      <TextField
                        name="motivo" id="motivo"
                        floatingLabelText="Motivo del Servicio"
                        style={styleI}
                        fullWidth={true}
                        multiLine={true}
                        rows={5}
                      />
                    </Col>
                  </Row>
                  <Row start="xs">
                    <Col xs={12} md={12}>
                      <TextField
                        name="accion" id="accion"
                        floatingLabelText="Acción Tomada"
                        style={styleI}
                        fullWidth={true}
                        multiLine={true}
                        rows={5}
                      />
                    </Col>
                  </Row>
                  <Row start="xs">
                    <Col xs={12} md={12}>
                      <TextField
                        name="observaciones" id="observaciones"
                        floatingLabelText="Observaciones"
                        style={styleI}
                        fullWidth={true}
                        multiLine={true}
                        rows={5}
                      />
                    </Col>
                  </Row>
                  </form>
                </Col>
              </Row>
            </Grid>
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
