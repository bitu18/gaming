import PropTypes from 'prop-types';
import './ResponsiveStyles.scss';

function ResponsiveStyles({ children }) {
    return children;
}

export default ResponsiveStyles;

ResponsiveStyles.propTypes = {
    children: PropTypes.node.isRequired,
};
