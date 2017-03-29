import React from 'react';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class Wizard extends React.PureComponent {
  static propTypes = {
    step: React.PropTypes.number.isRequired,
    steps: React.PropTypes.number.isRequired,
    next: React.PropTypes.func.isRequired,
    prev: React.PropTypes.func.isRequired,
    showButons: React.PropTypes.bool,
    stepContent: React.PropTypes.array,
    children: React.PropTypes.element
  }
  static defaultProps = {
    showButtons: true,
    stepContent: ["Step 1", "Step 2", "Step 3"]
  }
  constructor(props) {
    super(props);
  }
  getStepContent(stepIndex) {
    return stepContent[stepIndex];
  }
  _handleNext() {
    this.props.next();
  }
  _handlePrev() {
    this.props.prev();
  }
  render() {
    const {step, steps, stepContent} = this.props;
    let className = 'step-'+step;
    let nextStepclassName = 'next-step-'+step;
    let nextStep,prevStep = undefined;
    if(this.props.showButtons) {
      if(step < steps) {
        nextStep = (<div className={nextStepclassName}>
            <RaisedButton label="Next" primary={true} onClick={this._handleNext.bind(this)}/>
          </div>);
      }
      if(step > 1) {
        prevStep = (<div className={nextStepclassName}>
            <RaisedButton label="Previous" onClick={this._handlePrev.bind(this)}/>
          </div>);
      }
    }
    return (
      <div className={className}>
        {this.props.children}
        <Stepper activeStep={step-1}>
        {stepContent.map(function(label, index){
          return (<Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>);
        })}
        </Stepper>
        {prevStep}
        {nextStep}
      </div>
    )
  }
}
