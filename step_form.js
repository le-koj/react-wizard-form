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
        recall={props.recall}
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
      <div className="form-group">
        <label htmlFor="email">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          placeholder="Enter username"
          value={props.username}
          onChange={props.handleChange}
        />
      </div>
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
    };

    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);

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

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, username, password } = this.state;
    alert(`Your registration details: \n
          Email: ${email} \n
          Username: ${username} \n
          Password: ${password}`);
  }; // handleSubmit

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
          recall={this.recall}
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
    this.state = {
      carpet: {
        title: "CARPET CLEANING",
        rooms: {
          clean: 0,
          protect: 0,
          deodorize: 0,
        }, // rooms
        bath: this.carpetOptions, // bath
        hall: this.carpetOptions, // hall
        staircase: this.carpetOptions, // staircase
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
        sofa: this.carpetOptions, // rooms
        loveseat: this.carpetOptions, // bath
        chair: this.carpetOptions, // hall
        ottoman: this.carpetOptions, // staircase
        diningChair: this.carpetOptions, // staircase
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
        rooms: this.tileGroutOptions,
        staircase: this.tileGroutOptions,
        display: false, // boolean to display options
        toggleIcon: this.downArrow, // toggle icon
      }, // tile & grout floor
    };

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
  } // constructor

  carpetOptions = {
    clean: 0,
    protect: 0,
    deodorize: 0,
  };

  tileGroutOptions = {
    tileClean: 0,
    colorSeal: 0,
  };

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
    if (this.state.areaRug.display === false) {
      console.log("null state");
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
              {this.state.areaRug.length} x {this.state.areaRug.width}
            </td>
            <td>{this.state.areaRug.clean}</td>
            <td>{this.state.areaRug.protect}</td>
            <td>{this.state.areaRug.deodorize}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  _carpet() {
    if (this.state.carpet.display === false) {
      console.log("null state");
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
              <span className="btn-minus">-</span>
              <input
                type="text"
                className="input-control"
                id="room-clean"
                name="room-clean"
                placeholder={this.state.carpet.rooms.clean}
                value={this.state.carpet.rooms.clean}
                onChange={this.handleChange}
              />
              <span className="btn-plus">+</span>
            </td>
            <td>
              <span className="btn-minus">-</span>
              <input
                type="text"
                className="input-control"
                id="room-clean"
                name="room-clean"
                placeholder={this.state.carpet.rooms.protect}
                value={this.state.carpet.rooms.protect}
                onChange={null}
              />
              <span className="btn-plus">+</span>
            </td>
            <td>
              <span className="btn-minus">-</span>
              <input
                type="text"
                className="input-control"
                id="room-clean"
                name="room-clean"
                placeholder={this.state.carpet.rooms.deodorize}
                value={this.state.carpet.rooms.deodorize}
                onChange={null}
              />
              <span className="btn-plus">+</span>
            </td>
          </tr>

          <tr>
            <th>Bath/Laundry</th>
            <td>{this.state.carpet.bath.clean}</td>
            <td>{this.state.carpet.bath.protect}</td>
            <td>{this.state.carpet.bath.deodorize}</td>
          </tr>

          <tr>
            <th>Entry/Hall</th>
            <td>{this.state.carpet.hall.clean}</td>
            <td>{this.state.carpet.hall.protect}</td>
            <td>{this.state.carpet.hall.deodorize}</td>
          </tr>

          <tr>
            <th>Staircase</th>
            <td>{this.state.carpet.staircase.clean}</td>
            <td>{this.state.carpet.staircase.protect}</td>
            <td>{this.state.carpet.staircase.deodorize}</td>
          </tr>
        </tbody>
      </table>
    );
  } // carpet

  _airDuct() {
    if (this.state.airDuct.display === false) {
      console.log("null state");
      return null;
    }

    return (
      <table>
        <tbody>
          <tr>
            <th>Indicate # of furnaces / HAVC</th>
            <td>{this.state.airDuct.hvac}</td>
          </tr>
          <tr>
            <th>Home has central air conditioning</th>
            <td>{this.state.airDuct.centralAC}</td>
          </tr>
          <tr>
            <th>Clean my dryer vent</th>
            <td>{this.state.airDuct.cleanDryerVent}</td>
          </tr>
        </tbody>
      </table>
    );
  } // air duct cleaning

  _upholstery() {
    if (this.state.upholstery.display === false) {
      console.log("null state");
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
            <td>{this.state.upholstery.sofa.clean}</td>
            <td>{this.state.upholstery.sofa.protect}</td>
            <td>{this.state.upholstery.sofa.deodorize}</td>
          </tr>

          <tr>
            <th>Loveseat</th>
            <td>{this.state.upholstery.loveseat.clean}</td>
            <td>{this.state.upholstery.loveseat.protect}</td>
            <td>{this.state.upholstery.loveseat.deodorize}</td>
          </tr>

          <tr>
            <th>Chair</th>
            <td>{this.state.upholstery.chair.clean}</td>
            <td>{this.state.upholstery.chair.protect}</td>
            <td>{this.state.upholstery.chair.deodorize}</td>
          </tr>

          <tr>
            <th>Ottoman</th>
            <td>{this.state.upholstery.ottoman.clean}</td>
            <td>{this.state.upholstery.ottoman.protect}</td>
            <td>{this.state.upholstery.ottoman.deodorize}</td>
          </tr>

          <tr>
            <th>Dining Room Chair</th>
            <td>{this.state.upholstery.diningChair.clean}</td>
            <td>{this.state.upholstery.diningChair.protect}</td>
            <td>{this.state.upholstery.diningChair.deodorize}</td>
          </tr>
        </tbody>
      </table>
    );
  } // upholstery

  _tileGrout() {
    if (this.state.tileGrout.display === false) {
      console.log("null state");
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
            <td>{this.state.tileGrout.rooms.tileClean}</td>
            <td>{this.state.tileGrout.rooms.colorSeal}</td>
          </tr>

          <tr>
            <th>Staircase</th>
            <td>{this.state.tileGrout.staircase.tileClean}</td>
            <td>{this.state.tileGrout.staircase.colorSeal}</td>
          </tr>
        </tbody>
      </table>
    );
  } // tile & grout cleaning

  _toggleView(state) {
    let service = state;
    service.toggleIcon =
      state.toggleIcon === this.downArrow ? this.upArrow : this.downArrow;
    service.display = state.display === false ? true : false;
    this.setState({ service });
  } // toggleView

  handleChange(event) {
    const { value } = event.target;
    var state = this.state.carpet.rooms;
    state["clean"] = value;
    this.setState({
      state,
    });
  } // handleChange

  displayServices() {
    return (
      <section>
        <article className="service-option">
          <div className="service-head">
            <h3>
              {this.state.carpet.title} {this._toggleIcon(this.state.carpet)}
            </h3>
          </div>
          {this._carpet()}
        </article>

        <article className="service-option">
          <div className="service-head">
            <h3>
              {this.state.areaRug.title} {this._toggleIcon(this.state.areaRug)}
            </h3>
          </div>
          {this._areaRug()}
        </article>

        <article className="service-option">
          <div className="service-head">
            <h3>
              {this.state.upholstery.title}{" "}
              {this._toggleIcon(this.state.upholstery)}
            </h3>
          </div>
          {this._upholstery()}
        </article>

        <article className="service-option">
          <div className="service-head">
            <h3>
              {this.state.airDuct.title} {this._toggleIcon(this.state.airDuct)}
            </h3>
          </div>
          {this._airDuct()}
        </article>

        <article className="service-option">
          <div className="service-head">
            <h3>
              {this.state.tileGrout.title}{" "}
              {this._toggleIcon(this.state.tileGrout)}
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
