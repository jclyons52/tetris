import React from 'react';
import Jumbotron from './Jumbotron';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon'

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  var callback = sinon.spy()
  const tree = Enzyme.render(
    <Jumbotron
      status={0}
      score={10}
      start={callback}
      pause={() => { }}
      play={() => { }}
    />)

   const title = tree.find('h1')
   expect(title.text()).toBe('New Game')
  //  const button = tree.find('Button')
  //  console.log(button)
  //  button.simulate('click')
  //  expect(callback.called).toBe(true)
});