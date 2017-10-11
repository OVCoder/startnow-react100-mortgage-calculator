import React from 'react'; //loads everything from 'react' library into a variable React

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props){
    super(props);
    this.state = {
      loanBalance : '', //property for each input field for the state object and their initial values.
      interestRate : '',//property for each input field for the state object and their initial values.
      loanTerm: 15,//property for each input field for the state object and their initial values.
      calculatedTotal: '',//property for each input field for the state object and their initial values.
    };
  
  this.handleLoanBalance = this.handleLoanBalance.bind(this);
  this.handleInterestRate = this.handleInterestRate.bind(this);
  this.handleLoanTerm = this.handleLoanTerm.bind(this);
  this.Calculate = this.Calculate.bind(this);
  }

  handleLoanBalance(event) {
    this.setState({loanBalance: event.target.value});
  }

  handleInterestRate(event) {
    this.setState({interestRate: event.target.value});
  }

  handleLoanTerm(event) {
    this.setState({loanTerm: event.target.value});
  }

  Calculate(event) {
    let loanBalance = (this.state.loanBalance);//total amount of principal
    let interestRate = (this.state.interestRate);//annual interest rate
    let loanTerm = (this.state.loanTerm);//loan term in years
    let calculatedTotal = '';
    let number = loanTerm * 12;//number of months
    let monthlyRate = interestRate / 12 / 100;//monthlhy interest rate=annual int.rate divided by 12 months divided by 100 percent
    let numerator = monthlyRate * Math.pow((1 + monthlyRate), number);
    let denominator = Math.pow(1 + monthlyRate, number) - 1;
    let numeratorByDenometator = (numerator / denominator);
    let total = (loanBalance * numeratorByDenometator);
    let monthlyPayment = Math.round((total+0.0001)*100)/100//rounds total monthly payment to 2 decimal places

    this.setState({
      calculatedTotal: "$" + monthlyPayment + " is your payment",
    })

    event.preventDefault();
  }
  render() {
    return (
      <div className='container'>
      
        {/* your JSX goes here */}
        <form>
          <h1>Mortgage Calculator</h1>
          <div className="form-group">
            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Loan Balance</label>
              <input type="number" id="inputPassword6" className="form-control" name="balance" aria-describedby="passwordHelpInline" onChange={this.handleLoanBalance} value={this.state.loanBalance}/> {/*Value property binds this element to its respective property on the state object.*/}
          </div>
          <div className="form-group">
            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Interest Rate (%)</label>
              <input type="number" id="inputPassword6" className="form-control mx-sm-3" name="rate" aria-describedby="passwordHelpInline" step=".01" onChange={this.handleInterestRate} value={this.state.interestRate}/>  
          </div>
          <div className="form-group">
            <label className="mr-sm-2" htmlFor="exampleFormControlSelect1">Loan Term (years)</label>
            <select className="form-control" id="exampleFormControlSelect1" name="term" value={this.state.loanTerm} onChange={this.handleLoanTerm}>
              <option>15</option>
              <option>30</option>
            </select>
          </div>
          <button type="button" className="btn btn-primary btn-lg" name="submit" onClick={this.Calculate}>Calculate</button>
          <div id="output">
            <p>{this.state.calculatedTotal}</p>
          </div>
        </form>
      </div>
    );
  }
}