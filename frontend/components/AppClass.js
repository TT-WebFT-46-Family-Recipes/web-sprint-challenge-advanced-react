import React from "react";
import {
  MOVES as availableMoves,
  buildPerfectSquareGrid,
  gridMove,
  gridReset,
} from "../utils/grid";
import { sendEmail } from "../utils/sendEmail";
import Grid from "./Grid";

export default class AppClass extends React.Component {
  GRIDAREA = 9;
  NOSTEPS = 0;
  ERRMSG = "You can't go ";

  state = {
    grid: buildPerfectSquareGrid(this.GRIDAREA),
    currCoordinates: [],
    stepsMoved: this.NOSTEPS,
    msg: "",
  };

  emailForm = React.createRef();

  handleMoveClick = (direction) => {
    const [failed, grid, currCoordinates] = gridMove(
      direction,
      this.state.grid,
      this.state.currCoordinates
    );
    if (!failed) {
      this.setState({
        ...this.state,
        grid,
        currCoordinates,
        stepsMoved: this.state.stepsMoved + 1,
        msg: "",
      });
    } else this.setState({ ...this.state, msg: this.ERRMSG + direction });
  };

  resetStateSetter = ({ grid, currCoordinates }) => {
    this.setState({
      ...this.state,
      grid,
      currCoordinates,
      stepsMoved: this.NOSTEPS,
      msg: "",
    });
  };

  handleResetClick = () => {
    gridReset(this.GRIDAREA, this.resetStateSetter);
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();

    const [x, y] = this.state.currCoordinates;
    const form = this.emailForm.current;

    const resMsg = sendEmail({
      x: x + 1,
      y: y + 1,
      steps: this.state.stepsMoved,
      email: form.email.value,
    });

    this.setState({ ...this.state, msg: await resMsg });
  };

  initialStateSetter = ({ grid, currCoordinates }) => {
    this.setState({ ...this.state, grid, currCoordinates });
  };

  componentDidMount() {
    gridReset(this.GRIDAREA, this.initialStateSetter);
  }

  render() {
    const [x, y] = this.state.currCoordinates;
    const { className } = this.props;

    return (
      <Grid
        className={className}
        stepsMoved={this.state.stepsMoved}
        grid={this.state.grid}
        x={x}
        y={y}
        msg={this.state.msg}
        availableMoves={availableMoves}
        handleMoveClick={this.handleMoveClick}
        handleResetClick={this.handleResetClick}
        emailForm={this.emailForm}
        handleFormSubmit={this.handleFormSubmit}
      />
    );
  }
}
