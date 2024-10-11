/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    
    id: 1, 
    name: 'Jack', 
    phone: '88885555',
    bookingTime: new Date(),
    seatNumber: '1', // 更新座位号为 1
    passengerClass: 'Economy', // 设置乘客等级
    ticketType: 'One-way' // 设置车票类型

  },
  {

    id: 2, 
    name: 'Rose', 
    phone: '88884444',
    bookingTime: new Date(),
    seatNumber: '2', // 更新座位号为 2
    passengerClass: 'Business', // 设置乘客等级
    ticketType: 'Round-trip' // 设置车票类型

  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { traveller } = props;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.bookingTime.toLocaleString()}</td>
      <td>{traveller.seatNumber}</td>
      <td>{traveller.passengerClass}</td> {/* 显示乘客等级 */}
      <td>{traveller.ticketType}</td> {/* 显示车票类型 */}
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const travellerRows = props.travellers.map(traveller => 
    <TravellerRow key={traveller.id} traveller={traveller} />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Seat Number</th>
          <th>Passenger Class</th> {/* 新增列 */}
          <th>Ticket Type</th> {/* 新增列 */}
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellerRows}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { travellerName: '', phone: '', seatNumber: '', passengerClass: '', ticketType: '' };
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const { travellerName, phone, seatNumber, passengerClass, ticketType } = this.state;
    const newTraveller = {
      id: this.props.travellers.length + 1,
      name: travellerName,
      phone: phone,
      bookingTime: new Date(),
      seatNumber: seatNumber,
      passengerClass: passengerClass,
      ticketType: ticketType,
    };
    this.props.bookTraveller(newTraveller);
    this.setState({ travellerName: '', phone: '', seatNumber: '', passengerClass: '', ticketType: '' });
  }

  render() {
    const { travellers } = this.props;
    const totalSeats = 30;
    const occupiedSeats = travellers.map(traveller => traveller.seatNumber);
    const freeSeats = [...Array(totalSeats)].map((_, index) => (index + 1).toString()).filter(seat => !occupiedSeats.includes(seat)); // 计算空闲座位列表
    
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
      <p>Free Seats: {freeSeats.length}</p> {/* 使用freeSeats的长度显示空闲座位的数量 */}
      <input
          type="text"
          name="travellername"
          placeholder="Name"
          value={this.state.travellerName}
          onChange={(e) => this.setState({ travellerName: e.target.value })}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={this.state.phone}
          onChange={(e) => this.setState({ phone: e.target.value })}
          required
        />
        <select
          name="seatNumber"
          value={this.state.seatNumber}
          onChange={(e) => this.setState({ seatNumber: e.target.value })}
          required
        >
          <option value="">Select Seat</option>
          {freeSeats.map(seat => (
            <option key={seat} value={seat}>{seat}</option>
          ))}
        </select>
        <select
          name="passengerClass"
          value={this.state.passengerClass}
          onChange={(e) => this.setState({ passengerClass: e.target.value })}
          required
        >
          <option value="">Select Passenger Class</option>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First Class">First Class</option>
        </select>
        <select
          name="ticketType"
          value={this.state.ticketType}
          onChange={(e) => this.setState({ ticketType: e.target.value })}
          required
        >
          <option value="">Select Ticket Type</option>
          <option value="One-way">One-way</option>
          <option value="Round-trip">Round-trip</option>
        </select>
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	<input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
    const totalSeats = 30; // 总座位数为 30
    const occupiedSeats = this.props.travellers.map(traveller => traveller.seatNumber); // 获取所有已预订的座位号
    const freeSeats = [...Array(totalSeats)].map((_, index) => (index + 1).toString()).filter(seat => !occupiedSeats.includes(seat)); // 计算空闲座位列表
	
  return (
	<div style={{ textAlign: 'center' }}>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    <h2>Seat Selection</h2>
    <p><strong>Available Seats: {totalSeats - occupiedSeats.length} / {totalSeats}</strong></p>
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr', // 设置网格布局，第三列宽度较大模拟走廊
      gap: '5px', // 设置每个座位之间的间距
      justifyContent: 'center',
      margin: '20px auto',
      width: '70%', // 调整整体宽度
    }}>
      {[...Array(totalSeats)].map((_, index) => {
        const seatNumber = (index + 1).toString();
        const isOccupied = occupiedSeats.includes(seatNumber); // 检查该座位是否已被预订
        let columnPosition;

        // 设置前 7 排的座位位置
        if (index < 28) {
          columnPosition = (index % 4 < 2) ? (index % 4 + 1) : (index % 4 + 3); // 左边两列和右边两列，中间留出走廊
        } else {
          // 最后一排的两个座位
          columnPosition = (index % 2 === 0) ? 1 : 5; // 分布在两侧
        }

        const seatStyle = {
          gridColumn: columnPosition, // 设置列位置
          width: '50px',
          height: '50px',
          backgroundColor: isOccupied ? 'grey' : 'green',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        };

        return (
          <div 
            key={index} 
            style={seatStyle}
          >
            {seatNumber}
          </div>
        );
      })}
    </div>
	</div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: initialTravellers, selector: 1 };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      this.setState((prevState) => ({
        travellers: [...prevState.travellers, passenger],
      }));
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	      <div>
	          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
            <button onClick={() => this.setSelector(1)}>Homepage</button>
            <button onClick={() => this.setSelector(2)}>Display Travellers</button>
            <button onClick={() => this.setSelector(3)}>Add Traveller</button>
            <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
	      </div>
        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          <button onClick={() => this.setSelector(1)}>Homepage</button>
          <button onClick={() => this.setSelector(2)}>Display Travellers</button>
          <button onClick={() => this.setSelector(3)}>Add Traveller</button>
          <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector === 2 && <Display travellers={this.state.travellers} />}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} travellers={this.state.travellers} />}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
