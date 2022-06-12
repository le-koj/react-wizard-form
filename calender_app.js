const style = {
  positon: "relative",
  margin: "50px auto",
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  onDayClick = (e, day) => {
    alert(day);
  };

  render() {
    return (
      <div className="app">
        <Calender onDayClick={(e, day) => this.onDayClick(e, day)} />
      </div>
    );
  }
}

// ============================================================= //
// ================Calender.Component ==========================//

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
      <div
        className="label-month"
        onClick={(e) => this.onChangeMonth(e, this.month())}
      >
        {this.month()}
        {this.state.showMonthPopup && <this.SelectList data={this.months} />}
      </div>
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
                <this.MonthNav /> <this.YearNav />
              </td>
              <td colSpan="2" className="nav-month">
                <i
                  className="prev fa fa-fw fa-chevron-left"
                  onClick={(e) => {
                    this.prevMonth();
                  }}
                ></i>
                <i
                  className="prev fa fa-fw fa-chevron-right"
                  onClick={(e) => {
                    this.nextMonth();
                  }}
                ></i>
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

ReactDOM.render(<App />, document.getElementById("root"));
