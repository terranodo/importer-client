import React from 'react';

export default class Step extends React.PureComponent {
  static propTypes = {
    step: React.PropTypes.number.isRequired,
    steps: React.PropTypes.number.isRequired,
    next: React.PropTypes.func.isRequired,
    prev: React.PropTypes.func.isRequired,
    showButons: React.PropTypes.bool,
    children: React.PropTypes.element
  }
  static defaultProps = {
    showButtons: true
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
    if(this.props.showButtons) {
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
