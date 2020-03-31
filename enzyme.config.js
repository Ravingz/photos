/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
export { shallow, mount, render };
export default Enzyme;
