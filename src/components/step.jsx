import React from 'react';

export default class Step extends React.PureComponent {
  static propTypes = {
    step: React.PropTypes.number.isRequired,
    steps: React.PropTypes.number.isRequired,
    next: React.PropTypes.func.isRequired,
    prev: React.PropTypes.func.isRequired,
    children: React.PropTypes.element
  }
  constructor(props) {
    super(props);
  }
  _handleNext() {
    this.props.next();
  }
  _handlePrev() {
    this.props.prev();
  }
  render() {
    let className = 'step-'+this.props.step;
    let nextStepclassName = 'next-step-'+this.props.step;
    let nextStep,prevStep = undefined;
    if(this.props.step < this.props.steps) {
      nextStep = (<div className={nextStepclassName}>
          <button onClick={this._handleNext.bind(this)}>Next</button>
        </div>);
    }
    if(this.props.step > 1) {
      prevStep = (<div className={nextStepclassName}>
          <button onClick={this._handlePrev.bind(this)}>Prev</button>
        </div>);
    }
    return (
      <div className={className}>
        {this.props.children}
        {prevStep}
        {nextStep}
      </div>
    )
  }
}
