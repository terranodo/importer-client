import ReactTestUtils from 'react-addons-test-utils';

import Step from '../../src/components/step';


describe('Step', () => {
	it('exists', () => {
    const uploadComponent = ReactTestUtils.renderIntoDocument(<Step step={1}/>);
    ReactTestUtils.isCompositeComponent(uploadComponent).should.be.true;
	});
});
