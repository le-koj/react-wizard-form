function ProgressBar(props) {
  if (props.currentStep === 1) {
    return (
      <ul className="progress-bar">
        <li onClick={() => props.recall(1)} className="bar-active">
          Select Service
        </li>
        <li className="bar-gray">Scheduling</li>
        <li className="bar-gray">Your Information</li>
        <li className="bar-gray">Review Your Order</li>
      </ul>
    );
  }

  if (props.currentStep === 2) {
    return (
      <ul className="progress-bar">
        <li onClick={() => props.recall(1)} className="bar-active">
          Select Service
        </li>
        <li onClick={() => props.recall(2)} className="bar-active">
          Scheduling
        </li>
        <li className="bar-gray">Your Information</li>
        <li className="bar-gray">Review Your Order</li>
      </ul>
    );
  }

  if (props.currentStep === 3) {
    return (
      <ul className="progress-bar">
        <li onClick={() => props.recall(1)} className="bar-active">
          Select Service
        </li>
        <li onClick={() => props.recall(2)} className="bar-active">
          Scheduling
        </li>
        <li onClick={() => props.recall(3)} className="bar-active">
          Your Information
        </li>
        <li className="bar-gray">Review Your Order</li>
      </ul>
    );
  }

  if (props.currentStep === 4) {
    return (
      <ul className="progress-bar">
        <li onClick={() => props.recall(1)} className="bar-active">
          Select Service
        </li>
        <li onClick={() => props.recall(2)} className="bar-active">
          Scheduling
        </li>
        <li onClick={() => props.recall(3)} className="bar-active">
          Your Information
        </li>
        <li onClick={() => props.recall(4)} className="bar-active">
          Review Your Order
        </li>
      </ul>
    );
  }
} // progress bar

function GetZipCode(props) {
  // prop: the current step
  if (props.currentStep !== 0) {
    return null;
  }

  // the markup for get zipcode step
  return (
    <React.Fragment>
      <div className="form-group zip-form">
        {props.exitButton()}
        <h3>BUILD YOUR QUOTE</h3>
        <h1>PLEASE ENTER YOUR ZIP CODE</h1>
        <p>Tell us the zipcode of the location you want us to have serviced</p>
        <div className="zip-form-container">
          <input
            type="text"
            className="form-control"
            id="zipcode"
            name="zipcode"
            placeholder="Enter zipcode"
            value={props.zipcode}
            onChange={props.handleChange}
          />
          {props.continueButton()}
        </div>
      </div>
    </React.Fragment>
  );
}

function Step1(props) {
  // prop: the current step
  if (props.currentStep !== 1) {
    return null;
  }

  // the markup for step1 UI
  return (
    <div>
      <ProgressBar currentStep={props.currentStep} recall={props.recall} />
      <Service
        currentStep={props.currentStep}
        zipcode={props.zipcode}
        carpet={props.carpet}
        areaRug={props.areaRug}
        upholstery={props.upholstery}
        airDuct={props.airDuct}
        tileGrout={props.tileGrout}
        recall={props.recall}
        update={props.update}
        handleChangeCheck={props.handleChangeCheck}
        newZip={props.newZip}
      />
    </div>
  );
} // Step1

function Step2(props) {
  // prop: the current step
  if (props.currentStep !== 2) {
    return null;
  }

  // the markup for step1 UI
  return (
    <React.Fragment>
      <ProgressBar currentStep={props.currentStep} recall={props.recall} />
      <CalenderApp />
    </React.Fragment>
  );
} // Step2

function Step3(props) {
  // prop: the current step
  if (props.currentStep !== 3) {
    return null;
  }

  // the markup for step1 UI
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          className="form-control"
          id="password"
          name="password"
          placeholder="Enter password"
          value={props.password}
          onChange={props.handleChange}
        />
      </div>
      <button className="btn btn-success btn-block">Sign Up</button>
    </React.Fragment>
  );
} // Step3

class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      email: "",
      username: "",
      password: "",
      zipcode: "",

      // SERVICES
      carpet: {
        title: "CARPET CLEANING",
        rooms: {
          clean: 0,
          protect: 0,
          deodorize: 0,
        }, // rooms
        bath: {
          clean: 0,
          protect: 0,
          deodorize: 0,
        }, // bath
        hall: {
          clean: 0,
          protect: 0,
          deodorize: 0,
        }, // hall
        staircase: {
          clean: 0,
          protect: 0,
          deodorize: 0,
        }, // staircase
        display: false, // boolean to display options
        toggleIcon: this.downArrow, // toggle icon
      },

      areaRug: {
        title: "AREA RUG CLEANING",
        length: 0,
        width: 0,
        clean: 0,
        protect: 0,
        deodorize: 0,
        display: false, // boolean to display options
        toggleIcon: this.downArrow, // toggle icon
      },

      upholstery: {
        title: "UPHOLSTERY CLEANING",
        sofa: { clean: 0, protect: 0, deodorize: 0 }, // rooms
        loveseat: { clean: 0, protect: 0, deodorize: 0 }, // bath
        chair: { clean: 0, protect: 0, deodorize: 0 }, // hall
        ottoman: { clean: 0, protect: 0, deodorize: 0 }, // staircase
        diningChair: { clean: 0, protect: 0, deodorize: 0 }, // staircase
        display: false, // boolean to display options
        toggleIcon: this.downArrow, // toggle icon
      }, // upholstery

      airDuct: {
        title: "AIR DUCT CLEANING",
        hvac: 0,
        centralAC: false,
        cleanDryerVent: false,
        display: false, // boolean to display options
        toggleIcon: this.downArrow, // toggle icon
      }, // upholstery

      tileGrout: {
        title: "TILE & GROUT FLOOR CLEANING",
        rooms: { tileClean: 0, colorSeal: 0 },
        staircase: { tileClean: 0, colorSeal: 0 },
        display: false, // boolean to display options
        toggleIcon: this.downArrow, // toggle icon
      }, // tile & grout floor
    };

    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.update = this.update.bind(this);

    // Bind functions for next and previous
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
    this._exit = this._exit.bind(this);
    this._continue = this._continue.bind(this);

    this.continueButton = this.continueButton.bind(this);
    this.exitButton = this.exitButton.bind(this);
    this.recall = this.recall.bind(this);
    this.newZip = this.newZip.bind(this);
  } // constructor

  upArrow = "&#x2191;";
  downArrow = "&#x2193;";

  _continue() {
    let currentStep = this.state.currentStep;

    // If the current step is 0, then add one on "next" button click
    currentStep = currentStep === 0 ? 1 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  } // _next

  // Test current step ternary
  // _next and _previous functions will be called on button click
  _next() {
    let currentStep = this.state.currentStep;

    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  } // _next

  _prev() {
    let currentStep = this.state.currentStep;

    // If the current step is 2 or 3, then substract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  } // _prev

  _exit() {
    console.log("exit");
    let currentStep = 1;
    this.setState({ currentStep: currentStep });
  } // exit

  recall(num) {
    let currentStep = num;
    this.setState({
      currentStep: currentStep,
    });
  }

  newZip() {
    let currentStep = 0;
    this.setState({
      currentStep: currentStep,
    });
  }

  exitButton() {
    return (
      <button className="btn btn-exit" type="button" onClick={this._exit}>
        {" "}
        x{" "}
      </button>
    );
  }

  continueButton() {
    let currentStep = this.state.currentStep;
    // if the current step is 0, then render the "continue" button
    if (currentStep === 0) {
      if (this.state.zipcode.length === 5) {
        return (
          <button
            className="btn btn-continue btn-active"
            type="button"
            onClick={this._continue}
          >
            {" "}
            CONTNUE{" "}
          </button>
        );
      }

      // else return grayed out btn
      return (
        <button
          className="btn btn-continue btn-gray"
          type="button"
          onClick={null}
        >
          {" "}
          CONTNUE{" "}
        </button>
      );
    }
  } // continueButton

  previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary float-left"
          type="button"
          onClick={this._prev}
        >
          {" "}
          Previous{" "}
        </button>
      );
    }
    // ... else return nothing
    return null;
  } // previousButton

  nextButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 3, then render the "next" button
    if (currentStep < 3) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={this._next}
        >
          {" "}
          Continue{" "}
        </button>
      );
    }
    return null;
  } // nextButton

  // use the submitted data to set the state
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  } // handleChange

  handleChangeCheck(event, state) {
    let group = event.currentTarget.getAttribute("group");
    console.log(group);
    let newState = state;
    newState[group] = newState[group] === false ? true : false;
    this.setState({ newState });
  } // handleChangeCHeck

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, username, password } = this.state;
    alert(`Your registration details: \n
          Email: ${email} \n
          Username: ${username} \n
          Password: ${password}`);
  }; // handleSubmit

  // update parent state from child component
  update(state) {
    this.setState({ state });
  }

  render() {
    // if the currentStep is 0, render zipcode form
    if (this.state.currentStep === 0) {
      return (
        <GetZipCode
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          zipcode={this.state.zipcode}
          exitButton={this.exitButton}
          continueButton={this.continueButton}
        />
      );
    }

    return (
      <React.Fragment>
        <Step1
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          zipcode={this.state.zipcode}
          carpet={this.state.carpet}
          areaRug={this.state.areaRug}
          upholstery={this.state.upholstery}
          airDuct={this.state.airDuct}
          tileGrout={this.state.tileGrout}
          recall={this.recall}
          update={this.update}
          handleChangeCheck={this.handleChangeCheck}
          newZip={this.newZip}
        />
        <form onSubmit={this.handleSubmit}>
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            recall={this.recall}
            username={this.state.username}
          />
          <Step3
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            recall={this.recall}
            password={this.state.password}
          />
          {this.previousButton()}
          {this.nextButton()}
        </form>
      </React.Fragment>
    );
  } // render
} // MasterForm

ReactDOM.render(<MasterForm />, document.getElementById("root"));

// =================================================================== //
// ===================== Service Section ============================= //

class Service extends React.Component {
  constructor(props) {
    super(props);

    // service templates
    this._carpet = this._carpet.bind(this);
    this._areaRug = this._areaRug.bind(this);
    this._upholstery = this._upholstery.bind(this);
    this._airDuct = this._airDuct.bind(this);

    this.changeZip = this.changeZip.bind(this);
    this._changeWarn = this._changeWarn.bind(this);
    this.displayServices = this.displayServices.bind(this);
    this._toggleView = this._toggleView.bind(this);
    this._toggleIcon = this._toggleIcon.bind(this);
    this._tileGrout = this._tileGrout.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this._operatorChange = this._operatorChange.bind(this);
  } // constructor

  /*
  setState(state) {
    window.localStorage.setItem("state", JSON.stringify(state));
    super.setState(state);
  }
  */

  upArrow = "&#x2191;";
  downArrow = "&#x2193;";

  _toggleIcon(state) {
    if (state.toggleIcon === this.upArrow) {
      return (
        <span onClick={() => this._toggleView(state)} className="togg-icon">
          &#x2191;
        </span>
      );
    } else {
      return (
        <span onClick={() => this._toggleView(state)} className="togg-icon">
          &#x2193;
        </span>
      );
    }
  }

  _changeWarn() {
    this.props.newZip();
  } // changeWarn

  changeZip() {
    return (
      <section className="change-zip">
        <p id="zip-sec">
          <i className="material-icons">place</i>
          <span id="span-1">ZIP:</span>{" "}
          <span id="span-2">{this.props.zipcode} </span>
          <span onClick={this._changeWarn} id="span-3">
            Change
          </span>
        </p>
        <p id="zip-sec-2">1-714-259-9999 ext. 21</p>
      </section>
    );
  }

  _areaRug() {
    if (this.props.areaRug.display === false) {
      return null;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>LENGTH x WIDTH</th>
            <th>CLEAN</th>
            <th>PROTECT</th>
            <th>DEODORIZE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                className="input-control"
                id="length"
                name="length"
                group="length"
                placeholder={this.props.areaRug.length}
                value={this.props.areaRug.length}
                onChange={(e) => this.handleChange(e, this.props.areaRug)}
              />{" "}
              x{" "}
              <input
                type="text"
                className="input-control"
                id="width"
                name="width"
                group="width"
                placeholder={this.props.areaRug.width}
                value={this.props.areaRug.width}
                onChange={(e) => this.handleChange(e, this.props.areaRug)}
              />
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.areaRug, "clean")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="areaRug-clean"
                name="areaRug-clean"
                group="clean"
                placeholder={this.props.areaRug.clean}
                value={this.props.areaRug.clean}
                onChange={(e) => this.handleChange(e, this.props.areaRug)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.areaRug, "clean")
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.areaRug, "protect")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="areaRug-protect"
                name="areaRug-protect"
                group="protect"
                placeholder={this.props.areaRug.protect}
                value={this.props.areaRug.protect}
                onChange={(e) => this.handleChange(e, this.props.areaRug)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.areaRug, "protect")
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.areaRug, "deodorize")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="areaRug-deodorize"
                name="areaRug-deodorize"
                group="deodorize"
                placeholder={this.props.areaRug.deodorize}
                value={this.props.areaRug.deodorize}
                onChange={(e) => this.handleChange(e, this.props.areaRug)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.areaRug, "deodorize")
                }
              >
                +
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  _carpet() {
    if (this.props.carpet.display === false) {
      return null;
    }

    return (
      <table>
        <thead className="thead">
          <tr>
            <th></th>
            <th>CLEAN</th>
            <th>PROTECT</th>
            <th>DEODORIZE</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Room(s)</th>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.carpet.rooms, "clean")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="room-clean"
                name="room-clean"
                group="clean"
                placeholder={this.props.carpet.rooms.clean}
                value={this.props.carpet.rooms.clean}
                onChange={(e) => this.handleChange(e, this.props.carpet.rooms)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.carpet.rooms, "clean")
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.carpet.rooms, "protect")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="room-protect"
                name="room-protect"
                group="protect"
                placeholder={this.props.carpet.rooms.protect}
                value={this.props.carpet.rooms.protect}
                onChange={(e) => this.handleChange(e, this.props.carpet.rooms)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.carpet.rooms, "protect")
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.carpet.rooms, "deodorize")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="room-deodorize"
                name="room-deodorize"
                group="deodorize"
                placeholder={this.props.carpet.rooms.deodorize}
                value={this.props.carpet.rooms.deodorize}
                onChange={(e) => this.handleChange(e, this.props.carpet.rooms)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.carpet.rooms, "deodorize")
                }
              >
                +
              </span>
            </td>
          </tr>

          <tr>
            <th>Bath/Laundry</th>
            <td id="carpet-bath-clean">
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.carpet.bath, "clean")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="bath-clean"
                name="bath-clean"
                group="clean"
                placeholder={this.props.carpet.bath.clean}
                value={this.props.carpet.bath.clean}
                onChange={(e) => this.handleChange(e, this.props.carpet.bath)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.carpet.bath, "clean")
                }
              >
                +
              </span>
            </td>
            <td id="carpet-bath-protect">
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.carpet.bath, "protect")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="bath-protect"
                name="bath-protect"
                group="protect"
                placeholder={this.props.carpet.bath.protect}
                value={this.props.carpet.bath.protect}
                onChange={(e) => this.handleChange(e, this.props.carpet.bath)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.carpet.bath, "protect")
                }
              >
                +
              </span>
            </td>
            <td id="carpet-bath-deodorize">
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.carpet.bath, "deodorize")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="bath-deodorize"
                name="bath-deodorize"
                group="deodorize"
                placeholder={this.props.carpet.bath.deodorize}
                value={this.props.carpet.bath.deodorize}
                onChange={(e) => this.handleChange(e, this.props.carpet.bath)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.carpet.bath, "deodorize")
                }
              >
                +
              </span>
            </td>
          </tr>

          <tr>
            <th>Entry/Hall</th>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.carpet.hall, "clean")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="hall-clean"
                name="hall-clean"
                group="clean"
                placeholder={this.props.carpet.hall.clean}
                value={this.props.carpet.hall.clean}
                onChange={(e) => this.handleChange(e, this.props.carpet.hall)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.carpet.hall, "clean")
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.carpet.hall, "protect")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="hall-protect"
                name="hall-protect"
                group="protect"
                placeholder={this.props.carpet.hall.protect}
                value={this.props.carpet.hall.protect}
                onChange={(e) => this.handleChange(e, this.props.carpet.hall)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.carpet.hall, "protect")
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.carpet.hall, "deodorize")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="hall-deodorize"
                name="hall-deodorize"
                group="deodorize"
                placeholder={this.props.carpet.hall.deodorize}
                value={this.props.carpet.hall.deodorize}
                onChange={(e) => this.handleChange(e, this.props.carpet.hall)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.carpet.hall, "deodorize")
                }
              >
                +
              </span>
            </td>
          </tr>

          <tr>
            <th>Staircase</th>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.carpet.staircase, "clean")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="staircase-clean"
                name="staircase-clean"
                group="clean"
                placeholder={this.props.carpet.staircase.clean}
                value={this.props.carpet.staircase.clean}
                onChange={(e) =>
                  this.handleChange(e, this.props.carpet.staircase)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.carpet.staircase, "clean")
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.carpet.staircase,
                    "protect"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="staircase-protect"
                name="staircase-protect"
                group="protect"
                placeholder={this.props.carpet.staircase.protect}
                value={this.props.carpet.staircase.protect}
                onChange={(e) =>
                  this.handleChange(e, this.props.carpet.staircase)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.carpet.staircase,
                    "protect"
                  )
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.carpet.staircase,
                    "deodorize"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="staircase-deodorize"
                name="staircase-deodorize"
                group="deodorize"
                placeholder={this.props.carpet.staircase.deodorize}
                value={this.props.carpet.staircase.deodorize}
                onChange={(e) =>
                  this.handleChange(e, this.props.carpet.staircase)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.carpet.staircase,
                    "deodorize"
                  )
                }
              >
                +
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    );
  } // carpet

  _airDuct() {
    if (this.props.airDuct.display === false) {
      return null;
    }

    return (
      <table>
        <tbody>
          <tr>
            <th>Indicate # of furnaces / HAVC</th>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.airDuct, "hvac")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="hvac"
                name="hvac"
                group="hvac"
                placeholder={this.props.airDuct.hvac}
                value={this.props.airDuct.hvac}
                onChange={(e) => this.handleChange(e, this.props.airDuct)}
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.airDuct, "hvac")
                }
              >
                +
              </span>
            </td>
          </tr>
          <tr>
            <th>Home has central air conditioning</th>
            <td>{this._getCheckBox(this.props.airDuct, "centralAC")}</td>
          </tr>
          <tr>
            <th>Clean my dryer vent</th>
            <td>{this._getCheckBox(this.props.airDuct, "cleanDryerVent")}</td>
          </tr>
        </tbody>
      </table>
    );
  } // air duct cleaning

  _upholstery() {
    if (this.props.upholstery.display === false) {
      return null;
    }

    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>CLEAN</th>
            <th>PROTECT</th>
            <th>DEODORIZE</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Sofa</th>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.upholstery.sofa, "clean")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="sofa-clean"
                name="sofa-clean"
                group="clean"
                placeholder={this.props.upholstery.sofa.clean}
                value={this.props.upholstery.sofa.clean}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.sofa)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.upholstery.sofa, "clean")
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.upholstery.sofa, "protect")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="sofa-protect"
                name="sofa-protect"
                group="protect"
                placeholder={this.props.upholstery.sofa.protect}
                value={this.props.upholstery.sofa.protect}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.sofa)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.upholstery.sofa, "protect")
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.sofa,
                    "deodorize"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="sofa-deodorize"
                name="sofa-deodorize"
                group="deodorize"
                placeholder={this.props.upholstery.sofa.deodorize}
                value={this.props.upholstery.sofa.deodorize}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.sofa)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.sofa,
                    "deodorize"
                  )
                }
              >
                +
              </span>
            </td>
          </tr>

          <tr>
            <th>Loveseat</th>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.loveseat,
                    "clean"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="loveseat-clean"
                name="loveseat-clean"
                group="clean"
                placeholder={this.props.upholstery.loveseat.clean}
                value={this.props.upholstery.loveseat.clean}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.loveseat)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.loveseat,
                    "clean"
                  )
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.loveseat,
                    "protect"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="loveseat-protect"
                name="loveseat-protect"
                group="protect"
                placeholder={this.props.upholstery.loveseat.protect}
                value={this.props.upholstery.loveseat.protect}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.loveseat)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.loveseat,
                    "protect"
                  )
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.loveseat,
                    "deodorize"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="loveseat-deodorize"
                name="loveseat-deodorize"
                group="deodorize"
                placeholder={this.props.upholstery.loveseat.deodorize}
                value={this.props.upholstery.loveseat.deodorize}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.loveseat)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.loveseat,
                    "deodorize"
                  )
                }
              >
                +
              </span>
            </td>
          </tr>

          <tr>
            <th>Chair</th>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(0, this.props.upholstery.chair, "clean")
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="chair-clean"
                name="chair-clean"
                group="clean"
                placeholder={this.props.upholstery.chair.clean}
                value={this.props.upholstery.chair.clean}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.chair)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(1, this.props.upholstery.chair, "clean")
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.chair,
                    "protect"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="chair-protect"
                name="chair-protect"
                group="protect"
                placeholder={this.props.upholstery.chair.protect}
                value={this.props.upholstery.chair.protect}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.chair)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.chair,
                    "protect"
                  )
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.chair,
                    "deodorize"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="chair-deodorize"
                name="chair-deodorize"
                group="deodorize"
                placeholder={this.props.upholstery.chair.deodorize}
                value={this.props.upholstery.chair.deodorize}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.chair)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.chair,
                    "deodorize"
                  )
                }
              >
                +
              </span>
            </td>
          </tr>

          <tr>
            <th>Ottoman</th>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.ottoman,
                    "clean"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="ottoman-clean"
                name="ottoman-clean"
                group="clean"
                placeholder={this.props.upholstery.ottoman.clean}
                value={this.props.upholstery.ottoman.clean}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.ottoman)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.ottoman,
                    "clean"
                  )
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.ottoman,
                    "protect"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="ottoman-protect"
                name="ottoman-protect"
                group="protect"
                placeholder={this.props.upholstery.ottoman.protect}
                value={this.props.upholstery.ottoman.protect}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.ottoman)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.ottoman,
                    "protect"
                  )
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.ottoman,
                    "deodorize"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="ottoman-deodorize"
                name="ottoman-deodorize"
                group="deodorize"
                placeholder={this.props.upholstery.ottoman.deodorize}
                value={this.props.upholstery.ottoman.deodorize}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.ottoman)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.ottoman,
                    "deodorize"
                  )
                }
              >
                +
              </span>
            </td>
          </tr>

          <tr>
            <th>Dining Room Chair</th>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.diningChair,
                    "clean"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="diningChair-clean"
                name="diningChair-clean"
                group="clean"
                placeholder={this.props.upholstery.diningChair.clean}
                value={this.props.upholstery.diningChair.clean}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.diningChair)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.diningChair,
                    "clean"
                  )
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.diningChair,
                    "protect"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="diningChair-protect"
                name="diningChair-protect"
                group="protect"
                placeholder={this.props.upholstery.diningChair.protect}
                value={this.props.upholstery.diningChair.protect}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.diningChair)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.diningChair,
                    "protect"
                  )
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.upholstery.diningChair,
                    "deodorize"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="diningChair-deodorize"
                name="diningChair-deodorize"
                group="deodorize"
                placeholder={this.props.upholstery.diningChair.deodorize}
                value={this.props.upholstery.diningChair.deodorize}
                onChange={(e) =>
                  this.handleChange(e, this.props.upholstery.diningChair)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.upholstery.diningChair,
                    "deodorize"
                  )
                }
              >
                +
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    );
  } // upholstery

  _tileGrout() {
    if (this.props.tileGrout.display === false) {
      return null;
    }

    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>TILE CLEAN</th>
            <th>COLOR SEAL</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Room(s)</th>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.tileGrout.rooms,
                    "tileClean"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="rooms-tileClean"
                name="rooms-tileClean"
                group="tileClean"
                placeholder={this.props.tileGrout.rooms.tileClean}
                value={this.props.tileGrout.rooms.tileClean}
                onChange={(e) =>
                  this.handleChange(e, this.props.tileGrout.rooms)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.tileGrout.rooms,
                    "tileClean"
                  )
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.tileGrout.rooms,
                    "colorSeal"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="rooms-colorSeal"
                name="rooms-colorSeal"
                group="colorSeal"
                placeholder={this.props.tileGrout.rooms.colorSeal}
                value={this.props.tileGrout.rooms.colorSeal}
                onChange={(e) =>
                  this.handleChange(e, this.props.tileGrout.rooms)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.tileGrout.rooms,
                    "colorSeal"
                  )
                }
              >
                +
              </span>
            </td>
          </tr>

          <tr>
            <th>Staircase</th>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.tileGrout.staircase,
                    "tileClean"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="tileGrout-staircase"
                name="tileGrout-staircase"
                group="tileClean"
                placeholder={this.props.tileGrout.staircase.tileClean}
                value={this.props.tileGrout.staircase.tileClean}
                onChange={(e) =>
                  this.handleChange(e, this.props.tileGrout.staircase)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.tileGrout.staircase,
                    "tileClean"
                  )
                }
              >
                +
              </span>
            </td>
            <td>
              <span
                className="btn-minus"
                onClick={() =>
                  this._operatorChange(
                    0,
                    this.props.tileGrout.staircase,
                    "colorSeal"
                  )
                }
              >
                -
              </span>
              <input
                type="text"
                className="input-control"
                id="tileGrout-colorSeal"
                name="tileGrout-colorSeal"
                group="colorSeal"
                placeholder={this.props.tileGrout.staircase.colorSeal}
                value={this.props.tileGrout.staircase.colorSeal}
                onChange={(e) =>
                  this.handleChange(e, this.props.tileGrout.staircase)
                }
              />
              <span
                className="btn-plus"
                onClick={() =>
                  this._operatorChange(
                    1,
                    this.props.tileGrout.staircase,
                    "colorSeal"
                  )
                }
              >
                +
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    );
  } // tile & grout cleaning

  _getCheckBox(state, child) {
    return (
      <input
        type="checkbox"
        group={child}
        onChange={(e) => this.props.handleChangeCheck(e, state)}
        checked={state[child]}
      />
    );
  }

  _toggleView(state) {
    let service = state;
    service.toggleIcon =
      state.toggleIcon === this.downArrow ? this.upArrow : this.downArrow;
    service.display = state.display === false ? true : false;
    this.props.update(service);
  } // toggleView

  _operatorChange(num, state, group) {
    if (num == 1) {
      let value = state[group] + 1;
      state[group] = value;
      this.props.update(state);
      console.log(state);
    } else {
      if (state[group] <= 0) {
        return null;
      }
      let value = state[group] - 1;
      state[group] = value;
      this.props.update(state);
      console.log(state);
    }
  } // _operatorChange

  handleChange(event, state) {
    const { value } = event.target;
    let group = event.currentTarget.getAttribute("group");
    state[group] = parseInt(value);
    this.props.update(state);
  } // handleChange

  displayServices() {
    return (
      <section>
        <article className="service-option">
          <div className="service-head">
            <h3>
              {this.props.carpet.title} {this._toggleIcon(this.props.carpet)}
            </h3>
          </div>
          {this._carpet()}
        </article>

        <article className="service-option">
          <div className="service-head">
            <h3>
              {this.props.areaRug.title} {this._toggleIcon(this.props.areaRug)}
            </h3>
          </div>
          {this._areaRug()}
        </article>

        <article className="service-option">
          <div className="service-head">
            <h3>
              {this.props.upholstery.title}{" "}
              {this._toggleIcon(this.props.upholstery)}
            </h3>
          </div>
          {this._upholstery()}
        </article>

        <article className="service-option">
          <div className="service-head">
            <h3>
              {this.props.airDuct.title} {this._toggleIcon(this.props.airDuct)}
            </h3>
          </div>
          {this._airDuct()}
        </article>

        <article className="service-option">
          <div className="service-head">
            <h3>
              {this.props.tileGrout.title}{" "}
              {this._toggleIcon(this.props.tileGrout)}
            </h3>
          </div>
          {this._tileGrout()}
        </article>
      </section>
    );
  }

  render() {
    return (
      <React.Fragment>
        <section className="select-service">
          <h1>WHAT CAN WE CLEAN FOR YOU?</h1>
          <div className="2-col service-section">
            {this.changeZip()}
            {this.displayServices()}
          </div>
        </section>
      </React.Fragment>
    );
  } // render
} // Service

// ============================================================= //
// ====================== CalenderApp ========================== //

const style = {
  positon: "relative",
  margin: "50px auto",
};

class CalenderApp extends React.Component {
  constructor(props) {
    super(props);
  }

  onDayClick = (e, day) => {
    alert(day);
  };

  render() {
    return (
      <React.Fragment>
        <section className="schedule-service">
          <h1>APOINTMENT DATE AND ARRIVAL WINDOW</h1>
          <Calender onDayClick={(e, day) => this.onDayClick(e, day)} />
        </section>
      </React.Fragment>
    );
  }
}

// ============================================================= //
// ================Calender.Component ========================== //

class Calender extends React.Component {
  constructor(props) {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
  }

  state = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false,
  };

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.months();

  year = () => {
    return this.state.dateContext.format("Y");
  };

  month = () => {
    return this.state.dateContext.format("MMMM");
  };

  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  };

  currentDate = () => {
    return this.state.dateContext.get("date");
  };

  currentDay = () => {
    return this.state.dateContext.format("D");
  };

  firstDayOfMOnth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf("month").format("d");
    return firstDay;
  };

  setMonth = (month) => {
    let monthNo = this.months.indexOf(month);
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("month", monthNo);
    this.setState({
      dateContext: dateContext,
    });
  };

  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    this.setState({
      dateContext: dateContext,
    });
    this.props.onNextMonth && this.props.onNextMonth();
  };

  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    this.setState({
      dateContext: dateContext,
    });
    this.props.onPrevMonth && this.props.onPrevMonth();
  };

  onSelectChange = (e, data) => {
    this.setMonth(data);
    this.props.onMonthChange && this.props.onMonthChange();
  };

  SelectList = (props) => {
    let popup = props.data.map((data) => {
      return (
        <div key={data}>
          <a
            href="#"
            onClick={(e) => {
              this.onSelectChange(e, data);
            }}
          >
            {data}
          </a>
        </div>
      );
    });

    return <div className="month-popup">{popup}</div>;
  };

  onChangeMonth = (e, month) => {
    console.log(month);
    this.setState({
      showMonthPopup: !this.state.showMonthPopup,
    });
  };

  MonthNav = () => {
    return (
      <span
        className="label-month"
        onClick={(e) => this.onChangeMonth(e, this.month())}
      >
        {this.month()}
        {this.state.showMonthPopup && <this.SelectList data={this.months} />}
      </span>
    );
  };

  showYearEditor = () => {
    this.setState({
      showYearNav: true,
    });
  };

  setYear = (year) => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("year", year);
    this.setState({
      dateContext: dateContext,
    });
  };

  onYearChange = (e) => {
    this.setYear(e.target.value);
    this.props.onYearChange && this.props.onYearChange(e, e.target.value);
  };

  onKeyUpYear = (e) => {
    if (e.which === 13 || e.which === 27) {
      this.setYear(e.target.value);
      this.setState({
        showYearNav: false,
      });
    }
  };

  YearNav = () => {
    return this.state.showYearNav ? (
      <input
        default={this.year()}
        className="editor-year"
        ref={(yearInput) => {
          this.yearInput = yearInput;
        }}
        onKeyUp={(e) => this.onKeyUpYear(e)}
        onChange={(e) => this.onYearChange(e)}
        type="number"
        placeholder="year"
      />
    ) : (
      <span
        onDoubleClick={(e) => {
          this.showYearEditor();
        }}
        className="label-year"
      >
        {this.year()}
      </span>
    );
  };

  onDayClick = (e, day) => {
    this.props.onDayClick && this.props.onDayClick(e, day);
  };

  render() {
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className="week-day">
          {day}
        </td>
      );
    });

    let blanks = [];
    for (let i = 0; i < this.firstDayOfMOnth(); i++) {
      blanks.push(
        <td key={i * 80} className="emptySlot">
          {" "}
        </td>
      );
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let className = d === this.currentDay() ? "day current-day" : "day";
      daysInMonth.push(
        <td key={d} className={className}>
          <span
            onClick={(e) => {
              this.onDayClick(e, d);
            }}
          >
            {d}
          </span>
        </td>
      );
    }

    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 != 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }

      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    let trElems = rows.map((d, i) => {
      return <tr key={i * 100}>{d}</tr>;
    });

    return (
      <div className="calender-container">
        <table className="calender">
          <thead>
            <tr className="calender-head">
              <td colSpan="5">
                <span
                  className="btn-minus"
                  onClick={(e) => {
                    this.prevMonth();
                  }}
                >
                  <i className="fas">&#xf104;</i>
                </span>

                <this.MonthNav />

                <span
                  onClick={(e) => {
                    this.nextMonth();
                  }}
                  className="btn-plus"
                >
                  <i className="fas">&#xf105;</i>
                </span>
              </td>
              <td colSpan="2" className="nav-year">
                <this.YearNav />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>{weekdays}</tr>
            {trElems}
          </tbody>
        </table>
      </div>
    );
  }
}
